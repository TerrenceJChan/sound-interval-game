"use client";

import TopNav from "@/components/TopNav";
import { useEffect } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if (!localStorage.getItem("points")) {
      localStorage.setItem("points", "0");
    }
  }, []);

  return (
    <html lang="en" className="theme-custom">
      <body className="flex min-h-screen flex-col">
        <TopNav />
        {children}
      </body>
    </html>
  );
}
