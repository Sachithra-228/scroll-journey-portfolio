import type { Metadata } from "next";
import { Fraunces, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sachithra Wijesinghe — software engineer, ui/ux, presenter",
  description:
    "Full-stack developer and UI/UX enthusiast from Sri Lanka. BSc (Hons) IT undergraduate at SLIIT, founder of Team SYNCODE, radio presenter at SLBC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${grotesk.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="bg-ink text-paper font-body">{children}</body>
    </html>
  );
}
