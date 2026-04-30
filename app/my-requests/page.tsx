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
    try {
      const data = await getRequests();

      console.log("MY REQUESTS RESPONSE =", data);

      if (Array.isArray(data)) {
        setRequests(data);
      } else {
        setRequests([]);
      }
    } catch (error) {
      console.log("LOAD REQUESTS ERROR =", error);
      setRequests([]);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteRequest(id);
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="card">
      <h2>My requests</h2>

      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
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
                <td>{r.dog_name}</td>
                <td>{r.date}</td>
                <td>{r.start_time} - {r.end_time}</td>
                <td>{r.address}</td>
                <td>{r.service_type}</td>

                <td>
                  <span className={`status ${r.status === "open" ? "status-open" : ""}`}>
                    {r.status}
                  </span>
                </td>

                <td style={{ display: "flex", gap: "6px" }}>
                  <button
                    className="btn-blue"
                    onClick={() => setSelected(r)}
                  >
                    Open
                  </button>

                  <button
                    className="btn-green"
                    onClick={() => router.push(`/edit-request/${r.id}`)}
                  >
                    Edit
                  </button>

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
      )}

      {selected && (
        <div style={{ marginTop: 20 }}>
          <h3>Request Details</h3>

          <p><b>Dog:</b> {selected.dog_name}</p>
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