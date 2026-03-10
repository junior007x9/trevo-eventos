import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer"; // Mudamos de @ para um . (ponto)

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trevo Eventos | Teresina",
  description: "Chegue como convidado no seu evento. A Trevo Eventos é referência na realização de eventos sofisticados.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-trevo-black text-trevo-white`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}