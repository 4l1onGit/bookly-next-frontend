import UniversalPagination from "@/components/pagination/universal-pagination.component";
import ReviewCard from "@/components/review/card/review-card.component";
import { Review } from "@/lib/types";
import { headers } from "next/headers";

const ReviewsPage = async (props: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) => {
  const { page, limit } = await props.searchParams;
  const header = await headers();
  const host = header.get("host");
  const protocol = host?.includes("localhost") ? "http://" : "https://";
  const reviewsResponse = await fetch(
    `${protocol}${host}/api/reviews?page=${page || "1"}&limit=${limit || "9"}`,
  );

  const reviewsData = await reviewsResponse.json();

  const reviews = reviewsData.data as Review[];

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">Reviews</h1>

      <p className="text-gray-600 mb-8 text-center">
        Read what our customers have to say about our products.
      </p>
      <div className="mb-5">
        <UniversalPagination
          page={page || "1"}
          totalRecords={reviewsData.total}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review: Review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
