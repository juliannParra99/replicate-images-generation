import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ExploreModelsSection from "@/components/ExploreModelsSection";
import { HeroSection } from "@/components/HeroSection";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Replicate AI",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] bg-background px-4 font-sans antialiased">
      <Navbar/>
      <HeroSection/>

      <main className="py-8">{children}</main>
      <ExploreModelsSection/>
      <Footer/>
      </body>
    </html>
  );
}
