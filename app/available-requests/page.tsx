"use client";
import { API } from "../../lib/api";

export default function ApplyPage() {
  const apply = async () => {
    await API.post("/apply", { requestId: 1 });
  };

  return (
    <div className="card">
      <h2>Request details</h2>

      <button className="btn-green" onClick={apply}>
        Apply to this request
      </button>
      <button>Back</button>
    </div>
  );
}