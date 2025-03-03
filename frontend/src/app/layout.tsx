import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import { Toaster } from "sonner";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { getMetadata } from "@/config/metadata";
import {
  fontAmiri,
  fontDM_Sans,
  fontInter,
  fontLibre_BaskervilleItalic,
  fontPacifico,
  fontRakkas,
} from "@/lib/utils/fonts";
import ThemeScript from "@/stores/ThemeScript";

export const metadata: Metadata = getMetadata();

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className="overflow-x-clip" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${fontDM_Sans.variable} ${fontLibre_BaskervilleItalic.variable}
        ${fontInter.variable} ${fontRakkas.variable} ${fontPacifico.variable} 
        ${fontAmiri.variable}
        overflow-x-clip relative w-full
        dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-inter font-normal`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
