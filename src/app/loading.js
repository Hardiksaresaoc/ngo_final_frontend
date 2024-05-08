"use client";
import { Center } from "@chakra-ui/react";
import { ThreeDots } from "react-loader-spinner";

export default function Loading() {
  return (
    <>
      <div
        style={{
          width: "20%",
          height: "20%",
          position: "absolute",
          top: "40%",
          right: "40%",
          // margin: "40%",
        }}
      >
        <ThreeDots
          visible={false}
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </>
  );
}
