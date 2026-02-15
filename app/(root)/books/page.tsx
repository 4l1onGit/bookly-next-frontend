import BookCard from "@/components/book/book-card.component";
import BookControls from "@/components/book/book-controls.component";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Book } from "@/lib/types";
import { Metadata } from "next";

import { headers } from "next/headers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Books - Bookly",
  description: "Browse and manage your book collection on Bookly.",
};

const page = async (props: { searchParams: Promise<{ page?: string }> }) => {
  const { page } = await props.searchParams;
  const header = await headers();
  const host = header.get("host");
  const protocol = host?.includes("localhost") ? "http://" : "https://";
  const books = await fetch(
    protocol + host + "/api/books/?page=" + (page || "1"),
  );
  const data = await books.json();
  const booksData = data.data as Book[];

  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-2 text-center">Books Page</h1>
      <p className="text-center mb-6 text-muted-foreground">
        Booklys collection of user added books
      </p>
      <BookControls totalBooks={data.total} page={page || "1"} />
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
