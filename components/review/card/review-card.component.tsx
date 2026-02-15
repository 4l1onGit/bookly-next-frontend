import { Review } from "@/lib/types";
import { Card } from "../../ui/card";
import UserControls from "./user-controls.component";

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <Card key={review.id} className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold mb-2">{review.reviewer.email}</h2>
        <UserControls review={review} />
      </div>

      <p className="text-gray-700 mb-1">Rating: {"⭐".repeat(review.rating)}</p>
      <p className="text-gray-600">{review.review_text}</p>
    </Card>
  );
};

export default ReviewCard;
