export const GET = async (
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "reviews/" + id);

  if (!res.ok) {
    return res.json().then((data) => {
      return Response.json(
        { message: data.message || "Failed to fetch review", ok: false },
        { status: res.status },
      );
    });
  }

  const review = await res.json();
  return Response.json(review[0]);
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const body = await req.json();

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "reviews/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.get("authorization") || "",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json();

    return Response.json(
      { message: errorData.message || "Failed to update review", ok: false },
      { status: res.status },
    );
  }

  const updatedReview = await res.json();
  return Response.json(updatedReview);
};

export const DELETE = async (
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "reviews/" + id, {
    headers: {
      Authorization: _req.headers.get("authorization") || "",
    },
    method: "DELETE",
  });

  if (!res.ok) {
    return res.json().then((data) => {
      return Response.json(
        { message: data.message || "Failed to delete review", ok: false },
        { status: res.status },
      );
    });
  }

  return Response.json(
    { message: "Review deleted successfully", ok: true },
    { status: 200 },
  );
};
