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


export function setUser(user: any) {
  if (typeof window === "undefined") return;

  console.log("SET USER SAVING =", user);

  localStorage.setItem("user", JSON.stringify(user));

  console.log("AFTER SAVE =", localStorage.getItem("user"));
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
}

export function getToken() {
  const user = getUser();
  return user?.token || null;
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
}
