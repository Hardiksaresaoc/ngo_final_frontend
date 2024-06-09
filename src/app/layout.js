import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./error";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <>
      <ErrorBoundary fallback={<Error />}>
        <html>{children}</html>
      </ErrorBoundary>
    </>
  );
}
