import TopNav from "@/components/TopNav";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sound Interval Game",
  description: "Hate yourself with negative reinforcement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="theme-custom">
      <body>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
