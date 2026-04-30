"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  ClipboardList,
  PlusCircle,
  User,
  LogOut,
  FileText,
  LogIn,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getUser, logout } from "@/lib/auth";

export default function RootLayout({ children }: any) {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUserState] = useState<any>(null);

  useEffect(() => {
    const updateUser = () => {
      const u = getUser();
      setUserState(u);
      console.log("LAYOUT USER =", u);
    };

    updateUser();

    // 🔥 écoute les changements après login
    window.addEventListener("storage", updateUser);

    return () => {
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setUserState(null);
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

              {/* ALWAYS */}
              <Link href="/" className={pathname === "/" ? "active" : ""}>
                <Home size={18} /> Dashboard
              </Link>

              {/* NOT CONNECTED */}
              {!user && (
                <>
                  <Link href="/login">
                    <LogIn size={18} /> Login
                  </Link>

                  <Link href="/signup">
                    <User size={18} /> Sign up
                  </Link>
                </>
              )}

              {/* OWNER */}
              {user?.role === "owner" && (
                <>
                  <Link href="/my-requests">
                    <ClipboardList size={18} /> My requests
                  </Link>

                  <Link href="/create-request">
                    <PlusCircle size={18} /> Create request
                  </Link>
                </>
              )}

              {/* DOGSITTER */}
              {user?.role === "dogsitter" && (
                <Link href="/applications">
                  <FileText size={18} /> Applications
                </Link>
              )}

              {/* CONNECTED */}
              {user && (
                <>
                  <Link href="/profile">
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

            {/* PAGE */}
            <div className="content">{children}</div>

          </div>
        </div>
      </body>
    </html>
  );
}