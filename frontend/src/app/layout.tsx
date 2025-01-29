import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import { Toaster } from "sonner";
import IntersectObserverProvider from "@/components/providers/IntersectObserverProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";

import {
  fontAmiri,
  fontDM_Sans,
  fontInter,
  fontLibre_BaskervilleItalic,
  fontPacifico,
  fontRakkas,
} from "@/lib/utils/fonts";

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
    <html lang="en" className="overflow-x-clip">
      <body
        className={`${fontDM_Sans.variable} ${fontLibre_BaskervilleItalic.variable}
        ${fontInter.variable} ${fontRakkas.variable} ${fontPacifico.variable} 
        ${fontAmiri.variable}
        overflow-x-clip relative w-full 
        dark:bg-neutral-700 text-gray-900 dark:text-gray-100 font-inter`}
        suppressHydrationWarning
      >
        <IntersectObserverProvider>
          <ThemeProvider>
            {children}
            <Toaster />
          </ThemeProvider>
        </IntersectObserverProvider>
      </body>
    </html>
  );
}
