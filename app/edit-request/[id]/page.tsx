"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getRequest, updateRequest } from "@/lib/api";

export default function EditRequest() {
  const params = useParams();
  const router = useRouter();

  const requestId = Number(params?.id);

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

  useEffect(() => {
    if (!requestId || isNaN(requestId)) return;

    getRequest(requestId).then((data) => {
      setForm(data);
    });
  }, [requestId]);

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

  const handleSave = async () => {
    if (!requestId || isNaN(requestId)) {
      alert("Invalid request id");
      return;
    }

    await updateRequest(requestId, form);
    alert("Request updated!");
    router.push("/my-requests");
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h2>Edit request</h2>

        <input type="file" onChange={handleImage} />

        {(preview || form.dog_image) && (
          <img src={preview || form.dog_image} className="preview-img" />
        )}

        <input
          value={form.dog_name}
          onChange={(e) => setForm({ ...form, dog_name: e.target.value })}
        />

        <input
          value={form.dog_age}
          onChange={(e) => setForm({ ...form, dog_age: e.target.value })}
        />

        <input
          value={form.dog_race}
          onChange={(e) => setForm({ ...form, dog_race: e.target.value })}
        />

        <input
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <input
          value={form.start_time}
          onChange={(e) => setForm({ ...form, start_time: e.target.value })}
        />

        <input
          value={form.end_time}
          onChange={(e) => setForm({ ...form, end_time: e.target.value })}
        />

        <input
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          value={form.service_type}
          onChange={(e) => setForm({ ...form, service_type: e.target.value })}
        />

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="open">Open</option>
          <option value="assigned">Assigned</option>
          <option value="completed">Completed</option>
        </select>

        <button className="btn-green" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}