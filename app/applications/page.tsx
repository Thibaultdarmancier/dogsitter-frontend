export default function Applications() {
  return (
    <div className="card">
      <h2>My applications</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Dog name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {/* vide pour l’instant (front only) */}
        </tbody>
      </table>

      <p style={{ marginTop: "15px", color: "#666" }}>
        No applications yet
      </p>
    </div>
  );
}