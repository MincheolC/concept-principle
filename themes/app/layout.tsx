import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/stores/context";
import { defaultTheme } from "@/styles/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brand Color Mood Board",
  description: "Compare brand color mood",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-[${defaultTheme.colors.background}] text-[${defaultTheme.colors.text}]`}>
        {children}
      </body>
    </html>
  );
}
