"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:3000";

export default function Applications() {
  const [requests, setRequests] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);

  const router = useRouter();
  const [user, setUser] = useState<any>(null);

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
      loadRequests();
      loadApplications();
    }
  }, [user]);

  const loadRequests = async () => {
    const res = await fetch(`${API_URL}/request`);
    const data = await res.json();
    setRequests(Array.isArray(data) ? data : []);
  };

  const loadApplications = async () => {
    const res = await fetch(`${API_URL}/apply`);
    const data = await res.json();

    const myApps = data.filter(
      (a: any) => a.dogsitter_id === user.id
    );

    setApplications(myApps);
  };

  // ===== APPLY =====
  const handleApply = async (requestId: number) => {
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

    loadApplications();
  };

  // ===== DELETE =====
  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/apply/${id}`, {
      method: "DELETE",
    });

    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  // ===== HELPERS =====
  const isApplied = (requestId: number) => {
    return applications.some((a) => a.request_id === requestId);
  };

  const getRequestById = (id: number) => {
    return requests.find((r) => r.id === id);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="card">

      {/* ===== AVAILABLE ===== */}
      <h2>Available requests</h2>

      {requests.map((r) => (
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

          <div style={{ marginTop: 10 }}>
            {isApplied(r.id) ? (
              <span className="status status-pending">Applied</span>
            ) : (
              <button
                className="btn-green"
                onClick={() => handleApply(r.id)}
              >
                Apply
              </button>
            )}
          </div>
        </div>
      ))}

      {/* ===== MY APPLICATIONS ===== */}
      <h2 style={{ marginTop: 40 }}>My applications</h2>

      {applications.length === 0 ? (
        <p>No applications yet</p>
      ) : (
        applications.map((a) => {
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
              {/* LEFT (IMAGE + INFO) */}
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

              {/* RIGHT */}
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