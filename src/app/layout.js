import localFont from "next/font/local";
import BottomBar from "./components/BottomBar";
import ChatButtons from "./components/ChatButtons";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
// import styles
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";

// If you want you can use SCSS instead of css
import "lightgallery/scss/lg-zoom.scss";
import "lightgallery/scss/lightgallery.scss";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "FITNATIONPRO | Join The Fitness Revolution",
  description: "Biggest Life Style & Wellbeing Network of South Asia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <ChatButtons />
        <Footer />
        <BottomBar />
      </body>
    </html>
  );
}
