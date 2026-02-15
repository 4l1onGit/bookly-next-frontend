export const GET = async (
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const book = await fetch(process.env.NEXT_PUBLIC_API_URL + "books/" + id);

  if (!book.ok) {
    return Response.json(
      { message: "Book not found", ok: false },
      { status: 404 },
    );
  }
  const data = await book.json();

  return Response.json(data, { status: 200 });
};

export const DELETE = async (
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "books/" + id, {
    headers: {
      Authorization: _req.headers.get("authorization") || "",
    },
    method: "DELETE",
  });

  if (!res.ok) {
    return res.json().then((data) => {
      return Response.json(
        { message: data.message || "Failed to delete book", ok: false },
        { status: res.status },
      );
    });
  }

  return Response.json(
    { message: "Book deleted successfully", ok: true },
    { status: 200 },
  );
};
