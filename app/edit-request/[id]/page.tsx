"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { updateRequest } from "@/lib/api";

export default function EditRequest() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<any>({
    dog_id: "",
    user_id: "",
    service_id: "",
    address: "",
    date: "",
    time: "",
    service_type: "",
  });

  const [preview, setPreview] = useState<string | null>(null);

  // 🔥 load request
  useEffect(() => {
    fetch(`http://localhost:3000/request/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm(data);
      });
  }, [id]);

  // 📷 image upload (front only)
  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
  };

  // 💾 save
  const handleSave = async () => {
    await updateRequest(Number(id), {
      dog_id: Number(form.dog_id),
      user_id: Number(form.user_id),
      service_id: Number(form.service_id),
      address: form.address,
      date: form.date,
      time: form.time,
      service_type: form.service_type,
    });

    alert("Request updated!");
    router.push("/my-requests");
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">

        <h2 className="form-title">Edit request</h2>

        {/* IMAGE */}
        <div className="form-group form-full">
          <label className="form-label">Select photo of the dog</label>

          <div className="upload-box">
            <input type="file" onChange={handleImage} />
          </div>

          {preview && <img src={preview} className="preview-img" />}
        </div>

        {/* FORM */}
        <div className="form-grid">

          <div className="form-group form-full">
            <label className="form-label">Dog ID</label>
            <input
              value={form.dog_id}
              onChange={(e) =>
                setForm({ ...form, dog_id: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">Service ID</label>
            <input
              value={form.service_id}
              onChange={(e) =>
                setForm({ ...form, service_id: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">User ID</label>
            <input
              value={form.user_id}
              onChange={(e) =>
                setForm({ ...form, user_id: e.target.value })
              }
            />
          </div>

          <div className="form-group form-full">
            <label className="form-label">Walking date</label>
            <input
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">Time</label>
            <input
              value={form.time}
              onChange={(e) =>
                setForm({ ...form, time: e.target.value })
              }
            />
          </div>

          <div className="form-group form-full">
            <label className="form-label">Location</label>
            <input
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />
          </div>

          <div className="form-group form-full">
            <label className="form-label">Service Type</label>
            <input
              value={form.service_type}
              onChange={(e) =>
                setForm({ ...form, service_type: e.target.value })
              }
            />
          </div>

        </div>

        {/* BUTTONS */}
        <div style={{ marginTop: "15px" }}>
          <button className="btn-green" onClick={handleSave}>
            Save changes
          </button>

          <button
            className="btn-gray"
            onClick={() => router.push("/my-requests")}
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}