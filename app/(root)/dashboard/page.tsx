"use client";

import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/lib/types";

import Link from "next/link";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user || !user.roles!.includes(UserRole.ADMIN)) {
    return router.push("/books");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-muted-foreground mb-6">
        Welcome to the admin dashboard. Here you can manage users, books, and
        reviews.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/dashboard/users"
          className="flex flex-col p-6 border rounded-lg shadow-sm hover:bg-secondary transition duration-200"
        >
          <h2 className="text-xl font-semibold mb-2">User Management</h2>
          <p className="text-muted-foreground">
            View and manage all registered users.
          </p>
        </Link>

        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Book Management</h2>
          <p className="text-muted-foreground">
            Add, edit, or remove books from the collection.
          </p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Review Management</h2>
          <p className="text-muted-foreground">View and manage user reviews.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
