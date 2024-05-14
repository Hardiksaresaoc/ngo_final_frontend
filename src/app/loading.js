"use client";
import Footer from "@/component/footer";
import Header from "@/component/header";
import { Center } from "@chakra-ui/react";
import { ThreeDots } from "react-loader-spinner";

export default function Loading() {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <section className="dots-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </section>
      </div>
    </>
  );
}
