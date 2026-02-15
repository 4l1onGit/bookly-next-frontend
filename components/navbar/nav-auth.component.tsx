"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

const NavAuth = () => {
  const { user, logout, loading } = useAuth();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <div className="w-1/4 hidden md:flex justify-end"></div>;
  }

  if (loading) {
    return <div className="w-1/4 hidden md:flex justify-end">Loading...</div>;
  }
  return (
    <div className="w-1/4 hidden md:flex justify-end">
      {!user ? (
        <Link href="/login">Sign In</Link>
      ) : (
        <Button variant="ghost" className="font-semibold" onClick={logout}>
          Welcome, {user.email.split("@")[0]}
        </Button>
      )}
    </div>
  );
};

export default NavAuth;
