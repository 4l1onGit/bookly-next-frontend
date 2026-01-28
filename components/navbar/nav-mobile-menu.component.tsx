"use client";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import NavLogo from "./nav-logo.component";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";

const links = [
  { name: "Home", href: "/" },
  { name: "Books", href: "/books" },
  { name: "Reviews", href: "/reviews" },
];

const NavMobileMenu = () => {
  const { user, logout } = useAuth();
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="md:hidden block w-6 h-6 cursor-pointer" />
      </SheetTrigger>

      <SheetContent className="w-3/4 transition-all duration-150 ease-in-out">
        <SheetHeader className="mt-8">
          <SheetTitle>
            <NavLogo />
          </SheetTitle>
          <SheetDescription>
            Welcome, {user?.email.split("@")[0]}
          </SheetDescription>
        </SheetHeader>
        <div className="p-4">
          <ul className="flex-col space-y-5 flex ">
            {links.map((link) => (
              <Link key={link.name} href={link.href} className="py-2 border-b">
                {link.name}
              </Link>
            ))}
            {!user ? (
              <Link href="/login" className="py-2 border-b">
                Sign In
              </Link>
            ) : (
              <Button onClick={logout} className="py-2 border-b">
                Sign Out
              </Button>
            )}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavMobileMenu;
