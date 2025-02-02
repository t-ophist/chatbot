import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: true,
});

const notoSerifSC = Noto_Serif_SC({
  weight: ['400', '700'],
  subsets: ['latin'],
  preload: true,
  variable: '--font-noto-serif-sc',
});

export const metadata: Metadata = {
  title: "薛公的 AI 小秘书",
  description: "AI 小秘书对话系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerifSC.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
