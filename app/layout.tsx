import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { cn } from '@/lib/utils';

const lexend = Lexend({ 
  subsets: ["latin"],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: "--font-sans",
 });

export const metadata: Metadata = {
  title: "HealthSync",
  description: "A healthcare management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-dark-300 font-sans antialiased', lexend.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
