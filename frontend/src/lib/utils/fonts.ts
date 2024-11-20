import {
  Khula,
  Libre_Baskerville,
  Noto_Sans_Display,
  Pacifico,
  Rakkas,
} from "next/font/google";

export const fontKhula = Khula({
  subsets: ["latin"],
  variable: "--font-khula",
  weight: "800",
});

export const fontLibre_BaskervilleItalic = Libre_Baskerville({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-baskerville",
});

export const fontNoto_Sans_Display = Noto_Sans_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-noto-display",
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
