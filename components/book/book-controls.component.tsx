import { Button } from "../ui/button";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const BookControls = async ({
  totalBooks,
  page,
}: {
  totalBooks: number;
  page?: string;
}) => {
  const totalPages = Math.ceil(totalBooks / 6); //  6

  const secondHighest = totalPages > 1 ? Math.max(1, totalPages - 1) : 1;
  const secondLowest = totalPages > 1 ? Math.min(totalPages, 2) : 1;
  const range = [];

  for (let i = 1; i <= totalPages / 1.75; i++) {
    if (
      i !== 1 &&
      i !== totalPages &&
      i !== secondLowest &&
      i !== secondHighest
    ) {
      range.push(i);
    }
  }

  return (
    <div className="w-full px-4 flex space-x-4 justify-between">
      <div className="">
        <Button asChild>
          <Link href="/books/create">Add New Book</Link>
        </Button>
      </div>

      <div className="">
        <Pagination>
          <PaginationContent>
            {totalPages > 1 && Number(page) > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href={`?page=${Number(page) - 1}`}
                  aria-disabled={Number(page) === 1}
                />
              </PaginationItem>
            )}
            {totalPages > 1 && (
              <PaginationItem>
                <PaginationLink href={`?page=1`} isActive={Number(page) === 1}>
                  1
                </PaginationLink>
              </PaginationItem>
            )}
            {range.map((i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href={`?page=${i}`}
                  isActive={Number(page) === i}
                >
                  {i}
                </PaginationLink>
              </PaginationItem>
            ))}
            {totalPages > 1 && (
              <PaginationItem>
                <PaginationLink
                  href={`?page=${totalPages}`}
                  isActive={Number(page) === totalPages}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}
            {Number(page) < totalPages && (
              <PaginationItem>
                <PaginationNext
                  href={`?page=${Number(page) + 1}`}
                  aria-disabled={Number(page) === totalPages}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default BookControls;
