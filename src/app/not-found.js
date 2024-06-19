import Header from "@/component/header";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="mainNotfound">
        <h1>This page doesn't seem to exist.</h1>
        <p>It looks like the link pointing here was faulty.</p>
        <Link href="/"> GO BACK TO HOME??</Link>
      </div>
    </>
  );
}
