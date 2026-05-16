import { Instrument_Sans, Geist } from "next/font/google";
import localFont from "next/font/local";

export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
});

export const helveticaNeue = localFont({
  src: [
    {
      path: "../public/helvetica-neue/HelveticaNeueRoman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/helvetica-neue/HelveticaNeueMedium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/helvetica-neue/HelveticaNeueBold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});
