export const GET = async () => {
  // Placeholder function to simulate fetching books from a database or external API
  const books = await fetch(process.env.NEXT_PUBLIC_API_URL + "books");

  if (!books.ok) {
    throw new Error("Failed to fetch books");
  }
  const data = await books.json();
  return Response.json(data);
};
