import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: any) {
  const role = "user"; // 🔥 change "user" → "dogsitter" pour tester

  return (
    <html>
      <body>
        <div className="layout">
          <div className="sidebar">
            <h2>Dogsitter</h2>

            <Link href="/">Dashboard</Link>

            {role === "user" && (
              <>
                <Link href="/my-requests">My requests</Link>
                <Link href="/create-request">Create request</Link>
              </>
            )}

            {role === "dogsitter" && (
              <>
                <Link href="/available-requests">Available requests</Link>
                <Link href="/applications">My applications</Link>
              </>
            )}

            <Link href="#">Profile</Link>
            <Link href="#">Logout</Link>
          </div>

          <div className="content">{children}</div>
        </div>
      </body>
    </html>
  );
}