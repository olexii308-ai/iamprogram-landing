import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

function resolveMetadataBase() {
  const fallback = "https://promo.bravery.academy";
  const candidate = process.env.NEXT_PUBLIC_SITE_URL || fallback;

  try {
    return new URL(candidate);
  } catch {
    return new URL(fallback);
  }
}

const metadataBase = resolveMetadataBase();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "bravery.academy — платформа для психологів",
    template: "%s | bravery.academy"
  },
  description:
    "Privacy-first platform for psychologists: Zero-Knowledge architecture, secure video sessions, structured clinical tools, and AI supervision. Безпечна платформа для психологів з AI-супервізією.",
  keywords: [
    "платформа для психологів",
    "онлайн терапія",
    "AI супервізія",
    "Zero-Knowledge",
    "zero knowledge therapy notes",
    "AI supervision therapy",
    "secure video therapy",
    "therapy platform",
    "mental health EHR",
    "HIPAA compliant therapy platform",
    "GDPR",
    "private practice tools",
    "безпечна платформа для психолога",
    "AI супервізія для терапевтів"
  ],
  alternates: {
    canonical: "/",
    languages: {
      "uk-UA": "/",
      "en-US": "/"
    }
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "bravery.academy",
    title: "bravery.academy — платформа для психологів",
    description:
      "Безпечні онлайн-сесії, структуровані інструменти та AI-супервізія для приватної практики, клінік і освітніх центрів.",
    locale: "uk_UA",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "bravery.academy — privacy-first platform for psychologists"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "bravery.academy — platform for psychologists",
    description:
      "Secure therapy sessions, tools catalog, analytics, and AI supervision in one privacy-first platform."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  category: "health",
  other: {
    "application-name": "bravery.academy"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
