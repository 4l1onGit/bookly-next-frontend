import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const BookControls = () => {
  return (
    <div className="w-full px-4 flex space-x-4 justify-between">
      <div className="">
        <Button asChild>
          <Link href="/books/create">Add New Book</Link>
        </Button>
      </div>

      <div className="">
        <span className="text-xs text-muted-foreground">
          pagination to be added
        </span>
      </div>
    </div>
  );
};

export default BookControls;
