"use client";

import { useState } from "react";

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
    service_type: "",
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);

  // 📷 image
  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
  };

  // submit
  const handleSubmit = () => {
    setConfirm(true);
  };

  // ✅ BACKEND CONNECTION
  const handleConfirm = async () => {
    const payload = {
      dog_id: 1,
      user_id: 1,
      service_id: 1,
      address: form.location,
      date: form.date,
      time: `${form.startTime}-${form.endTime}`,
      service_type: form.service_type || "Walk",
    };

    await fetch("http://localhost:3000/request/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    alert("Request created!");
    setConfirm(false);
  };

  // ================= CONFIRM SCREEN =================
  if (confirm) {
    return (
      <div className="form-wrapper">
        <div className="form-card">

          <h2>Create a new request</h2>
          <p className="subtitle">Fill in the details of your dog walking request</p>

          <div style={{ display: "flex", gap: "20px", marginTop: "15px" }}>

            {/* IMAGE */}
            {preview && <img src={preview} className="preview-img" />}

            {/* DETAILS */}
            <div>
              <h3>{form.dogName}</h3>

              <p><b>Date</b><br />{form.date}</p>
              <p><b>Time</b><br />{form.startTime} to {form.endTime}</p>
              <p><b>Location</b><br />{form.location}</p>
              <p><b>Additional notes</b><br />{form.notes}</p>
            </div>

          </div>

          <div style={{ marginTop: "20px" }}>
            <button className="btn-green" onClick={handleConfirm}>
              Confirm
            </button>

            <button className="btn-gray" onClick={() => setConfirm(false)}>
              Back
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ================= FORM =================
  return (
    <div className="form-wrapper">
      <div className="form-card">

        <h2 className="form-title">Create a new request</h2>
        <p className="subtitle">Fill in the details of your dog walking request</p>

        {/* IMAGE */}
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
              placeholder="Enter dog size"
              onChange={(e) => setForm({ ...form, dogSize: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Dog age</label>
            <input
              placeholder="Enter dog age"
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
            <label className="form-label">Walking time</label>
            <input
              placeholder="Start time"
              onChange={(e) => setForm({ ...form, startTime: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">End time</label>
            <input
              placeholder="End time"
              onChange={(e) => setForm({ ...form, endTime: e.target.value })}
            />
          </div>

          <div className="form-group form-full">
            <label className="form-label">Location</label>
            <input
              placeholder="Enter location"
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>

          <div className="form-group form-full">
            <label className="form-label">Additional notes</label>
            <textarea
              placeholder="Any special instructions..."
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