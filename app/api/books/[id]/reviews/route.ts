const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const limit = url.searchParams.get("limit");
  const reviews = await fetch(
    process.env.NEXT_PUBLIC_API_URL +
      "books/" +
      id +
      `/reviews?page=${page}&limit=${limit}`,
  );

  if (!reviews.ok) {
    const errorData = await reviews.json();
    console.error("Error fetching reviews:", errorData);
    return Response.json(
      { message: errorData.message || "Reviews not found", ok: false },
      { status: reviews.status },
    );
  }
  const data = await reviews.json();

  return Response.json(data, { status: 200 });
};

export { GET };
