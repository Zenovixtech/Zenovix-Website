import type { Metadata, Viewport } from "next";
import { DM_Sans, Sora, Space_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

// Safe deployment URL resolution (resolves only if an environment variable exists)
const deploymentUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_APP_URL;

export const metadata: Metadata = {
  ...(deploymentUrl ? { metadataBase: new URL(deploymentUrl) } : {}),
  title: "Zenovix Technologies — Master Excel with AI",
  description:
    "A practical live workshop to clean data, build dashboards, and automate Excel reporting with AI.",
  icons: {
    icon: "/images/zenovix-technologies-logo-white.png",
    apple: "/images/zenovix-technologies-logo-white.png",
  },
  openGraph: {
    title: "Zenovix Technologies — Master Excel with AI",
    description:
      "A practical live workshop to clean data, build dashboards, and automate Excel reporting with AI.",
    type: "website",
    locale: "en_US",
    siteName: "Zenovix Technologies",
    images: [
      {
        url: "/images/hero-workspace.jpg",
        width: 1200,
        height: 673,
        alt: "Zenovix Technologies Master Excel with AI Workshop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenovix Technologies — Master Excel with AI",
    description:
      "A practical live workshop to clean data, build dashboards, and automate Excel reporting with AI.",
    images: ["/images/hero-workspace.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#071326",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${sora.variable} ${spaceMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
