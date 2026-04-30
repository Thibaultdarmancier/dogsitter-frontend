"use client";
import { getOpenRequests, getApplications, createApply, deleteApply } from "@/lib/api";
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

  // ===== LOAD USER =====
  useEffect(() => {
    const u = getUser();

    if (!u || u.role !== "dogsitter") {
      router.push("/");
      return;
    }

    setUser(u);
  }, []);

  // ===== LOAD DATA =====
  useEffect(() => {
    if (user) {
      loadRequests();
      loadApplications();
    }
  }, [user]);

  // ===== LOAD OPEN REQUESTS =====
  const loadRequests = async () => {
    const data = await getOpenRequests();
    setRequests(Array.isArray(data) ? data : []);
  };

  // ===== LOAD MY APPLICATIONS =====
  const loadApplications = async () => {
    const data = await getApplications();
    setApplications(Array.isArray(data) ? data : []);
  };

  // ===== APPLY =====
  const handleApply = async (requestId: number) => {
    try {
      const data = await createApply({
        request_id: requestId,
      });

      console.log("APPLY RESPONSE =", data);

      loadRequests();
      loadApplications();
    } catch (err) {
      console.log("ERROR APPLY", err);
    }
  };

  // ===== DELETE =====
  const handleDelete = async (id: number) => {
  try {
    const data = await deleteApply(id);

    console.log("DELETE RESPONSE =", data);

    loadRequests();
    loadApplications();
  } catch (err) {
    console.log("ERROR DELETE", err);
  }
};

  // ===== CHECK APPLIED =====
  const isApplied = (requestId: number) => {
    return applications.some((a) => a.request_id === requestId);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="card">

      {/* ===== AVAILABLE REQUESTS ===== */}
      <h2>Available requests</h2>
      <p className="subtitle">
        Browse and select requests that you are interested in
      </p>

      {requests.length === 0 && <p>No available requests</p>}

      {requests.map((r) => (
        <div
          key={r.id}
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
          <div style={{ display: "flex", gap: "15px" }}>
            <img
              src={r.dog_image || "https://placedog.net/200"}
              width="100"
              style={{ borderRadius: "10px" }}
            />

            <div>
              <h3>{r.dog_name || `Dog #${r.dog_id}`}</h3>
              <p>{r.date}</p>
              <p>
                {r.start_time} - {r.end_time}
              </p>
              <p>{r.address}</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              className="btn-gray"
              onClick={() => setSelected(r)}
            >
              View details
            </button>

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

      {/* ===== DETAILS ===== */}
      {selected && (
        <div style={{ marginTop: 20 }}>
          <h3>Request Details</h3>

          <p><b>Dog:</b> {selected.dog_name}</p>
          <p><b>Date:</b> {selected.date}</p>
          <p><b>Time:</b> {selected.start_time} - {selected.end_time}</p>
          <p><b>Location:</b> {selected.address}</p>
          <p><b>Status:</b> {selected.status}</p>

          <button onClick={() => setSelected(null)}>Close</button>
        </div>
      )}

      {/* ===== MY APPLICATIONS ===== */}
      <h2 style={{ marginTop: "40px" }}>My applications</h2>
      <p className="subtitle">
        Requests you have applied to
      </p>

      {applications.length === 0 ? (
        <p>No applications yet</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((a) => (
              <tr key={a.id}>
                <td>{a.request_id}</td>

                <td>
                  <span
                    className={`status ${
                      a.status === "pending"
                        ? "status-pending"
                        : ""
                    }`}
                  >
                    {a.status}
                  </span>
                </td>

                <td>
                  <button
                    className="btn-red"
                    onClick={() => handleDelete(a.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}