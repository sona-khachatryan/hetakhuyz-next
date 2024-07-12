import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import CalendarContext from "@/contexts/CalendarContext";


export const metadata = {
  title: "Հետախույզ լրատվական",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <CalendarContext>
      <header><Header/></header>
      <main>{children}</main>
      <footer><Footer/></footer>
      </CalendarContext>
      </body>
    </html>
  );
}
