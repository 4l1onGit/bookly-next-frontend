import EditBookForm from "@/components/book/edit/book-edit-form.component";
import { Book } from "@/lib/types";

const BookEditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}books/${id}`);
  const book: Book = await res.json();

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-center">Edit Book Page</h1>
      <p className="text-center mb-6 text-muted-foreground">
        Here you can edit an existing book entry.
      </p>
      <div className="flex justify-center mt-10">
        <EditBookForm book={book} />
      </div>
    </div>
  );
};

export default BookEditPage;
