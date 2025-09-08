"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-logo">
        <Link href="/" className="logo">
          e-Loak
        </Link>
      </div>

      {/* Hamburger (mobile only) */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Menu Tengah */}
      <div className={`nav-center ${menuOpen ? "show" : ""}`}>
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

        {/* Auth khusus mobile */}
        <div className="mobile-auth">
          {!session ? (
            <div className="mobile-auth-links">
              <Link href="/auth/login">Login</Link>
              <Link href="/auth/register">Register</Link>
            </div>
          ) : (
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
          )}
        </div>
      </div>

      {/* Menu Kanan (desktop only) */}
      <div className="nav-right">
        {!session ? (
          <>
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/register">Register</Link>
          </>
        ) : (
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
        )}
      </div>
    </nav>
  );
}
