"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:3000";

export default function EditProfile() {
  const [form, setForm] = useState<any>({
    name: "",
    lastname: "",
    address: "",
    phone: "",
    email: "",
  });

  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const localUser = getUser();

    if (!localUser) {
      router.push("/login");
      return;
    }

    setUser(localUser);

    const res = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${localUser.token}`,
      },
    });

    const data = await res.json();

    setForm({
      name: data.name || "",
      lastname: data.lastname || "",
      address: data.address || "",
      phone: data.phone || "",
      email: data.email || "",
    });
  };

  const handleSave = async () => {
    try {
      await fetch(`${API_URL}/auth/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      alert("Profile updated!");
      router.push("/profile");

    } catch (err) {
      console.log("UPDATE ERROR", err);
      alert("Error updating profile");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">

        <h2>Edit profile</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Lastname</label>
          <input
            value={form.lastname}
            onChange={(e) =>
              setForm({ ...form, lastname: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input value={form.email} disabled />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />
        </div>

        <div style={{ marginTop: 15 }}>
          <button className="btn-green" onClick={handleSave}>
            Save changes
          </button>

          <button
            className="btn-gray"
            onClick={() => router.push("/profile")}
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}