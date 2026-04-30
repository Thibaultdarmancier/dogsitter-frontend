"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getRequest, updateRequest } from "@/lib/api";

export default function EditRequest() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<any>({
    dog_name: "",
    dog_age: "",
    dog_race: "",
    dog_image: "",
    address: "",
    date: "",
    start_time: "",
    end_time: "",
    service_type: "",
    status: "",
  });

  const [preview, setPreview] = useState<string | null>(null);

  // 🔥 LOAD DATA
  useEffect(() => {
  if (!id) return;

  const numericId = Number(id);

  if (isNaN(numericId)) return;

  getRequest(numericId).then((data) => {
    console.log("EDIT REQUEST DATA =", data);

    if (data?.id) {
      setForm(data);
    }
  });
}, [id]);

  // 📷 IMAGE UPLOAD
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

  // 💾 SAVE
  const handleSave = async () => {
  try {
    const numericId = Number(id);

    if (isNaN(numericId)) {
      alert("Invalid request id");
      return;
    }

    await updateRequest(numericId, form);

    alert("Request updated!");
    router.push("/my-requests");

  } catch (err) {
    console.error(err);
    alert("Error updating request");
  }
};

  return (
    <div className="form-wrapper">
      <div className="form-card">

        <h2 className="form-title">Edit request</h2>

        {/* IMAGE */}
        <div className="form-group form-full">
          <label className="form-label">Dog photo</label>

          <input type="file" onChange={handleImage} />

          {/* 🔥 IMAGE DISPLAY */}
          {(preview || form.dog_image) && (
            <img
              src={preview || form.dog_image}
              className="preview-img"
            />
          )}
        </div>

        <div className="form-grid">

          {/* DOG NAME */}
          <div className="form-group form-full">
            <label className="form-label">Dog name</label>
            <input
              value={form.dog_name}
              onChange={(e) =>
                setForm({ ...form, dog_name: e.target.value })
              }
            />
          </div>

          {/* DOG AGE */}
          <div className="form-group">
            <label className="form-label">Dog age</label>
            <input
              value={form.dog_age}
              onChange={(e) =>
                setForm({ ...form, dog_age: e.target.value })
              }
            />
          </div>

          {/* DOG RACE */}
          <div className="form-group">
            <label className="form-label">Dog race</label>
            <input
              value={form.dog_race}
              onChange={(e) =>
                setForm({ ...form, dog_race: e.target.value })
              }
            />
          </div>

          {/* DATE */}
          <div className="form-group form-full">
            <label className="form-label">Walking date</label>
            <input
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
            />
          </div>

          {/* START */}
          <div className="form-group">
            <label className="form-label">Start time</label>
            <input
              value={form.start_time}
              onChange={(e) =>
                setForm({ ...form, start_time: e.target.value })
              }
            />
          </div>

          {/* END */}
          <div className="form-group">
            <label className="form-label">End time</label>
            <input
              value={form.end_time}
              onChange={(e) =>
                setForm({ ...form, end_time: e.target.value })
              }
            />
          </div>

          {/* ADDRESS */}
          <div className="form-group form-full">
            <label className="form-label">Location</label>
            <input
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />
          </div>

          {/* SERVICE */}
          <div className="form-group form-full">
            <label className="form-label">Service Type</label>
            <input
              value={form.service_type}
              onChange={(e) =>
                setForm({ ...form, service_type: e.target.value })
              }
            />
          </div>

          {/* STATUS */}
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