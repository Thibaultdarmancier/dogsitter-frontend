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
              <td>{r.dog_id}</td>
              <td>{r.date}</td>
              <td>{r.time}</td>
              <td>{r.address}</td>
              <td>{r.service_type}</td>

              {/* STATUS (frontend only) */}
              <td>
                <span className="status-open">Open</span>
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
                  onClick={() => router.push(`/edit-request/${r.id}`)}
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

          <p><b>Dog ID:</b> {selected.dog_id}</p>
          <p><b>Address:</b> {selected.address}</p>
          <p><b>Date:</b> {selected.date}</p>
          <p><b>Time:</b> {selected.time}</p>
          <p><b>Service:</b> {selected.service_type}</p>

          <button onClick={() => setSelected(null)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}