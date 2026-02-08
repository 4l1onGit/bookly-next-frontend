import CreateBookForm from "@/components/book/create/create-book-form.component";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-center">Create Book Page</h1>
      <p className="text-center mb-6 text-muted-foreground">
        Here you can create a new book entry.
      </p>
      <div className="flex justify-center mt-10">
        <CreateBookForm />
      </div>
    </div>
  );
};

export default page;
