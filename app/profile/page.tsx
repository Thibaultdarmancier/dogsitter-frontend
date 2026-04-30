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
        name: data.name || data.username || "",
        email: data.email || "",
        role: data.role || localUser.role,
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

        {/* NAME */}
        <div className="profile-group">
          <label>Name</label>
          <p><b>{user.name || "-"}</b></p>
        </div>

        {/* EMAIL */}
        <div className="profile-group">
          <label>Email</label>
          <p>{user.email}</p>
        </div>

        {/* ROLE */}
        <div className="profile-group">
          <label>Role</label>
          <p>{user.role}</p>
        </div>

        {/* BONUS INFO */}
        {user.role === "dogsitter" && (
          <div className="profile-group">
            <label>Status</label>
            <p>Available for jobs</p>
          </div>
        )}

        {user.role === "owner" && (
          <div className="profile-group">
            <label>Account type</label>
            <p>Dog owner</p>
          </div>
        )}

        {/* ACTIONS */}
        <div className="profile-actions">
          <button
            className="btn-green"
            onClick={() => router.push("/edit-profile")}
          >
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