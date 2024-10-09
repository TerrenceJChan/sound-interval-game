"use client";

import RecoilInitializer from "@/components/RecoilInitializer";
import TopNav from "@/components/TopNav";
import { RecoilRoot } from "recoil";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="theme-custom">
      <RecoilRoot>
        <RecoilInitializer />
        <body className="flex min-h-screen flex-col">
          <TopNav />
          {children}
        </body>
      </RecoilRoot>
    </html>
  );
}
