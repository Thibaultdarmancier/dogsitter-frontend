import Link from "next/link";

export default function MyRequests() {
  return (
    <div className="card">

      {/* HEADER */}
      <div className="header-row">
        <div>
          <h2>My requests</h2>
          <p className="subtitle">List of your dog walking requests</p>
        </div>

        <Link href="/create-request">
          <button className="btn-green">
            Create request
          </button>
        </Link>
      </div>

      {/* TABLE */}
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
          {/* vide pour l’instant */}
        </tbody>
      </table>

    </div>
  );
}