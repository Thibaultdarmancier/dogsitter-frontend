"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const loggedUser = getUser();
    setUser(loggedUser);
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="card">
        <h1>Welcome to Dogsitter 🐶</h1>
        <p className="subtitle">
          Your trusted platform to connect dog owners and passionate dogsitters.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <h1>Welcome to Dogsitter 🐶</h1>

      <p className="subtitle">
        Your trusted platform to connect dog owners and passionate dogsitters.
      </p>

      <hr style={{ margin: "20px 0" }} />

      {user && (
        <p>
          Hello <b>{user.name}</b> 👋 <br />
          You're logged in as <b>{user.role}</b>.
        </p>
      )}

      {!user && (
        <p>
          Join our community to find the perfect care for your dog or start earning as a dogsitter.
        </p>
      )}

      <div style={{ marginTop: "20px" }}>
        {user?.role === "owner" && (
          <>
            <p>🐾 Create and manage your dog walking requests easily.</p>
            <p>📅 Choose the date, time and location.</p>
            <p>🤝 Connect with reliable dogsitters near you.</p>
          </>
        )}

        {user?.role === "dogsitter" && (
          <>
            <p>💼 Browse available dog requests.</p>
            <p>📨 Apply to jobs that fit your schedule.</p>
            <p>⭐ Build your reputation with reviews.</p>
          </>
        )}

        {!user && (
          <>
            <p>🐾 Post requests and find trusted help.</p>
            <p>💼 Or become a dogsitter and earn money.</p>
            <p>🚀 Get started by creating an account.</p>
          </>
        )}
      </div>

      <hr style={{ margin: "20px 0" }} />

      <p style={{ color: "#666" }}>
        Dogsitter helps make dog care simple, safe, and stress-free.
      </p>
    </div>
  );
}