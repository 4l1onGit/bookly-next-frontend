import EditReviewForm from "@/components/review/edit/edit-review-form.component";
import { Review } from "@/lib/types";
import { headers } from "next/headers";

const EditReviewPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const header = await headers();
  const host = header.get("host");
  const protocol = host?.includes("localhost") ? "http://" : "https://";
  const res = await fetch(`${protocol}${host}/api/reviews/${id}`);
  const review: Review = await res.json();

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-center">Edit Review Page</h1>
      <p className="text-center mb-6 text-muted-foreground">
        Here you can edit an existing review entry.
      </p>
      <div className="flex justify-center mt-10">
        <EditReviewForm review={review} />
      </div>
    </div>
  );
};

export default EditReviewPage;
