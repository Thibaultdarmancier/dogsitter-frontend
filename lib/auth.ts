const API_URL = "http://localhost:3000/auth";

export async function registerUser(data: any) {
  const res = await fetch(`${API_URL}/regist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function loginUser(data: any) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

<<<<<<< HEAD
export function setUser(user: any) {
  if (typeof window === "undefined") return;
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem("user");
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
=======
// ===== SAFE LOCAL STORAGE =====

export function setUser(user: any) {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
}

export function getUser() {
  if (typeof window === "undefined") return null; // 🔥 FIX IMPORTANT

  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
>>>>>>> c162ec3e5622ff1c87a7a95409f640bacc7d097e
}

export function getToken() {
  const user = getUser();
  return user?.token || null;
}

export function logout() {
<<<<<<< HEAD
  if (typeof window === "undefined") return;
  localStorage.removeItem("user");
=======
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
>>>>>>> c162ec3e5622ff1c87a7a95409f640bacc7d097e
}