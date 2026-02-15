"use client";
import { useAuth } from "@/hooks/useAuth";
import { Book, UserRole } from "@/lib/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import BookCardSkeleton from "../skeleton/book-card.component";
import { Button } from "../ui/button";
import { Card, CardDescription, CardFooter, CardHeader } from "../ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const BookCard = ({ book }: { book: Book }) => {
  const router = useRouter();
  const { user, loading, token } = useAuth();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/books/${book.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast.success("Book deleted successfully");
        router.refresh();
      } else {
        toast.error("Failed to delete book");
      }
    } catch {
      toast.error("An error occurred while deleting the book");
    }
  };

  if (loading) {
    return <BookCardSkeleton />;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      whileInView={{ opacity: 1, transition: { duration: 1 }, translateY: 0 }}
      initial={{ opacity: 0, translateY: 20 }}
    >
      <Card className="p-0 rounded-t-lg flex-1 flex flex-col justify-between h-full  shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="p-0 rounded-t-lg">
          <div className="relative flex h-60 w-full  overflow-hidden rounded-t-lg">
            <div className="">
              {user && user.roles!.includes(UserRole.USER) && (
                <Button
                  className="bg-blue-500 text-white absolute top-2 left-2 z-50 "
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/books/${book.id}/reviews/create`);
                  }}
                >
                  Write Review
                </Button>
              )}
            </div>
            <Link href={`/books/${book.id}`}>
              <Image
                src={book.book_cover}
                alt={book.book_title}
                fill
                className="absolute object-fit object-cover"
              />
            </Link>
            {user && user.roles!.includes(UserRole.ADMIN) && (
              <div className="absolute top-2 right-2 space-x-2 px-2 py-1 rounded">
                <Button
                  className="bg-amber-500 text-white z-50"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/books/edit/${book.id}`);
                  }}
                >
                  Edit
                </Button>
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
                      <DialogTitle>Delete Book</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this book? This action
                        cannot be undone.
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button variant="destructive" onClick={handleDelete}>
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>

          <div className="flex space-x-2 justify-between items-center px-4 ">
            <h2 className="text-md font-semibold">{book.book_title}</h2>
            <p className="text-gray-600 text-xs">by {book.author}</p>
          </div>
          <CardDescription className="px-4">
            <div className="h-full overflow-hidden text-ellipsis">
              <span className="font-medium text-black">Summary: </span>
              <p className="line-clamp-2 text-ellipsis">{book.summary}</p>
            </div>
          </CardDescription>
        </CardHeader>

        <CardFooter className="p-4">
          <div className="flex justify-between w-full">
            <span className="font-medium text-sm">{book.pages} pages</span>
            <div className="">
              <span className="font-medium text-sm mr-1">Genre:</span>
              <span className="font-medium text-sm bg-blue-500/10 text-blue-700 px-2 py-1 rounded-full">
                {book.genre}
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default BookCard;
