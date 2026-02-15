import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/navbar/nav.component";
import Footer from "@/components/footer/footer.component";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <Nav />
          <main className="max-w-7xl mx-auto px-4 flex flex-col">
            {children}
          </main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
