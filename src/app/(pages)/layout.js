import Header from "@/component/header";
import "../globals.css";
import Footer from "@/component/footer";
import { Inter } from "next/font/google";
import Loading from "../loading";
import FundraiserContextData from "@/context/FundraiserContext";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <>
      <html>
        <body className={inter.className}>
          <Header />
          <div style={{ minHeight: "70vh" }}>
            {!children ? <Loading /> : children}
          </div>
          <Footer />
        </body>
      </html>
    </>
  );
}
