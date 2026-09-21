import type { Metadata } from "next";
import Script from "next/script";
import QuickActions from "@/components/QuickActions";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhamad Rusdiana | Fullstack Developer",
  description:
    "Portfolio of Muhamad Rusdiana, a Fullstack Developer based in Bekasi, Indonesia.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
        >{`try{if(localStorage.getItem("portfolio-theme")==="dark"){document.documentElement.dataset.theme="dark";document.documentElement.style.colorScheme="dark"}}catch{}`}</Script>
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <QuickActions />
      </body>
    </html>
  );
}
