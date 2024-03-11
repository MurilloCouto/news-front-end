import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Menu } from "@/components/Menu";

import "./globals.scss";

import { AuthProvider } from "./AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ohbless",
  description: "Your daily news",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="pt-BR">
        <body className={inter.className}>
          <Menu />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
