import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center">
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
      <div className="relative w-full h-64 md:h-96">
        <Image
          src="/bookly-hero.jpg"
          alt="Bookly Hero Image"
          fill
          className="mx-auto absolute"
        />
        <span className="absolute bottom-0 right-0 text-xs text-white bg-black bg-opacity-50 p-1">
          Photo by{" "}
          <a href="https://unsplash.com/@inakihxz?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Iñaki del Olmo
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/photos/assorted-title-of-books-piled-in-the-shelves-NIJuEQw0RKg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </span>
      </div>
    </div>
  );
}
