import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import {
  fontDM_Sans,
  fontLibre_BaskervilleItalic,
  fontInter,
  fontRakkas,
  fontPacifico,
} from "@/lib/utils/fonts";
import Navigation from "@/components/layout/Navigation";
import ThemeProvider from "@/components/providers/ThemeProvider";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Home - Elomar",
  description: "Personal portfolio website of Elomar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${fontDM_Sans.variable} ${fontLibre_BaskervilleItalic.variable}
        ${fontInter.variable} ${fontRakkas.variable} ${fontPacifico.variable}
        dark:bg-neutral-700 text-gray-900 dark:text-gray-100 font-inter`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Navigation />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
