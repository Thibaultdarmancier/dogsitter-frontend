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
    status: "", // 👈 affiché mais pas modifiable
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

  // 💾 SAVE
  const handleSave = async () => {
<<<<<<< HEAD
  try {
    const numericId = Number(id);
=======
    try {
      await updateRequest(Number(id), {
        dog_name: form.dog_name,
        dog_age: form.dog_age,
        dog_race: form.dog_race,
        dog_image: form.dog_image,
        address: form.address,
        date: form.date,
        start_time: form.start_time,
        end_time: form.end_time,
        service_type: form.service_type,
        // ❌ PAS DE status ici
      });
>>>>>>> 0920ee8bf4ba6a3be982a9b836444c7ba35d4c14

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
              value={form.dog_name || ""}
              onChange={(e) =>
                setForm({ ...form, dog_name: e.target.value })
              }
            />
          </div>

          {/* DOG AGE */}
          <div className="form-group">
            <label className="form-label">Dog age</label>
            <input
              value={form.dog_age || ""}
              onChange={(e) =>
                setForm({ ...form, dog_age: e.target.value })
              }
            />
          </div>

          {/* DOG RACE */}
          <div className="form-group">
            <label className="form-label">Dog race</label>
            <input
              value={form.dog_race || ""}
              onChange={(e) =>
                setForm({ ...form, dog_race: e.target.value })
              }
            />
          </div>

          {/* DATE */}
          <div className="form-group form-full">
            <label className="form-label">Walking date</label>
            <input
              type="date"
              value={form.date || ""}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
            />
          </div>

          {/* START TIME */}
          <div className="form-group">
            <label className="form-label">Start time</label>
            <input
              type="time"
              value={form.start_time || ""}
              onChange={(e) =>
                setForm({ ...form, start_time: e.target.value })
              }
            />
          </div>

          {/* END TIME */}
          <div className="form-group">
            <label className="form-label">End time</label>
            <input
              type="time"
              value={form.end_time || ""}
              onChange={(e) =>
                setForm({ ...form, end_time: e.target.value })
              }
            />
          </div>

          {/* ADDRESS */}
          <div className="form-group form-full">
            <label className="form-label">Location</label>
            <input
              value={form.address || ""}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />
          </div>

          {/* SERVICE */}
          <div className="form-group form-full">
            <label className="form-label">Service Type</label>
            <input
              value={form.service_type || ""}
              onChange={(e) =>
                setForm({ ...form, service_type: e.target.value })
              }
            />
          </div>

          {/* STATUS (READ ONLY) */}
          <div className="form-group form-full">
            <label className="form-label">Status</label>
            <input
              value={form.status || ""}
              readOnly
              style={{ background: "#eee" }}
            />
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