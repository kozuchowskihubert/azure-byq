import type { Metadata, Viewport } from "next";
import { SessionProvider } from "next-auth/react"
import { CartProvider } from "@/context/CartContext"
import Navbar from "@/components/Navbar"
import "./globals.css";

export const metadata: Metadata = {
  title: "ZKURCZYBYQ — Burgery & Radio | Radzymin",
  description: "Najlepsze burgery w Radzyminie. Zamów online lub odwiedź nas przy ul. Ignacego Daszyńskiego 8.",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="main-body">
        <SessionProvider>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
