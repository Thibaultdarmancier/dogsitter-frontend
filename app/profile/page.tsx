"use client";

import { useEffect, useState } from "react";
import { getUser, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:3000";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const localUser = getUser();

      if (!localUser) {
        router.push("/login");
        return;
      }

      const res = await fetch(`${API_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${localUser.token}`,
        },
      });

      const data = await res.json();

      setUser({
        ...data,
        role: localUser.role, // on garde le role local
      });

    } catch (err) {
      console.log("Error loading profile");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="card profile-card">

      <h2 className="profile-title">My Profile</h2>

      <div className="profile-right">

        <div className="profile-group">
          <label>Name</label>
          <input value={user.name || user.username || ""} readOnly />
        </div>

        <div className="profile-group">
          <label>Email</label>
          <input value={user.email || ""} readOnly />
        </div>

        <div className="profile-group">
          <label>Phone</label>
          <input value={user.phone || "Not provided"} readOnly />
        </div>

        <div className="profile-group">
          <label>Role</label>
          <input value={user.role || ""} readOnly />
        </div>

        <div className="profile-group">
          <label>Address</label>
          <input value={user.address || "Not provided"} readOnly />
        </div>

        {/* 🔥 affichage selon rôle */}
        {user.role === "dogsitter" && (
          <div className="profile-group">
            <label>Status</label>
            <input value="Available for jobs" readOnly />
          </div>
        )}

        {user.role === "owner" && (
          <div className="profile-group">
            <label>Account type</label>
            <input value="Dog owner" readOnly />
          </div>
        )}

        <div className="profile-actions">
          <button className="btn-green">
            Edit profile
          </button>

          <button className="btn-gray" onClick={handleLogout}>
            Logout
          </button>
        </div>

      </div>

    </div>
  );
}