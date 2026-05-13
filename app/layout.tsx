import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vandan Agrawal — CS Engineer & Cybersecurity Specialist",
  description:
    "Portfolio of Vandan Agrawal — Computer Science MS (UF), specializing in cybersecurity, malware analysis, software development, and game development.",
  keywords: [
    "Vandan Agrawal",
    "portfolio",
    "computer science",
    "cybersecurity",
    "malware analysis",
    "software engineer",
    "University of Florida",
  ],
  openGraph: {
    title: "Vandan Agrawal — CS Engineer & Cybersecurity Specialist",
    description:
      "Explore Vandan's projects, experience, and skills in Software Engineering and Development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-bg-base text-terminal-white antialiased scanlines">
        {children}
      </body>
    </html>
  );
}
