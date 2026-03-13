import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SSQS | Solid-State Quantum Storage Laboratory",
  description:
    "An academic research group website focused on rare-earth solid-state quantum memories, coherence spectroscopy, and network-ready quantum information platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
