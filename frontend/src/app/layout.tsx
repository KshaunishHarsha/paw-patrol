import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PawPatrolProvider } from "@/context/PawPatrolContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PawPatrol — AI Pet Adoption Matching",
  description:
    "Find your perfect furry companion with AI-powered compatibility matching. PawPatrol analyzes your lifestyle to recommend the best pet match.",
  keywords: ["pet adoption", "AI matching", "dog adoption", "cat adoption", "pet compatibility"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        <PawPatrolProvider>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
          <Toaster position="top-right" richColors />
        </PawPatrolProvider>
      </body>
    </html>
  );
}
