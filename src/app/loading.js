"use client";
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
        <section class="dots-container">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </section>
      </div>
    </>
  );
}
