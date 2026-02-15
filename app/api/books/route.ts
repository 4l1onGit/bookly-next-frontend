export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const books = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "books?page=" + page,
  );

  if (!books.ok) {
    throw new Error("Failed to fetch books");
  }
  const data = await books.json();
  return Response.json(data);
};

export const POST = async (request: Request) => {
  const book = await request.json();

  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new Error("Failed to create book");
  }

  const data = await response.json();
  return Response.json(data, { status: 201 });
};
