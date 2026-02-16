import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import { User, UserRole } from "@/lib/types";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

const UsersTable = ({ users }: { users: User[] }) => {
  const { user, token } = useAuth();
  const router = useRouter();

  const handleDelete = (userId: string) => {
    try {
      if (!user || !token) return;

      if (!user.roles?.includes(UserRole.ADMIN)) {
        toast.error("You do not have permission to perform this action.");
        return;
      }

      fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to delete user");
          }
          toast.success("User deleted successfully");
          router.refresh();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } catch {
      toast.error("An unexpected error occurred.");
    }
  };

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
              <Button variant="outline">Edit</Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="bg-red-500 text-white z-50"
                    size="sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Delete User</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this user? This action
                      cannot be undone.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(user.id!)}
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
