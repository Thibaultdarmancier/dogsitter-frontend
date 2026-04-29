"use client";

import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // 👉 à connecter plus tard
      // const res = await API.get("/user/profile");
      // setUser(res.data);

      // placeholder vide pour l’instant
      setUser({
        name: "",
        email: "",
        phone: "",
        role: "",
        address: "",
      });
    } catch (err) {
      console.log("Backend not ready");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="card profile-card">

      <h2 className="profile-title">My Profile</h2>

      <div className="profile-container">

        {/* LEFT - IMAGE */}
        <div className="profile-left">
          <div className="profile-avatar">
            👤
          </div>

          <button className="btn-gray">
            Change photo
          </button>
        </div>

        {/* RIGHT - INFOS */}
        <div className="profile-right">

          <div className="profile-group">
            <label>Name</label>
            <input value={user.name} readOnly placeholder="John Doe" />
          </div>

          <div className="profile-group">
            <label>Email</label>
            <input value={user.email} readOnly placeholder="example@mail.com" />
          </div>

          <div className="profile-group">
            <label>Phone</label>
            <input value={user.phone} readOnly placeholder="+33 6 00 00 00 00" />
          </div>

          <div className="profile-group">
            <label>Role</label>
            <input value={user.role} readOnly placeholder="Dogsitter / User" />
          </div>

          <div className="profile-group form-full">
            <label>Address</label>
            <input value={user.address} readOnly placeholder="City, Country" />
          </div>

          <div className="profile-actions">
            <button className="btn-green">
              Edit profile
            </button>

            <button className="btn-gray">
              Logout
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}