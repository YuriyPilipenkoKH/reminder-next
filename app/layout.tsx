import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { options } from "@/lib/hotToast";
import ThemeProvider from "@/providers/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import UserContextProvider from "@/context/UserContextProvider";


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
    <html lang="en"  >
      <UserContextProvider>
        <body className={inter.className}>
         <ThemeProvider>
         <ThemeSwitcher/>
           {children}
           <Toaster position="top-center" toastOptions={options} gutter={24} />
         </ThemeProvider>
        </body>
      </UserContextProvider>
    </html>
  );
}
