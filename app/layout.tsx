"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, ClipboardList, PlusCircle, User, LogOut, FileText, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { getUser, logout } from "@/lib/auth";

export default function RootLayout({ children }: any) {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u = getUser();
    setUser(u);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push("/");
  };

  return (
    <html>
      <body>
        <div className="layout">

          {/* 🔶 TOP BAR */}
          <div className="topbar">Dogsitter</div>

          <div className="main">

            {/* 🔶 SIDEBAR */}
            <div className="sidebar">
              <h3>MENU</h3>

              {/* ALWAYS VISIBLE */}
              <Link href="/" className={pathname === "/" ? "active" : ""}>
                <Home size={18} /> Dashboard
              </Link>

              {/* ===== NOT CONNECTED ===== */}
              {!user && (
                <>
                  <Link
                    href="/login"
                    className={pathname === "/login" ? "active" : ""}
                  >
                    <LogIn size={18} /> Login
                  </Link>

                  <Link
                    href="/signup"
                    className={pathname === "/signup" ? "active" : ""}
                  >
                    <User size={18} /> Sign up
                  </Link>
                </>
              )}

              {/* ===== OWNER ===== */}
              {user?.role === "owner" && (
                <>
                  <Link
                    href="/my-requests"
                    className={pathname === "/my-requests" ? "active" : ""}
                  >
                    <ClipboardList size={18} /> My requests
                  </Link>

                  <Link
                    href="/create-request"
                    className={pathname === "/create-request" ? "active" : ""}
                  >
                    <PlusCircle size={18} /> Create request
                  </Link>
                </>
              )}

              {/* ===== DOGSITTER ===== */}
              {user?.role === "dogsitter" && (
                <Link
                  href="/applications"
                  className={pathname === "/applications" ? "active" : ""}
                >
                  <FileText size={18} /> Applications
                </Link>
              )}

              {/* ===== CONNECTED ONLY ===== */}
              {user && (
                <>
                  <Link
                    href="/profile"
                    className={pathname === "/profile" ? "active" : ""}
                  >
                    <User size={18} /> Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </>
              )}
            </div>

            {/* 🔶 PAGE */}
            <div className="content">{children}</div>

          </div>
        </div>
      </body>
    </html>
  );
}