export const GET = async () => {
  const reviews = await fetch(process.env.NEXT_PUBLIC_API_URL + "reviews");

  if (!reviews.ok) {
    throw new Error("Failed to fetch reviews");
  }
  const data = await reviews.json();
  return Response.json(data);
};
