import ReviewCard from "@/components/review/card/review-card.component";
import { Review } from "@/lib/types";
import { headers } from "next/headers";

const ReviewsPage = async () => {
  const header = await headers();
  const host = header.get("host");
  const protocol = host?.includes("localhost") ? "http://" : "https://";
  const reviews = await fetch(protocol + host + "/api/reviews");

  const reviewsData = await reviews.json();
  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">Reviews</h1>
      <p className="text-gray-600 mb-8 text-center">
        Read what our customers have to say about our products.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviewsData.map((review: Review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
