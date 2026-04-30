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
        alert(res.message || "Login failed");
        return;
      }

      // 🔥 récupérer profil complet (avec role)
      const profileRes = await fetch(`${API_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${res.access_token}`,
        },
      });

      const profile = await profileRes.json();
      console.log("PROFILE =", profile);

      const user = {
        id: profile.id,
        name: profile.name,
        email: profile.email,
<<<<<<< HEAD
        role: profile.role,
=======
        role: profile.role, // ✅ FIX IMPORTANT
>>>>>>> de5ac1ed1457ec1ab4eda9803c03cbd134b85979
        token: res.access_token,
      };

      setUser(user);

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