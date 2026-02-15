const GET = async (
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const reviews = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "books/" + id + "/reviews",
  );

  if (!reviews.ok) {
    return Response.json(
      { message: "Reviews not found", ok: false },
      { status: 404 },
    );
  }
  const data = await reviews.json();

  return Response.json(data, { status: 200 });
};

export { GET };
