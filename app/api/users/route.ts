export async function GET(request: Request) {
  const page = new URL(request.url).searchParams.get("page") || "1";
  const limit = new URL(request.url).searchParams.get("limit") || "10";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}users?page=${page}&limit=${limit}`,
    {
      method: "GET",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await res.json();
  return Response.json(data);
}
