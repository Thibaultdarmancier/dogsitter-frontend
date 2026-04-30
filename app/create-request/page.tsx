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
    service_type: "walk",
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);

  // 📷 IMAGE
  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev: any) => ({
        ...prev,
        dog_image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  // 🟢 SUBMIT
  const handleSubmit = () => {
    setConfirm(true);
  };

  // ✅ CONFIRM → BACKEND
const handleConfirm = async () => {
  try {
    const res = await createRequest(form);

    console.log("Backend response:", res);

    if (!res) {
      alert("Error creating request");
      return;
    }

    alert("Request created!");
    setConfirm(false);

  } catch (err) {
    console.error(err);
    alert("Network error");
  }
};

  // ===== CONFIRM SCREEN =====
  if (confirm) {
    return (
      <div className="form-wrapper">
        <div className="form-card">
          <h2>Confirm Request</h2>

          {preview && <img src={preview} className="preview-img" />}

          <p><b>Dog:</b> {form.dog_name}</p>
          <p><b>Age:</b> {form.dog_age}</p>
          <p><b>Race:</b> {form.dog_race}</p>
          <p><b>Date:</b> {form.date}</p>
          <p><b>Time:</b> {form.start_time} - {form.end_time}</p>
          <p><b>Location:</b> {form.address}</p>

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

  // ===== FORM =====
  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h2>Create a new request</h2>

        {/* IMAGE */}
        <input type="file" onChange={handleImage} />
        {preview && <img src={preview} className="preview-img" />}

        {/* DOG */}
        <input
          placeholder="Dog name"
          onChange={(e) =>
            setForm({ ...form, dog_name: e.target.value })
          }
        />

        <input
          placeholder="Dog age"
          onChange={(e) =>
            setForm({ ...form, dog_age: e.target.value })
          }
        />

        <input
          placeholder="Dog race"
          onChange={(e) =>
            setForm({ ...form, dog_race: e.target.value })
          }
        />

        {/* REQUEST */}
        <input
          placeholder="Date"
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

         {/* START TIME */}
          <input
            type="time"
            value={form.start_time}
            onChange={(e) =>
              setForm({ ...form, start_time: e.target.value })
            }
          />

          {/* END TIME */}
          <input
            type="time"
            value={form.end_time}
            onChange={(e) =>
              setForm({ ...form, end_time: e.target.value })
            }
          />

        <input
          placeholder="Address"
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
        />

        <button className="btn-green" onClick={handleSubmit}>
          Submit request
        </button>
      </div>
    </div>
  );
}