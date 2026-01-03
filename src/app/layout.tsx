import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Rental Car Admin",
  description: "Admin Dashboard",
  icons: {
    icon: [{ url: "/favicon-removebg-preview.ico" }], // Simple path relative to the public folder
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
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
