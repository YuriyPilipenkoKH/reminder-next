import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { options } from "@/lib/hotToast";
import { Theme } from "@radix-ui/themes";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reminder",
  description: "Generated by me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme appearance="dark" accentColor="indigo">
        {children}
        <Toaster 
         position="top-center"
         toastOptions={options}
         gutter={24}/>
        </Theme>
      </body>
    </html>
  );
}
