import UniversalPagination from "../pagination/universal-pagination.component";
import { Button } from "../ui/button";
import Link from "next/link";

const BookControls = async ({
  totalBooks,
  page,
}: {
  totalBooks: number;
  page?: string;
}) => {
  return (
    <div className="w-full px-4 flex space-x-4 justify-between">
      <div className="">
        <Button asChild>
          <Link href="/books/create">Add New Book</Link>
        </Button>
      </div>

      <div className="">
        <UniversalPagination page={page || "1"} totalRecords={totalBooks} />
      </div>
    </div>
  );
};

export default BookControls;
