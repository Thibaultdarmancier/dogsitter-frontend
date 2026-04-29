"use client";

import { useState } from "react";
import { createRequest } from "@/lib/api";

export default function CreateRequest() {
  const [form, setForm] = useState<any>({
    dog_name: "",
    dog_age: "",
    dog_race: "",
    dog_image: "",
    date: "",
    start_time: "",
    end_time: "",
    address: "",
    service_type: "",
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
  
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, dog_image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => setConfirm(true);

  const handleConfirm = async () => {
    const payload = {
      dog_name: form.dog_name,
      dog_age: form.dog_age,
      dog_race: form.dog_race,
      dog_image: form.dog_image,
      address: form.address,
      date: form.date,
      start_time: form.start_time,
      end_time: form.end_time,
      service_type: form.service_type || "walk",
    };
  
    const res = await createRequest(payload);
  
    console.log(res);
  
    alert("Request created!");
    setConfirm(false);
  };

  if (confirm) {
    return (
      <div className="form-wrapper">
        <div className="form-card">
          <h2>Confirm Request</h2>

          <p>Dog: {form.dogName}</p>
          <p>Age: {form.dogAge}</p>
          <p>Race: {form.dogRace}</p>
          <p>Date: {form.date}</p>
          <p>Time: {form.startTime} - {form.endTime}</p>
          <p>Location: {form.location}</p>

          <button className="btn-green" onClick={handleConfirm}>Confirm</button>
          <button className="btn-gray" onClick={() => setConfirm(false)}>Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h2>Create a new request</h2>

        <input type="file" onChange={handleImage} />

        <input placeholder="Dog name" onChange={(e) => setForm({ ...form, dogName: e.target.value })} />
        <input placeholder="Dog age" onChange={(e) => setForm({ ...form, dogAge: e.target.value })} />
        <input placeholder="Dog race" onChange={(e) => setForm({ ...form, dogRace: e.target.value })} />
        <input placeholder="Date" onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <input placeholder="Start time" onChange={(e) => setForm({ ...form, startTime: e.target.value })} />
        <input placeholder="End time" onChange={(e) => setForm({ ...form, endTime: e.target.value })} />
        <input placeholder="Location" onChange={(e) => setForm({ ...form, location: e.target.value })} />

        <button className="btn-green" onClick={handleSubmit}>Submit request</button>
      </div>
    </div>
  );
}