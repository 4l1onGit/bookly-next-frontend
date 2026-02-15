export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const limit = url.searchParams.get("limit");
  const reviews = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}reviews?page=${page}&limit=${limit}`,
  );

  if (!reviews.ok) {
    throw new Error("Failed to fetch reviews");
  }
  const data = await reviews.json();
  return Response.json(data);
};
