import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import CalendarContext from "@/contexts/CalendarContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Հետախույզ լրատվական",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <CalendarContext>
      <header><Header/></header>
      <main>{children}</main>
      <footer><Footer/></footer>
      </CalendarContext>
      </body>
    </html>
  );
}
