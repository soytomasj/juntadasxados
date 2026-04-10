import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JuntadasXados",
  description: "Hacé click acá y mira las juntadas mas pijudas del condado ✨🍆",
  openGraph: {
    title: "JuntadasXados",
    description: "Hacé click acá y mira las juntadas mas pijudas del condado ✨🍆",
    url: "https://juntadas.xados.wtf",
    siteName: "JuntadasXados",
    locale: "es_PY",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}