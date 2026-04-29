"use client";

import { useState } from "react";
import { registerUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    role: "owner",
  });

  const router = useRouter();

  const handleSignup = async () => {
    await registerUser(form);
    alert("Account created!");
    router.push("/login");
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">

        <h2>Sign up</h2>

        <input placeholder="Name" onChange={(e) => setForm({...form, name: e.target.value})} />
        <input placeholder="Lastname" onChange={(e) => setForm({...form, lastname: e.target.value})} />
        <input placeholder="Address" onChange={(e) => setForm({...form, address: e.target.value})} />
        <input placeholder="Phone" onChange={(e) => setForm({...form, phone: e.target.value})} />
        <input placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} />
        <input type="password" placeholder="Password" onChange={(e) => setForm({...form, password: e.target.value})} />

        {/* ROLE */}
        <select onChange={(e) => setForm({...form, role: e.target.value})}>
          <option value="owner">User</option>
          <option value="dogsitter">Dogsitter</option>
        </select>

        <button className="btn-green" onClick={handleSignup}>
          Sign up
        </button>

      </div>
    </div>
  );
}