import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full grid grid-cols-20 md:grid-cols-1 gap-4 items-center justify-center">
      <div className="">
        <div className="">
          <h1 className="text-3xl font-bold ">Welcome to Bookly</h1>
          <p className="mt-4">Discover and review your favorite books!</p>
        </div>
        <div className="flex space-x-5 mt-6">
          <Button asChild>
            <Link href="/register">Join Bookly</Link>
          </Button>
          <Button asChild>
            <Link href="/books">Browse Books</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
