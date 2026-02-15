import CreateReviewForm from "@/components/review/create/create-review-form.component";
import { Book } from "@/lib/types";
import { headers } from "next/headers";

const CreateReviewPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const header = await headers();
  const host = header.get("host");
  const protocol = host?.includes("localhost") ? "http://" : "https://";
  const book = await fetch(protocol + host + "/api/books/" + id);

  if (!book.ok) {
    console.error("Failed to fetch book data:", await book.text()); // Log error response
    return (
      <div className="flex flex-col min-h-screen">
        <h1 className="text-3xl font-bold mb-2 text-center">Book Not Found</h1>
        <p className="text-center mb-6 text-muted-foreground">
          The book with the specified ID was not found.
        </p>
      </div>
    );
  }

  const bookData: Book = await book.json();

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-center">
        Create Review for Book
      </h1>
      <span className="text-lg font-semibold text-center mb-4">
        {bookData.book_title}
      </span>
      <p className="text-center mb-6 text-muted-foreground">
        Write your review for {bookData.book_title} by {bookData.author}
      </p>
      <div className="flex justify-center">
        <CreateReviewForm bookID={bookData.id} />
      </div>
    </div>
  );
};

export default CreateReviewPage;
