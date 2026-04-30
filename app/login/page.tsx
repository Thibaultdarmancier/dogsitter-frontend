"use client";

import { useState } from "react";
import { loginUser, setUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:3000";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await loginUser(form);

      console.log("LOGIN RESPONSE =", res);

      if (!res.access_token) {
        alert("Login failed");
        return;
      }

      // 🔥 GET PROFILE AVEC ROLE
      const profileRes = await fetch(`${API_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${res.access_token}`,
        },
      });

      const profile = await profileRes.json();

      console.log("PROFILE =", profile);

      const user = {
        id: profile.id,
        name: profile.name || profile.username,
        email: profile.email,
        role: profile.role, // ✅ vrai rôle backend
        token: res.access_token,
      };

      console.log("USER STORED =", user);

      setUser(user);

      // 🔥 IMPORTANT : force update du layout
      window.dispatchEvent(new Event("storage"));

      // 🔁 REDIRECTION
      if (user.role === "dogsitter") {
        router.push("/applications");
      } else {
        router.push("/my-requests");
      }

    } catch (err) {
      console.log("LOGIN ERROR =", err);
      alert("Connection error");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h2>Login</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button className="btn-green" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}