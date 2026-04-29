"use client";

import { useState } from "react";
import { createRequest } from "@/lib/api";

export default function CreateRequest() {
  const [form, setForm] = useState<any>({
    dogName: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    notes: "",
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = () => setConfirm(true);

  const handleConfirm = async () => {
    const payload = {
      dog_id: 1,
      user_id: 1,
      address: form.location,
      date: form.date,
      start_time: form.startTime,
      end_time: form.endTime,
      status: "open",
      service_type: "walk",
      assigned_dogsitter_id: null,
    };

    await createRequest(payload);

    alert("Request created!");
    setConfirm(false);
  };

  if (confirm) {
    return (
      <div className="form-wrapper">
        <div className="form-card">

          <h2>Create a new request</h2>

          <div style={{ display: "flex", gap: "20px" }}>
            {preview && <img src={preview} className="preview-img" />}

            <div>
              <h3>{form.dogName}</h3>
              <p>Date: {form.date}</p>
              <p>Time: {form.startTime} - {form.endTime}</p>
              <p>Location: {form.location}</p>
              <p>Notes: {form.notes}</p>
            </div>
          </div>

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

        <div className="form-group form-full">
          <label className="form-label">Select photo of the dog</label>
          <input type="file" onChange={handleImage} />
        </div>

        {preview && <img src={preview} className="preview-img" />}

        <div className="form-grid">

          <div className="form-group form-full">
            <label className="form-label">Dog name</label>
            <input onChange={(e) => setForm({ ...form, dogName: e.target.value })} />
          </div>

          <div className="form-group form-full">
            <label className="form-label">Walking date</label>
            <input onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>

          <div className="form-group">
            <label className="form-label">Start time</label>
            <input onChange={(e) => setForm({ ...form, startTime: e.target.value })} />
          </div>

          <div className="form-group">
            <label className="form-label">End time</label>
            <input onChange={(e) => setForm({ ...form, endTime: e.target.value })} />
          </div>

          <div className="form-group form-full">
            <label className="form-label">Location</label>
            <input onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </div>

          <div className="form-group form-full">
            <label className="form-label">Additional notes</label>
            <textarea onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>

        </div>

        <button className="btn-green" onClick={handleSubmit}>
          Submit request
        </button>

      </div>
    </div>
  );
}