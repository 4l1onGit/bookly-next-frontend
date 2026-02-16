import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, UserRole } from "@/lib/types";

const UsersTable = ({ users }: { users: User[] }) => {
  return (
    <Table className="">
      <TableCaption>List of all registered users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Roles</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              {user.roles?.includes(UserRole.ADMIN) ? (
                <span className="bg-green-500 p-2 py-1.5 rounded-2xl text-xs font-semibold text-white">
                  Admin
                </span>
              ) : (
                <span className="bg-blue-500 p-2 py-1.5 rounded-2xl text-xs font-semibold text-white">
                  User
                </span>
              )}
            </TableCell>
            <TableCell className="flex justify-end">
              {/* Action buttons for edit/delete can go here */}
              <Button variant="outline">Edit</Button>
              <Button variant="destructive" className="ml-2">
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
