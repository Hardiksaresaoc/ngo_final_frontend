"use client";
import Header from "@/component/header";
// export default function Home() {
//   return <>hello</>;
// }
import { secureLocalStorage } from "react-secure-storage";

const App = () => {
  const [value, setValue] = useState();
  useEffect(() => {
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW4yQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImZ1bmRyYWlzZXJJZCI6IjI0ZmJkYzU3LTkzYjAtNGFjMC04ZmIyLTI2NjAyOGEwNmEwNSIsInByb2ZpbGVJbWFnZSI6bnVsbCwiaWF0IjoxNzEzMjY3OTcyLCJleHAiOjE3MTMyNzE1NzJ9.hrzLYnuEjWpGKKHpwQq2EaO2ov1cmr8TKi3vNp82UC8
    // secureLocalStorage.setItem("number", 12);
    // secureLocalStorage.setItem("string", "12");
    // secureLocalStorage.setItem("boolean", true);
    // let value = secureLocalStorage.getItem("object");
    // setValue(value.message);
    // console.log(value);
  }, []);

  //   const handledownlad = () => {
  // const data= axios.
  //   }
  return (
    <div>
      {/* <Header />     */}
      This is a sample code
      {/* {value} */}
      {/* <button onClick={handledownlad}></button> */}
    </div>
  );
};

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

const CircularProgressBar = ({ percentage = 30 }) => {
  const [offset, setOffset] = useState();

  useEffect(() => {
    const progressOffset = ((100 - percentage) / 100) * 339.292;
    setOffset(progressOffset);
  }, [percentage]);
  const url = "flightData01-05-202415:01:19.xlsx";
  return (
    <>
      <svg className="progress-ring" width="120" height="120">
        <circle
          className="progress-ring__circle"
          strokeWidth="8"
          fill="transparent"
          r="50"
          cx="60"
          cy="60"
        />
        <text x="50%" y="50%" className="progress-ring__text">
          {percentage}%
        </text>
        <circle
          className="progress-ring__circle--progress"
          strokeWidth="8"
          strokeDasharray="339.292"
          strokeDashoffset={offset}
          fill="transparent"
          r="50"
          cx="60"
          cy="60"
        />
      </svg>
      <a
        href={`https://rationally-dynamic-shrimp.ngrok-free.app/download/${url}`}
        variant="contained"
        color="primary"
      >
        download
      </a>
    </>
  );
};

export default CircularProgressBar;
