const API_URL = "http://localhost:3000";

// ===== MOCK =====
const mockRequests = [
  {
    id: 1,
    dog_id: 1,
    user_id: 1,
    service_id: 1,
    address: "Phuket",
    date: "2026-05-01",
    time: "10:00",
    service_type: "Walk",
  },
  {
    id: 2,
    dog_id: 2,
    user_id: 1,
    service_id: 2,
    address: "Patong",
    date: "2026-05-02",
    time: "14:00",
    service_type: "Sitting",
  },
];

// ===== REQUEST =====

export async function getRequests() {
  try {
    const res = await fetch(`${API_URL}/request`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return mockRequests;
  }
}

export async function deleteRequest(id: number) {
  return fetch(`${API_URL}/request/${id}`, {
    method: "DELETE",
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