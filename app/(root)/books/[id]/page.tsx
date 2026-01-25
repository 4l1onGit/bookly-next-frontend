import { Card } from "@/components/ui/card";
import { Book } from "@/lib/types";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";

const page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const header = await headers();
  const host = header.get("host");
  const protocol = host?.includes("localhost") ? "http://" : "https://";
  const book = await fetch(`${protocol}${host}/api/books/${id}`);

  if (!book.ok) {
    return (
      <div className="min-h-screen w-full h-full flex flex-col  items-center mb-10">
        <h1 className="text-3xl font-bold ">Book Not Found</h1>
        <p className="mt-4">The requested book does not exist.</p>
      </div>
    );
  }

  const bookData: Book = await book.json();
  return (
    <div className="min-h-screen w-full h-full flex flex-col  items-center mb-10">
      <h1 className="text-3xl font-bold ">Book Details Page</h1>
      <p className="mt-4">Detailed information about the selected book.</p>
      <div className="grid grid-cols-2 w-full mt-8 gap-6 px-4 flex-1">
        <Card className="p-0 flex flex-col justify-center rounded-lg shadow-lg">
          <div className="relative flex  h-full w-full  overflow-hidden rounded-t-lg shadow-lg">
            <Image
              src={bookData.book_cover}
              alt={bookData.book_title}
              quality={75}
              fill
              className="absolute object-cover object-fit"
            />
          </div>
          <div className="p-4 rounded-b-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{bookData.book_title}</h2>
              <p className="text-sm text-muted-foreground">
                by {bookData.author}
              </p>
            </div>

            <p className="mb-4 text-sm">{bookData.summary}</p>

            <div className="flex justify-between text-xs">
              <p className="mb-2 text-muted-foreground">
                Genre: {bookData.genre}
              </p>
              <p className="mb-2 text-muted-foreground">
                Pages: {bookData.pages}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-6 flex flex-col rounded-lg shadow-lg">
          <div className="flex items-center mb-4 justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-semibold">Reviews</h3>
              <span className="text-sm text-muted-foreground">
                {/*
                   to be replaced with actual review count
                */}
                [232]
              </span>
            </div>
            <span>{/* to be replaced with actual average rating */}4</span>
          </div>
          <p className="text-sm">
            {/* to be replaced with actual review content */}
            No reviews available for this book yet.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default page;
