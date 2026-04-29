"use client";

import { useState } from "react";
import { API } from "../../lib/api";

export default function CreateRequest() {
  const [form, setForm] = useState<any>({
    dogName: "",
    dogSize: "",
    dogAge: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    notes: "",
  });

  const [image, setImage] = useState<any>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);

  // 📷 upload image
  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // 🟢 submit (go to confirm)
  const handleSubmit = () => {
    setConfirm(true);
  };

  // ✅ confirm
  const handleConfirm = async () => {
    await API.post("/request", form);
    alert("Request created!");
    setConfirm(false);
  };

  // 🔁 CONFIRM SCREEN (comme SRS)
  if (confirm) {
    return (
      <div className="form-wrapper">
        <div className="form-card">
          <h2>Create a new request</h2>

          {preview && <img src={preview} className="preview-img" />}

          <p><b>{form.dogName}</b></p>
          <p>Date: {form.date}</p>
          <p>Time: {form.startTime} - {form.endTime}</p>
          <p>Location: {form.location}</p>
          <p>Notes: {form.notes}</p>

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

// 🧾 FORM
return (
  <div className="form-wrapper">
    <div className="form-card">
      <h2 className="form-title">Create a new request</h2>

      {/* Upload */}
      <div className="form-group form-full">
        <label className="form-label">Select photo of the dog</label>
        <input type="file" onChange={handleImage} />
      </div>

      {preview && <img src={preview} className="preview-img" />}

      <div className="form-grid">

        <div className="form-group form-full">
          <label className="form-label">Dog name</label>
          <input
            placeholder="Enter dog name"
            onChange={(e) => setForm({ ...form, dogName: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Dog size</label>
          <input
            placeholder="Enter dog size (e.g. small, big)"
            onChange={(e) => setForm({ ...form, dogSize: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Dog age</label>
          <input
            placeholder="Enter dog age (e.g. 2 y.o., 3 m.o.)"
            onChange={(e) => setForm({ ...form, dogAge: e.target.value })}
          />
        </div>

        <div className="form-group form-full">
          <label className="form-label">Walking date</label>
          <input
            placeholder="dd/mm/yyyy"
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Start time</label>
          <input
            placeholder="Select start time"
            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">End time</label>
          <input
            placeholder="Select end time"
            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
          />
        </div>

        <div className="form-group form-full">
          <label className="form-label">Location</label>
          <input
            placeholder="Enter location (e.g. park, neighborhood)"
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>

        <div className="form-group form-full">
          <label className="form-label">Additional notes</label>
          <textarea
            placeholder="Any special instructions or notes..."
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>

      </div>

      <div style={{ marginTop: "15px" }}>
        <button className="btn-green" onClick={handleSubmit}>
          Submit request
        </button>

        <button className="btn-gray">
          Cancel
        </button>
      </div>
    </div>
  </div>
);
}