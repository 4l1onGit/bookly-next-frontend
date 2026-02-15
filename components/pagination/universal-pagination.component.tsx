import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const UniversalPagination = ({
  page,
  totalRecords,
}: {
  page: string;
  totalRecords: number;
}) => {
  const totalPages = Math.ceil(totalRecords / 6); //  6

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

          {totalPages > 1 &&
            secondLowest !== 1 &&
            secondLowest !== totalPages &&
            secondLowest !== Number(page) && (
              <PaginationItem>
                <PaginationLink
                  href={`?page=${secondLowest}`}
                  isActive={Number(page) === secondLowest}
                >
                  {secondLowest}
                </PaginationLink>
              </PaginationItem>
            )}
          {totalPages > 1 && page !== "1" && page !== `${totalPages}` && (
            <PaginationItem>
              <PaginationLink
                href={`?page=${page}`}
                isActive={Number(page) === Number(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )}

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
  );
};

export default UniversalPagination;
