export const GET = async (
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const book = await fetch(process.env.API_URL + "books/" + id);

  if (!book.ok) {
    return Response.json(
      { message: "Book not found", ok: false },
      { status: 404 },
    );
  }
  const data = await book.json();

  return Response.json(data, { status: 200 });
};
