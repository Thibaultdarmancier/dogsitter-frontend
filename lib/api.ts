const API_URL = "http://localhost:3000";

function getToken() {
  if (typeof window === "undefined") return null;

  const user = JSON.parse(localStorage.getItem("user") || "null");
  return user?.token || null;
}

async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = getToken();

  const headers: any = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return res.json();
}

//
// ===== REQUEST =====
//

export function getRequests() {
  return apiFetch("/request");
}

export function getOpenRequests() {
  return apiFetch("/request/open");
}

export function getRequest(id: number) {
  return apiFetch(`/request/${id}`);
}

export async function createRequest(data: any) {
  const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;

  return fetch(`${API_URL}/request/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export function updateRequest(id: number, data: any) {
  return apiFetch(`/request/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteRequest(id: number) {
  return apiFetch(`/request/${id}`, {
    method: "DELETE",
  });
}

//
// ===== APPLY =====
//

export function createApply(data: any) {
  return apiFetch("/apply/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function deleteApply(id: number) {
  return apiFetch(`/apply/${id}`, {
    method: "DELETE",
  });
}

export function getApplications() {
  return apiFetch("/apply");
}

//
// ===== USER =====
//

export function getUsers() {
  return apiFetch("/auth");
}