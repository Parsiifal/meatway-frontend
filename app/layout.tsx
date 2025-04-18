import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/styles/globals.css";
import { Providers } from "@/app/providers/providers";
import { NavbarShowcase } from "@/widgets/navbar";
import { NavbarProvider } from "@/widgets/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MeatWay",
  description: "Покупай мясо легко!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icons/favicon.ico"/>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NavbarProvider>
          <Providers>
            <NavbarShowcase/>
            <main>
              {children}
            </main>
          </Providers>
        </NavbarProvider>
      </body>
    </html>
  );
}
