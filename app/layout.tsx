import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

// Components
import Header from "./components/Header";
import Navbar from "./components/Navbar";

// Context
import { NavbarProvider } from "./context/NavbarContext";

const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frontend Mentor | REST Countries API",
  description: "Challenge of Frontend Mentor",
};


export default function RootLayout(
  {children,}: Readonly<{children: React.ReactNode;}>
) {

  return (
    <NavbarProvider>
    <html lang="en">
      <body className={`${nunitoSans.className} text-light-text dark:bg-dark-primary`}>
        <Header/>
        <Navbar/>
        {children}
      </body>
    </html>
    </NavbarProvider>
  );
}
