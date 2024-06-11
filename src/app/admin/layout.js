import Header from "@/component/admin/header";

import { Inter } from "next/font/google";
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
          {children}
        </body>
      </html>
    </>
  );
}
