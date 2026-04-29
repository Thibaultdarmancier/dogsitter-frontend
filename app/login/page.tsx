"use client";

import { useState } from "react";
import { loginUser, setUser} from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleLogin = async () => {
    const res = await loginUser(form);
  
    if (res.access_token) {
      const user = {
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        role: res.user.role,
        token: res.access_token,
      };
  
      setUser(user);
  
      if (user.role === "dogsitter") {
        router.push("/open-requests");
      } else {
        router.push("/my-requests");
      }
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h2>Login</h2>

        <div className="form-group">
          <label>Email</label>
          <input onChange={(e) => setForm({ ...form, email: e.target.value })} />
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