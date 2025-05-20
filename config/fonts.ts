import { Fira_Code as FontMono, Inter as FontSans, Montserrat, Orbitron, Pixelify_Sans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
export const PixelifySans = Pixelify_Sans({ subsets: ["cyrillic"] });
export const orbitron = Montserrat({ subsets: ["latin"], weight: "400" });
export const fontOrbi = Orbitron({ subsets: ["latin"] });

