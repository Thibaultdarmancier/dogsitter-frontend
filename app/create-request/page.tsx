"use client";

import { useState } from "react";
import { createRequest } from "@/lib/api";

export default function CreateRequest() {
  const [form, setForm] = useState<any>({
    date: "",
    start_time: "",
    end_time: "",
    address: "",
    service_type: "walk",
  });

  const [confirm, setConfirm] = useState(false);

  const handleSubmit = () => setConfirm(true);

  const handleConfirm = async () => {
    const payload = {
      dog_id: 1, // ⚠️ temporaire
      user_id: 1, // ⚠️ temporaire
      address: form.address,
      date: form.date,
      start_time: form.start_time,
      end_time: form.end_time,
      status: "open",
      service_type: form.service_type,
      assigned_dogsitter_id: null,
    };

    console.log("SENDING:", payload);

    const res = await createRequest(payload);

    if (res.ok) {
      alert("Request created!");
    } else {
      alert("Error creating request");
    }

    setConfirm(false);
  };

  if (confirm) {
    return (
      <div className="form-wrapper">
        <div className="form-card">
          <h2>Confirm Request</h2>

          <p>Date: {form.date}</p>
          <p>Time: {form.start_time} - {form.end_time}</p>
          <p>Location: {form.address}</p>

          <button className="btn-green" onClick={handleConfirm}>
            Confirm
          </button>

          <button className="btn-gray" onClick={() => setConfirm(false)}>
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-wrapper">
      <div className="form-card">

        <h2>Create a new request</h2>

        <div className="form-group">
          <label>Date</label>
          <input
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Start time</label>
          <input
            onChange={(e) =>
              setForm({ ...form, start_time: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>End time</label>
          <input
            onChange={(e) =>
              setForm({ ...form, end_time: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Service type</label>
          <input
            onChange={(e) =>
              setForm({ ...form, service_type: e.target.value })
            }
          />
        </div>

        <button className="btn-green" onClick={handleSubmit}>
          Submit request
        </button>

      </div>
    </div>
  );
}