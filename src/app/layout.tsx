import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luz da Sabedoria",
  description: "Portal da Fraternidade Luz da Sabedoria",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}