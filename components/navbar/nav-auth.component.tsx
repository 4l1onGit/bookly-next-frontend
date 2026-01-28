"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Button } from "../ui/button";

const NavAuth = () => {
  const { user, logout } = useAuth();
  return (
    <div className="w-1/4 hidden md:flex justify-end">
      {!user ? (
        <Link href="/login">Sign In</Link>
      ) : (
        <Button className="font-semibold" onClick={logout}>
          Welcome, {user.email.split("@")[0]}
        </Button>
      )}
    </div>
  );
};

export default NavAuth;
