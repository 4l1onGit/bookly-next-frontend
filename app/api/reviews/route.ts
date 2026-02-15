export const GET = async () => {
  // Placeholder function to simulate fetching reviews from a database or external API
  const reviews = await fetch(process.env.NEXT_PUBLIC_API_URL + "reviews");

  if (!reviews.ok) {
    throw new Error("Failed to fetch reviews");
  }
  const data = await reviews.json();
  return Response.json(data);
};
