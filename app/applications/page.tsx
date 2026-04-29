"use client";

import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000";

export default function MyApplications() {
  const [requests, setRequests] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);

  const DOGSITTER_ID = 1;

  useEffect(() => {
    loadRequests();
    loadApplications();
  }, []);

  // ===== LOAD AVAILABLE REQUESTS =====
  const loadRequests = async () => {
    const res = await fetch(`${API_URL}/request/open`);
    const data = await res.json();
    setRequests(data);
  };

  // ===== LOAD MY APPLICATIONS =====
  const loadApplications = async () => {
    const res = await fetch(`${API_URL}/apply`);
    const data = await res.json();

    // filtre par dogsitter_id
    const myApps = data.filter(
      (a: any) => a.dogsitter_id === DOGSITTER_ID
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
        dogsitter_id: DOGSITTER_ID,
        request_id: requestId,
        status: "pending",
      }),
    });

    loadApplications();
  };

  // ===== DELETE APPLICATION =====
  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/apply/${id}`, {
      method: "DELETE",
    });

    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  // ===== CHECK IF ALREADY APPLIED =====
  const isApplied = (requestId: number) => {
    return applications.some((a) => a.request_id === requestId);
  };

  return (
    <div className="card">

      {/* ================= AVAILABLE REQUESTS ================= */}
      <h2>Available requests</h2>
      <p className="subtitle">
        Browse and select requests that you are interested in
      </p>

      {requests.map((r) => (
        <div
          key={r.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "15px",
            marginTop: "10px",
            background: "#fff",
          }}
        >
          <div style={{ display: "flex", gap: "15px" }}>
            {/* IMAGE MOCK */}
            <img
              src="https://placedog.net/200"
              width="100"
              style={{ borderRadius: "10px" }}
            />

            <div>
              <h3>Dog #{r.dog_id}</h3>
              <p>{r.date}</p>
              <p>
                {r.start_time} to {r.end_time}
              </p>
              <p>{r.address}</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            
            {/* OPEN */}
            <button
              className="btn-gray"
              onClick={() => setSelected(r)}
            >
              View details
            </button>

            {/* APPLY */}
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

      {/* ================= OPEN DETAILS ================= */}
      {selected && (
        <div style={{ marginTop: 20 }}>
          <h3>Request Details</h3>
          <p><b>Dog ID:</b> {selected.dog_id}</p>
          <p><b>Date:</b> {selected.date}</p>
          <p><b>Time:</b> {selected.start_time} - {selected.end_time}</p>
          <p><b>Location:</b> {selected.address}</p>
          <p><b>Status:</b> {selected.status}</p>

          <button onClick={() => setSelected(null)}>Close</button>
        </div>
      )}

      {/* ================= MY APPLICATIONS ================= */}
      <h2 style={{ marginTop: "40px" }}>My applications</h2>
      <p className="subtitle">Requests you have applied to</p>

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

    </div>
  );
}