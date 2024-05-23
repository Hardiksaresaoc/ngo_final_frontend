import Header from "@/component/header";
import FundraiserContextData from "@/context/FundraiserContext";

export default function RootLayout({ children }) {
  return (
    <>
      <FundraiserContextData>{children}</FundraiserContextData>
    </>
  );
}
