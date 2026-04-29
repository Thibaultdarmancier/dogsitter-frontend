"use client";
import { useEffect, useState } from "react";
import { API } from "../../lib/api";

export default function MyRequests() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    API.get("/request").then((res) => setData(res.data));
  }, []);

  return (
    <div className="card">
      <h2>My requests</h2>

      <table>
        <thead>
          <tr>
            <th>Dog</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((r) => (
            <tr key={r.id}>
              <td>{r.dogName}</td>
              <td>{r.date}</td>
              <td>{r.timeStart}</td>
              <td>{r.location}</td>
              <td>Open</td>
              <td>
                <button className="btn-green">Edit</button>
                <button className="btn-red">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}