"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getRequest, updateRequest } from "@/lib/api";

export default function EditRequest() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<any>({
    dog_id: "",
    user_id: "",
    address: "",
    date: "",
    start_time: "",
    end_time: "",
    service_type: "",
    status: "",
    assigned_dogsitter_id: null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  // 🔥 LOAD DATA
  useEffect(() => {
    getRequest(Number(id)).then((data) => {
      setForm(data);
    });
  }, [id]);

  // 📷 IMAGE
  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
  };

  // 💾 SAVE
  const handleSave = async () => {
    await updateRequest(Number(id), {
      dog_id: Number(form.dog_id),
      user_id: Number(form.user_id),
      address: form.address,
      date: form.date,
      start_time: form.start_time,
      end_time: form.end_time,
      service_type: form.service_type,
      status: form.status,
      assigned_dogsitter_id: form.assigned_dogsitter_id,
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
          <input type="file" onChange={handleImage} />
          {preview && <img src={preview} className="preview-img" />}
        </div>

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
            <label className="form-label">Start time</label>
            <input
              value={form.start_time}
              onChange={(e) =>
                setForm({ ...form, start_time: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">End time</label>
            <input
              value={form.end_time}
              onChange={(e) =>
                setForm({ ...form, end_time: e.target.value })
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

          {/* ✅ STATUS MODIFIABLE */}
          <div className="form-group form-full">
            <label className="form-label">Status</label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            >
              <option value="open">Open</option>
              <option value="accepted">Accepted</option>
              <option value="completed">Completed</option>
            </select>
          </div>

        </div>

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