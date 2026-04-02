import type { Metadata } from "next";
import { Raleway, Work_Sans } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RYP Golf — Certification",
  description: "RYP Golf Instructor & Staff Certification Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${raleway.variable} ${workSans.variable} antialiased bg-[#0d0d0d] text-[#f0f0f0] min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
