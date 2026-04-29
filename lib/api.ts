import { getToken } from "./auth";

const API_URL = "http://localhost:3000";

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

// ================= REQUEST =================

export async function createRequest(data: any) {
  const res = await fetch(`${API_URL}/request/create`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function getOpenRequests() {
  const res = await fetch(`${API_URL}/request/open`, {
    headers: authHeaders(),
  });

  return res.json();
}

export async function getRequests() {
  const res = await fetch(`${API_URL}/request`, {
    headers: authHeaders(),
  });

  return res.json();
}

// ================= APPLY =================

export async function createApply(data: any) {
  const res = await fetch(`${API_URL}/apply/create`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function deleteApply(id: number) {
  const res = await fetch(`${API_URL}/apply/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  return res.json();
}