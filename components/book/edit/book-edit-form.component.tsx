"use client";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { Book } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

// Will later merge create and edit form into one component, for now keeping them separate for clarity and ease of development.

const bookSchema = z.object({
  book_title: z.string().min(1, "Book title is required"),
  author: z.string().min(1, "Author is required"),
  bookCover: z
    .any()
    .nullable()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "Max image size is 5MB.",
    )
    .refine(
      (file) =>
        !file ||
        ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(
          file.type,
        ),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
  existingCover: z.string().nullable().optional(),
  summary: z.string().min(1, "Summary is required"),
  pages: z.number().min(1, "Pages must be at least 1"),
  genre: z.string().min(1, "Genre is required"),
});

const EditBookForm = ({ book }: { book: Book }) => {
  const { login, token } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      book_title: book.book_title,
      author: book.author,
      bookCover: null,
      existingCover: book.book_cover,
      summary: book.summary,
      pages: book.pages,
      genre: book.genre,
    },
  });

  const onSubmit = async (data: z.infer<typeof bookSchema>) => {
    // Handle book creation logic here
    if (!data.bookCover || typeof data.bookCover === "string") {
      data.bookCover = data.existingCover; // Use existing cover if no new file is uploaded
    } else {
      // If a new file is uploaded, we will handle it below
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}books/upload`, {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
          },
          body: (() => {
            const formData = new FormData();
            formData.append("image", data.bookCover);
            return formData;
          })(),
        }).then(async (res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          const responseData = await res.json();
          data.bookCover = responseData.url;
        });
      } catch {
        toast.error("Failed to upload book cover. Please try again.");
        return;
      }
    }

    data = { ...data, existingCover: undefined }; // Remove existingCover before sending to API
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}books/${book.id}`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      });

      router.push("/books"); // Redirect to home or books list after update
      toast.success("Book updated successfully!");
    } catch (error) {
      console.error("Book update failed", error);
      toast.error("Failed to update book. Please try again.");
    }
  };

  if (!login) {
    router.push("/login");
    return null;
  }
  return (
    <form
      id="bookEdit"
      className="w-1/3 bg-slate-50 shadow-md p-4 rounded-2xl flex flex-col justify-center"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {/* Form fields for book editing go here */}
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Book</h2>
      <div className="space-y-2 mt-4">
        <FieldGroup>
          <Controller
            name="book_title"
            control={form.control}
            render={({ field }) => (
              <Input
                type="text"
                id="book_title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                placeholder="Enter your book title"
                required
                {...field}
              />
            )}
          />
        </FieldGroup>
      </div>
      <div className="space-y-2 mt-4">
        <FieldGroup>
          <Controller
            name="author"
            control={form.control}
            render={({ field }) => (
              <Input
                type="text"
                id="author"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                placeholder="Enter the author's name"
                required
                {...field}
              />
            )}
          />
        </FieldGroup>
      </div>
      <div className="space-y-2 mt-4">
        <FieldGroup>
          <Controller
            name="bookCover"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field date-invalid={fieldState.invalid}>
                <Input
                  type="file"
                  id="bookCover"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  onChange={(e) => field.onChange(e.target.files?.[0] ?? null)}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>
      <div className="space-y-2 mt-4">
        <FieldGroup>
          <Controller
            name="summary"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field date-invalid={fieldState.invalid}>
                <Input
                  type="text"
                  id="summary"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  placeholder="Enter a brief summary"
                  required
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>
      <div className="space-y-2 mt-4">
        <FieldGroup>
          <Controller
            name="pages"
            control={form.control}
            render={({ field }) => (
              <Input
                type="number"
                id="pages"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                placeholder="Enter number of pages"
                required
                {...field}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
              />
            )}
          />
        </FieldGroup>
      </div>
      <div className="space-y-2 mt-4">
        <FieldGroup>
          <Controller
            name="genre"
            control={form.control}
            render={({ field }) => (
              <Input
                type="text"
                id="genre"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                placeholder="Enter the genre"
                required
                {...field}
              />
            )}
          />
        </FieldGroup>
      </div>
      <div className="mt-6">
        <Button
          type="submit"
          form="bookEdit"
          className="w-full px-4 py-2transition-colors"
        >
          Update Book
        </Button>
      </div>
    </form>
  );
};

export default EditBookForm;
