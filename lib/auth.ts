const API_URL = "http://localhost:3000";

export async function loginUser(data: any) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function registerUser(data: any) {
  return fetch(`${API_URL}/auth/regist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

// ===== LOCAL STORAGE =====
export function setUser(user: any) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
  return JSON.parse(localStorage.getItem("user") || "null");
}

export function getToken() {
  const user = getUser();
  return user?.token || null;
}

export function logout() {
  localStorage.removeItem("user");
}