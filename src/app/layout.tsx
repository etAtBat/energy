import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CognitoWrapper } from "@/components/CognitoProvider";
import { CognitoLogin } from "@/components/CognitoLogin";
import { EnergyCSVForm } from '@/components/EnergyCSVForm';
import { EnergyManualInput } from '@/components/EnergyManualInputForm';
import { EnergyThresholdForm } from '@/components/EnergyThresholdForm'
import { EnergyHistoryForm } from '@/components/EnergyHistoryForm';
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
  title: "Energy tracking app",
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
          <CognitoLogin />
          <section>
            <EnergyCSVForm />
            <EnergyManualInput />
            <EnergyThresholdForm />
            <EnergyHistoryForm />
          </section>
          {children}
        </body>
      </CognitoWrapper>
    </html>
  );
}
