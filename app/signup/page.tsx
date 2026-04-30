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
  });

  const router = useRouter();

  const handleSignup = async () => {
    try {
      const res = await registerUser(form);

      console.log("REGISTER RESPONSE =", res);

      if (res?.message === "Register Complete") {
        alert("Account created!");
        router.push("/login");
      } else {
        alert(res?.message || "Signup failed");
      }

    } catch (error) {
      console.log("REGISTER ERROR =", error);
      alert("Connection error");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">

        <h2>Sign up</h2>

        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Lastname"
          onChange={(e) => setForm({ ...form, lastname: e.target.value })}
        />

        <input
          placeholder="Address"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          placeholder="Phone"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="btn-green" onClick={handleSignup}>
          Sign up
        </button>

      </div>
    </div>
  );
}