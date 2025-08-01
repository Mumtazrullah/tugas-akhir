// app/components/Navbar.tsx
"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

type SessionUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
};

type Session = {
  user?: SessionUser;
};

export default function Navbar() {
  const { data: session } = useSession() as { data: Session | null };
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar">
      {/* Kiri: Logo */}
      <div className="nav-logo">
        <Link href="/" className="logo">e-Loak</Link>
      </div>

      {/* Tengah: Navigasi umum */}
      <div className="nav-center">
        <Link href="/">Home</Link>
        {session?.user?.role === "admin" ? (
          <>
            <Link href="/admin/books">Manage Books</Link>
            <Link href="/admin/stationery">Manage Stationery</Link>
          </>
        ) : (
          <>
            
            <Link href="/products/books">Books</Link>
            <Link href="/products/stationery">Stationery</Link>
          </>
        )}
        <Link href="/about">About</Link>
      </div>

      {/* Kanan: Auth info */}
      <div className="nav-right">
        {session ? (
          <div
            className="user-menu"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <span className="user-email">{session.user?.email}</span>
            {showDropdown && (
              <div className="dropdown">
                <button onClick={() => signOut()}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
