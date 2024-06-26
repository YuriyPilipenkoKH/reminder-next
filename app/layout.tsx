import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { options } from "@/lib/hotToast";
import ThemeProvider from "@/providers/ThemeProvider";
import UserContextProvider from "@/context/UserContextProvider";
import NavBar from "@/components/NavBar";
import Container from "@/components/Container/Container";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reminder",
  description: "Generated by Yuriy",
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
          <Container>
         {/* <ThemeProvider> */}
         <NavBar/>
           {children}
           <Toaster position="top-center" toastOptions={options} gutter={24} />
         {/* </ThemeProvider> */}
          </Container>
        </body>
      </UserContextProvider>
    </html>
  );
}
