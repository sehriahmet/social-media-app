import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import LeftSideBar from "@/components/shared/LeftSidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Social Media App",
  description: "a-sehriyaroglu-social-media-app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
          <LeftSideBar />
          <main className="lg:ml-[340px] flex lg:w-full lg:max-w-3xl h-auto flex-col">
            {children}
          </main>
      </body>
    </html>
  );
}
