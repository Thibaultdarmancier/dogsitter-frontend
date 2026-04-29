"use client";
import { useState } from "react";
import { API } from "../../lib/api";

export default function CreateRequest() {
  const [form, setForm] = useState<any>({});

  const [confirm, setConfirm] = useState(false);

  const submit = () => {
    setConfirm(true);
  };

  const confirmSubmit = async () => {
    await API.post("/request", form);
    alert("Created");
    setConfirm(false);
  };

  if (confirm) {
    return (
      <div className="card">
        <h2>Confirm request</h2>
        <p>{form.dogName}</p>
        <button className="btn-green" onClick={confirmSubmit}>
          Confirm
        </button>
        <button onClick={() => setConfirm(false)}>Back</button>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Create request</h2>

      <input placeholder="Dog name" onChange={(e)=>setForm({...form,dogName:e.target.value})}/>
      <input placeholder="Dog size" onChange={(e)=>setForm({...form,dogSize:e.target.value})}/>
      <input placeholder="Dog age" onChange={(e)=>setForm({...form,dogAge:e.target.value})}/>
      <input placeholder="Date" onChange={(e)=>setForm({...form,date:e.target.value})}/>
      <input placeholder="Start time" onChange={(e)=>setForm({...form,timeStart:e.target.value})}/>
      <input placeholder="End time" onChange={(e)=>setForm({...form,timeEnd:e.target.value})}/>
      <input placeholder="Location" onChange={(e)=>setForm({...form,location:e.target.value})}/>
      <input placeholder="Notes" onChange={(e)=>setForm({...form,note:e.target.value})}/>

      <button className="btn-green" onClick={submit}>
        Submit request
      </button>
      <button>Cancel</button>
    </div>
  );
}