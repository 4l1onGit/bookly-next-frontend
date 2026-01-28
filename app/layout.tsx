import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/navbar/nav.component";
import Footer from "@/components/footer/footer.component";
import { Toaster } from "sonner";

export const inter = Inter();

export const metadata: Metadata = {
  title: "Bookly",
  description: "A book review site built with Next.js and Symfony backend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased max-w-7xl flex flex-col justify-center mx-auto px-4`}
      >
        <Nav />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
