import BookCard from "@/components/book/book-card.component";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Book } from "@/lib/types";

import { headers } from "next/headers";
import Link from "next/link";

const page = async () => {
  const header = await headers();
  const host = header.get("host");
  const protocol = host?.includes("localhost") ? "http://" : "https://";
  const books = await fetch(protocol + host + "/api/books");

  const booksData = await books.json();
  // booksData.length = 0;

  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-2 text-center">Books Page</h1>
      <p className="text-center mb-6 text-muted-foreground">
        Booklys collection of user added books
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-6 px-4">
        {booksData &&
          booksData.map((book: Book) => <BookCard key={book.id} book={book} />)}
        {!booksData.length && (
          <Card className="grid col-span-4 p-8 border-dashed border-2">
            <CardHeader>
              <CardDescription className="text-center space-y-4">
                <span>No books added yet.</span>
                <br />
                <Link
                  href="/books/create"
                  className="text-primary underline hover:text-primary/80"
                >
                  Add a new book
                </Link>
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col items-center"></CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default page;
