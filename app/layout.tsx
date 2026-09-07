import type { Metadata } from "next";
import { Big_Shoulders_Stencil_Display, Archivo, JetBrains_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import Chat from "./components/Chat";
import "./globals.css";

const stencil = Big_Shoulders_Stencil_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-stencil",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vandan Agrawal — Software Engineer",
  description:
    "Vandan Agrawal's portfolio — production RAG/LLM systems, full-stack and mobile engineering, and hands-on security research (malware reverse engineering, adversarial ML defenses).",
  keywords: [
    "Vandan Agrawal",
    "portfolio",
    "software engineer",
    "RAG",
    "LLM",
    "cybersecurity",
    "malware analysis",
    "University of Florida",
  ],
  openGraph: {
    title: "Vandan Agrawal — Software Engineer",
    description:
      "Production RAG/LLM systems, full-stack and mobile engineering, and hands-on security research.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${stencil.variable} ${archivo.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-board-black text-ink-body antialiased">
        {/*
          THESIS: An engineering build/deploy dashboard rendered in forge heat-gradient
          color language — refuses both the neon-terminal cliche and a soft muted-craft
          look; the site reads as a live systems monitor for a career, not a resume page.
          OWN-WORLD: True black ground, one committed accent (bright orange, 55-60% via
          headline mass + numerals + fills), cherry-to-white-heat gradient reserved for
          real before/after deltas only. Big Shoulders Stencil Display for headlines,
          Archivo for body/labels, JetBrains Mono for real metrics only.
          STORY: A recruiter sees a live "build feed" of real numbers (users scaled,
          accuracy deltas) beside the headline, then a persistent icon rail (Profile /
          Stack / Build Log / Releases / Deploy) that behaves like a real app shell.
          FIRST VIEWPORT: Left icon rail, oversized stencil headline + tagline + two
          CTAs on the left two-thirds, a live build-feed panel with a heat-gradient
          delta strip and three real readouts on the right third.
          FORM: bolder-register re-roll, challenger "the Forge" (blacksmith power-hammer
          catalog direction) fused with the product as a build/deploy dashboard per the
          user's explicit steer toward AI-engineer/SWE vibes; seed key 97a554ae.
          FINISH: unreviewed and undocumented is unfinished; this build ends with the
          finish review, the verdict, DESIGN.md, and every shipping raster carrying its
          provenance.
        */}
        <Navbar />
        <main className="bg-forge min-h-screen pb-16 md:pb-0">{children}</main>
        <Chat />
      </body>
    </html>
  );
}
