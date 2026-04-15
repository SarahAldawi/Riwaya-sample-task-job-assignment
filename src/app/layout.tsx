import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://TheStore-assignment-task.netlify.app"),
  title: {
    default: "Assignment Task",
    template: "%s | Assignment Task",
  },

  description:
    "A frontend assignment project built for Riwaya job application. Demonstrating modern Next.js, performance, and UI development skills.",

  keywords: [
    "ecommerce",
    "online store",
    "shopping",
    "buy products",
    "next.js store",
    "fast checkout",
    "job application project",
    "Next.js project",
    "React developer task",
    "ecommerce UI",
  ],

  authors: [{ name: "Sarah Aldawi" }],

  creator: "Sarah Aldawi",

  openGraph: {
    type: "website",
    url: "https://TheStore-assignment-Job-task.netlify.app",
    title: "The Store",
    description:
      "Discover high-quality products at the best prices with a smooth shopping experience.",
    siteName: "The Store",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Store Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "My Store",
    description:
      "Discover high-quality products at the best prices with a smooth shopping experience.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
