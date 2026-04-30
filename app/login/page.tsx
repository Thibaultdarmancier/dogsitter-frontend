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

      if (!res.access_token || !res.user) {
        alert("Login failed");
        return;
      }

      console.log("LOGIN RESPONSE =", res);

      const user = {
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        role: res.user.role,
        token: res.access_token,
      };

      console.log("USER TO SAVE =", user);

      setUser(user);

      console.log("LOCALSTORAGE AFTER LOGIN =", localStorage.getItem("user"));

      window.location.href =
        user.role === "dogsitter" ? "/open-requests" : "/my-requests";

    } catch (err) {
      console.log(err);
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