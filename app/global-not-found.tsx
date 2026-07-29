import type { Metadata } from "next";
import { bodyFont, displayFont } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page not found · Kauê Natan Jungles",
  description: "The requested portfolio page could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <main className="not-found page-column">
          <p className="eyebrow">404</p>
          <h1>That page is not here.</h1>
          <p>The rest of the portfolio is still where you left it.</p>
          <a className="button button--primary" href="/">
            Return home
          </a>
        </main>
      </body>
    </html>
  );
}
