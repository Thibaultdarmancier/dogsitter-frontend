"use client";
import { getOpenRequests, createApply } from "@/lib/api";
import { useEffect, useState } from "react";

export default function OpenRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    const data = await getOpenRequests();
    if (Array.isArray(data)) {
      setRequests(data);
    } else {
      setRequests([]);
    }
  };

  const applyNow = async (requestId: number) => {
    const res = await createApply({
      request_id: requestId,
    });

    alert(res.message || "Applied!");
    loadRequests();
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h2>Open Requests</h2>

        {requests.map((req) => (
          <div key={req.id} className="card" style={{ marginBottom: "20px" }}>
            {req.dog_image && (
              <img src={req.dog_image} className="preview-img" />
            )}

            <h3>{req.dog_name}</h3>
            <p>Age: {req.dog_age}</p>
            <p>Race: {req.dog_race}</p>
            <p>Address: {req.address}</p>
            <p>Date: {req.date}</p>
            <p>Time: {req.start_time} - {req.end_time}</p>
            <p>Service: {req.service_type}</p>

            <button className="btn-green" onClick={() => applyNow(req.id)}>
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}