import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "@/src/components/QueryProvider";
import GlobalGlowBlobs from "@/src/components/GlobalGlowBlobs";

export const metadata: Metadata = {
  title: {
    default: "Luxury Car Rental Dubai | Premium Sports Cars & SUVs",
    template: "%s | Luxury Car Rental Dubai",
  },
  description: "Premium luxury car rental service in Dubai. Rent sports cars, SUVs, and exotic vehicles with competitive rates. Daily, weekly, and monthly rental options available.",
  keywords: ["car rental Dubai", "luxury cars", "sports cars", "SUV rental", "exotic cars", "car hire Dubai"],
  authors: [{ name: "Luxury Car Rental" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Luxury Car Rental Dubai",
    title: "Luxury Car Rental Dubai | Premium Sports Cars & SUVs",
    description: "Premium luxury car rental service in Dubai. Rent sports cars, SUVs, and exotic vehicles.",
  },
  icons: {
    icon: [{ url: "/favicon-removebg-preview.ico" }],
    shortcut: "/shortcut-icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <QueryProvider>
            <GlobalGlowBlobs />
            {children}
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

