"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { UserRole } from "@/lib/types";

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Welcome {user.email.split("@")[0]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col justify-between">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="/profile" className="w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {user.roles!.includes(UserRole.ADMIN) && (
                <>
                  <DropdownMenuItem>
                    <Link href="/dashboard" className="w-full">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}

              <DropdownMenuItem>
                <Link href="/books/create" className="w-full">
                  Add Book
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuGroup>

            <Button onClick={logout} className="w-full">
              Logout
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default NavAuth;
