"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ClipboardList, PlusCircle, User, LogOut } from "lucide-react";
export default function RootLayout({ children }: any) {
  const pathname = usePathname();

  return (
    <html>
      <body>
        <div className="layout">

          {/* 🔶 TOP BAR */}
          <div className="topbar">Dogsitter</div>

          <div className="main">

                <div className="sidebar">
                  <h3>USER MENU</h3>

                  <Link href="/" className={pathname === "/" ? "active" : ""}>
                    <Home size={18} /> Dashboard
                  </Link>

                  <Link href="/my-requests" className={pathname === "/my-requests" ? "active" : ""}>
                    <ClipboardList size={18} /> My requests
                  </Link>

                  <Link href="/create-request" className={pathname === "/create-request" ? "active" : ""}>
                    <PlusCircle size={18} /> Create request
                  </Link>

                  <Link href="#">
                    <User size={18} /> Profile
                  </Link>

                  <Link href="#">
                    <LogOut size={18} /> Logout
                  </Link>
                </div>

            {/* 🔶 PAGE */}
            <div className="content">{children}</div>

          </div>
        </div>
      </body>
    </html>
  );
}