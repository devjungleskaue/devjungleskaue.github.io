import type { Metadata, Viewport } from "next";
import { bodyFont, displayFont } from "../fonts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://devjungleskaue.github.io"),
  title: {
    default: "Kauê Natan Jungles · Web & Full-Stack Developer",
    template: "%s · Kauê Natan Jungles",
  },
  description:
    "Web and full-stack developer in Brazil, working in English and Portuguese and available for remote roles.",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#faf8f3",
};

export default function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
