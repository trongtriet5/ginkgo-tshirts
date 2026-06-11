import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "./context/CurrencyProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ginkgo original quality clothing & accessories from vietnam",
  description: "Discover the comfortable and original organic cotton clothing made by Ginkgo with high-quality knitwear.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={notoSans.variable}>
      <body>
        <CurrencyProvider>
          <Navbar />
          {children}
          <Footer />
        </CurrencyProvider>
      </body>
    </html>
  );
}
