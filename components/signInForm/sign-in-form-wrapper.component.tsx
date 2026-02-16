"use client";
import { User, UserRole } from "@/lib/types";
import UsersTable from "../users/table/users-table.component";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

const SignInFormWrapper = ({ users }: { users: User[] }) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col justify-center w-full h-full py-10">
        <Loader className="animate-spin mx-auto" />
      </div>
    );
  }

  if (!user || !user.roles?.includes(UserRole.ADMIN)) {
    router.push("/login");
  }

  return (
    <div className="flex justify-center ">
      {user && user.roles?.includes(UserRole.ADMIN) ? (
        <UsersTable users={users} />
      ) : (
        <p className="text-center text-red-500">
          You do not have permission to view this page.
        </p>
      )}
    </div>
  );
};

export default SignInFormWrapper;
