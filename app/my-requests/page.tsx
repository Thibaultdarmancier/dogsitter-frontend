"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRequests, deleteRequest } from "@/lib/api";

export default function MyRequests() {
  const [requests, setRequests] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getRequests();
    setRequests(data);
  };

  const handleDelete = async (id: number) => {
    await deleteRequest(id);
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="card">
      <h2>My requests</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Dog</th>
            <th>Date</th>
            <th>Time</th>
            <th>Address</th>
            <th>Service</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              
              {/* 🔥 si backend updated */}
              <td>{r.dog_name || r.dog_id}</td>

              <td>{r.date}</td>

              <td>
                {r.start_time} - {r.end_time}
              </td>

              <td>{r.address}</td>

              <td>{r.service_type}</td>

              {/* ✅ STATUS FIX */}
              <td>
                <span
                  className={`status ${
                    r.status === "open" ? "status-open" : ""
                  }`}
                >
                  {r.status}
                </span>
              </td>

              <td style={{ display: "flex", gap: "6px" }}>
                
                {/* OPEN */}
                <button
                  className="btn-blue"
                  onClick={() => setSelected(r)}
                >
                  Open
                </button>

                {/* EDIT */}
                <button
                  className="btn-green"
                  onClick={() =>
                    router.push(`/edit-request/${r.id}`)
                  }
                >
                  Edit
                </button>

                {/* DELETE */}
                <button
                  className="btn-red"
                  onClick={() => handleDelete(r.id)}
                >
                  Delete
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== OPEN VIEW ===== */}
      {selected && (
        <div style={{ marginTop: 20 }}>
          <h3>Request Details</h3>

          <p><b>Dog:</b> {selected.dog_name || selected.dog_id}</p>
          <p><b>Date:</b> {selected.date}</p>
          <p><b>Time:</b> {selected.start_time} - {selected.end_time}</p>
          <p><b>Address:</b> {selected.address}</p>
          <p><b>Service:</b> {selected.service_type}</p>
          <p><b>Status:</b> {selected.status}</p>

          <button onClick={() => setSelected(null)}>Close</button>
        </div>
      )}
    </div>
  );
}