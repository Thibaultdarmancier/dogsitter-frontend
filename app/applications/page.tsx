"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:3000";

export default function Applications() {
  const [requests, setRequests] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  const router = useRouter();

  // ===== AUTH =====
  useEffect(() => {
    const u = getUser();

    if (!u || u.role !== "dogsitter") {
      router.push("/");
      return;
    }

    setUser(u);
  }, []);

  // ===== LOAD =====
  useEffect(() => {
    if (user) {
      loadAll();
    }
  }, [user]);

  const loadAll = async () => {
    try {
      const [reqRes, appRes] = await Promise.all([
        fetch(`${API_URL}/request`),
        fetch(`${API_URL}/apply`),
      ]);

      const reqData = await reqRes.json();
      const appData = await appRes.json();

      setRequests(Array.isArray(reqData) ? reqData : []);
      setApplications(Array.isArray(appData) ? appData : []);
    } catch (err) {
      console.log("LOAD ERROR", err);
      setRequests([]);
      setApplications([]);
    }
  };

  // ===== APPLY =====
  const handleApply = async (requestId: number) => {
    try {
      await fetch(`${API_URL}/apply/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dogsitter_id: user.id,
          request_id: requestId,
          status: "pending",
        }),
      });

      // 🔥 update local (pas besoin reload complet)
      setApplications((prev) => [
        ...prev,
        {
          id: Date.now(), // fake id temporaire
          dogsitter_id: user.id,
          request_id: requestId,
          status: "pending",
        },
      ]);
    } catch (err) {
      console.log("APPLY ERROR", err);
    }
  };

  // ===== DELETE =====
  const handleDelete = async (id: number) => {
    try {
      const appToDelete = applications.find((a) => a.id === id);

      await fetch(`${API_URL}/apply/${id}`, {
        method: "DELETE",
      });

      // 🔥 remove local → la request revient en haut DIRECT
      setApplications((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.log("DELETE ERROR", err);
    }
  };

  // ===== HELPERS =====

  // 🔥 IMPORTANT : check seulement TES apply
  const isMyApplication = (requestId: number) => {
    return applications.some(
      (a) =>
        a.request_id === requestId &&
        a.dogsitter_id === user.id
    );
  };

  const myApplications = applications.filter(
    (a) => a.dogsitter_id === user?.id
  );

  const getRequestById = (id: number) => {
    return requests.find((r) => r.id === id);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="card">

      {/* ===== AVAILABLE ===== */}
      <h2>Available requests</h2>

      {requests
        .filter((r) => !isMyApplication(r.id)) // ✅ FIX PRINCIPAL
        .map((r) => (
          <div key={r.id} className="card" style={{ marginTop: 10 }}>
            <div style={{ display: "flex", gap: 15 }}>

              <img
                src={r.dog_image || "https://placedog.net/200"}
                width="100"
                style={{ borderRadius: 10 }}
              />

              <div>
                <h3>{r.dog_name}</h3>
                <p>{r.date}</p>
                <p>{r.start_time} - {r.end_time}</p>
                <p>{r.address}</p>
              </div>

            </div>

            <button
              className="btn-green"
              onClick={() => handleApply(r.id)}
              style={{ marginTop: 10 }}
            >
              Apply
            </button>
          </div>
        ))}

      {/* ===== MY APPLICATIONS ===== */}
      <h2 style={{ marginTop: 40 }}>My applications</h2>

      {myApplications.length === 0 ? (
        <p>No applications yet</p>
      ) : (
        myApplications.map((a) => {
          const req = getRequestById(a.request_id);
          if (!req) return null;

          return (
            <div
              key={a.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                marginTop: "10px",
                background: "#fff",
              }}
            >
              <div style={{ display: "flex", gap: 15 }}>

                <img
                  src={req.dog_image || "https://placedog.net/200"}
                  width="100"
                  style={{ borderRadius: 10 }}
                />

                <div>
                  <h3>{req.dog_name}</h3>
                  <p>{req.date}</p>
                  <p>{req.start_time} - {req.end_time}</p>
                  <p>{req.address}</p>
                </div>

              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <span className="status status-pending">
                  {a.status}
                </span>

                <button
                  className="btn-red"
                  onClick={() => handleDelete(a.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}