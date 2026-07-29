import localFont from "next/font/local";

export const bodyFont = localFont({
  src: [
    {
      path: "./fonts/zen-kaku-gothic-new-latin-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/zen-kaku-gothic-new-latin-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/zen-kaku-gothic-new-latin-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
  preload: false,
});

export const displayFont = localFont({
  src: [
    {
      path: "./fonts/zen-old-mincho-latin-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/zen-old-mincho-latin-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
  preload: false,
});
