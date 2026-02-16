export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users/${id}`, {
    headers: {
      Authorization: request.headers.get("authorization") || "",
    },
    method: "DELETE",
  });

  if (!res.ok) {
    return res.json().then((data) => {
      return Response.json(
        { message: data.message || "Failed to delete user", ok: false },
        { status: res.status },
      );
    });
  }

  return Response.json(
    { message: "User deleted successfully", ok: true },
    { status: 200 },
  );
}
