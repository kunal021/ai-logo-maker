import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { ThemeProvider } from "@/components/theme-provider";
import LoadingOverlay from "@/components/loading-overlay";
import { ClerkProvider } from "@clerk/nextjs";

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Logo Ipsum",
  description: "Created by Kunal with 💖",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={hostGrotesk.className}>
          <LoadingOverlay />
          <ThemeProvider
            attribute={"class"}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Provider>{children}</Provider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
