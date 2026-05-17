import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { helveticaNeue } from "@/lib/fonts";
import { RolloutHeader } from "@/components/rollout-header";

const geistHeading = Geist({subsets:['latin'],variable:'--font-heading'});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: ["400", "500", "600", "700"]
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Voidnet",
  description: "Voidnet: Building the Agentic Internet for all. for everything.",
  icons: {
    icon: "/favicons/favicon.ico",
    apple: "/favicons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", geistHeading.variable, instrumentSans.variable)}
    >
      <body className={cn("min-h-full flex flex-col", helveticaNeue.className)} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <RolloutHeader />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
