"use client";

import Loading from "./loading";

export default function Page() {
  function importData() {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = (_) => {
      // you can use this method to get file and perform respective operations
      let files = Array.from(input.files);
    };
    input.click();
  }
  return (
    <>
      <Loading />
    </>
  );
}
