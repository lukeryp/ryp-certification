import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "RYP Golf — Level 1 Certification",
  description: "The Golf Textbook Instructor Certification Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${cormorant.variable} ${outfit.variable} font-sans antialiased bg-[#0a0a0a] text-[#e8e4de] min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
