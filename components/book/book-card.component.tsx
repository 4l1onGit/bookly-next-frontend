"use client";
import { Book } from "@/lib/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardDescription, CardFooter, CardHeader } from "../ui/card";

const BookCard = ({ book }: { book: Book }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      whileInView={{ opacity: 1, transition: { duration: 1 }, translateY: 0 }}
      initial={{ opacity: 0, translateY: 20 }}
    >
      <Link key={book.id} href={`/books/${book.id}`}>
        <Card className="p-0 rounded-t-lg">
          <CardHeader className="p-0 rounded-t-lg">
            <div className="relative flex h-60 w-full  overflow-hidden rounded-t-lg">
              <Image
                src={book.book_cover}
                alt={book.book_title}
                fill
                className="absolute object-fit object-cover"
              />
            </div>

            <div className="flex space-x-2 justify-between items-center px-4 ">
              <h2 className="text-xl font-semibold">{book.book_title}</h2>
              <p className="text-gray-600 text-sm">by {book.author}</p>
            </div>
          </CardHeader>
          <CardDescription className="px-4">
            <div className="h-full overflow-hidden text-ellipsis">
              <span>summary: </span>
              <p>{book.summary}</p>
            </div>
          </CardDescription>
          <CardFooter className="p-4">
            <div className="flex justify-between w-full">
              <span className="font-medium text-sm">{book.pages} pages</span>
              <span className="font-medium text-sm">{book.genre}</span>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export default BookCard;
