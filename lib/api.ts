const API_URL = "http://localhost:3000";

// ===== REQUEST =====

export async function getRequests() {
  const res = await fetch(`${API_URL}/request`);
  return res.json();
}

export async function getOpenRequests() {
  const res = await fetch(`${API_URL}/request/open`);
  return res.json();
}

export async function getRequest(id: number) {
  const res = await fetch(`${API_URL}/request/${id}`);
  return res.json();
}

export async function createRequest(data: any) {
  return fetch(`${API_URL}/request/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function updateRequest(id: number, data: any) {
  return fetch(`${API_URL}/request/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function deleteRequest(id: number) {
  return fetch(`${API_URL}/request/${id}`, {
    method: "DELETE",
  });
}