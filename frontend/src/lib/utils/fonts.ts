import {
  DM_Sans,
  Inter,
  Libre_Baskerville,
  Pacifico,
  Rakkas,
} from "next/font/google";

export const fontDM_Sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: "1000",
});

export const fontLibre_BaskervilleItalic = Libre_Baskerville({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-baskerville",
});

export const fontInter = Inter({
  subsets: ["latin"],
  weight: ["300", "700"],
  variable: "--font-inter",
});

export const fontRakkas = Rakkas({
  subsets: ["arabic"],
  variable: "--font-rakkas",
  weight: "400",
});

export const fontPacifico = Pacifico({
  subsets: ["latin"],
  variable: "--font-pacifico",
  weight: "400",
});
