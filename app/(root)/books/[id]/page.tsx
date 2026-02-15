import BookCard from "@/components/book/book-card.component";
import UniversalPagination from "@/components/pagination/universal-pagination.component";
import { Card, CardFooter } from "@/components/ui/card";
import { Book, Review } from "@/lib/types";
import { headers } from "next/headers";

const page = async (props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string; limit?: string }>;
}) => {
  const { id } = await props.params;
  const { page, limit } = await props.searchParams;
  const header = await headers();
  const host = header.get("host");
  const protocol = host?.includes("localhost") ? "http://" : "https://";
  const book = await fetch(`${protocol}${host}/api/books/${id}`);

  const reviewsResponse = await fetch(
    `${protocol}${host}/api/books/${id}/reviews?page=${page || "1"}&limit=${limit || "5"}`,
  );

  const reviewsData = await reviewsResponse.json();

  const reviews = reviewsData.data as Review[];

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
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full mt-8 gap-6 px-4 flex-1">
        <div className="h-3/4">
          <BookCard book={bookData} />
        </div>

        <Card className="p-6 flex flex-col rounded-lg shadow-lg">
          <div className="flex items-center mb-4 justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-semibold">Reviews</h3>
              <span className="text-sm text-muted-foreground">
                {/*
                   to be replaced with actual review count
                */}
                [{reviewsData.total} reviews]
              </span>
            </div>
            <span>
              {reviews.length > 0
                ? `Average ${(reviews.reduce((acc: number, review: Review) => acc + review.rating, 0) / reviews.length).toFixed(1)} / 5`
                : "No ratings yet"}
            </span>
          </div>
          <div className="text-sm space-y-4">
            {/* to be replaced with actual review content */}
            {reviews.length === 0
              ? "No reviews available for this book yet."
              : reviews.map((review: Review) => (
                  <div
                    className="flex flex-col justify-between space-y-2 bg-primary/7 shadow-md p-4 rounded h-28 overflow-hidden"
                    key={review.id}
                  >
                    <div className="flex justify-between">
                      <span>{review.review_text}</span>
                      <span>{review.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      by {review.reviewer.email}
                    </span>
                  </div>
                ))}
          </div>
          <CardFooter className="flex items-center justify-end pt-4">
            <UniversalPagination
              page={page || "1"}
              totalRecords={reviewsData.total}
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default page;
