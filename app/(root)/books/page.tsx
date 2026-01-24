import BookCard from "@/components/book/book-card.component";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Book } from "@/lib/types";

import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
  const header = await headers();
  const host = header.get("host");
  const protocal = host?.includes("localhost") ? "http://" : "https://";
  const books = await fetch(protocal + host + "/api/books");

  const booksData = await books.json();

  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-2 text-center">Books Page</h1>
      <p className="text-center mb-6 text-muted-foreground">
        Booklys collection of user added books
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-6">
        {booksData &&
          booksData.map((book: Book) => <BookCard key={book.id} book={book} />)}
      </div>
    </div>
  );
};

export default page;
