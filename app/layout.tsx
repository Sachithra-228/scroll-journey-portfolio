import type { Metadata } from "next";
import { Syne, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "SACHITHRA WIJESINGHE — CEO @ Team SYNCODE · Creative Full-Stack Engineer",
  description:
    "Interactive 3D creative portfolio of Sachithra Wijesinghe — Founder & CEO of Team SYNCODE, Full-Stack Software Engineer, YouTube Creator (@sachithra228), and SLBC Radio Presenter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${grotesk.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="bg-void text-bone font-body selection:bg-volt selection:text-void">
        {children}
      </body>
    </html>
  );
}
