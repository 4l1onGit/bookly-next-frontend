"use client";
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
import { useAuth } from "@/hooks/useAuth";
import { Review, UserRole } from "@/lib/types";
import { Edit, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const UserControls = ({ review }: { review: Review }) => {
  const { user, token } = useAuth();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/reviews/${review.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast.success("Review deleted successfully");
        router.refresh();
      } else {
        toast.error("Failed to delete review");
      }
    } catch {
      toast.error("An error occurred while deleting the review");
    }
  };

  return (
    <div className="">
      {user?.email === review.reviewer.email ||
      user?.roles!.includes(UserRole.ADMIN) ||
      user?.roles!.includes(UserRole.MOD) ? (
        <div className="w-full">
          <div className="flex items-center shrink-0 ">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className=" z-50"
                  variant="destructive"
                  size="sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <TrashIcon className="mr-1" />
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Delete Review</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this review? This action
                    cannot be undone.
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button variant="destructive" onClick={handleDelete}>
                    <TrashIcon className="mr-1" />
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              size="sm"
              className="ml-2"
              onClick={() => router.push(`/reviews/${review.id}/edit`)}
            >
              <Edit className="mr-1" />
              Edit
            </Button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserControls;
