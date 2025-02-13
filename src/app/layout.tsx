import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CognitoWrapper } from "@/components/CognitoProvider";
import { CognitoLogin } from "@/components/CognitoLogin";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CognitoWrapper>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <CognitoLogin>
            {children}
          </CognitoLogin>
        </body>
      </CognitoWrapper>
    </html>
  );
}
