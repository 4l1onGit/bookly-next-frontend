import UniversalPagination from "@/components/pagination/universal-pagination.component";
import SignInFormWrapper from "@/components/signInForm/sign-in-form-wrapper.component";
import { headers } from "next/headers";

const UsersPage = async (props: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) => {
  const { page, limit } = await props.searchParams;

  const header = await headers();
  const host = header.get("host");
  const protocol = host?.includes("localhost") ? "http://" : "https://";
  const usersResponse = await fetch(
    `${protocol}${host}/api/users?page=${page || "1"}&limit=${limit || "10"}`,
  );
  const usersData = await usersResponse.json();

  const users = usersData.data;

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">User Management</h1>
      <p className="text-muted-foreground mb-6 text-center">
        View and manage all registered users.
      </p>
      <UniversalPagination page={page || "1"} totalRecords={usersData.total} />
      <SignInFormWrapper users={users} />
    </div>
  );
};

export default UsersPage;
