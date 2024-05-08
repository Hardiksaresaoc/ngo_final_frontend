"use client";
// // import Header from "@/component/header";
// // // export default function Home() {
// // //   return <>hello</>;
// // // }
// // import { secureLocalStorage } from "react-secure-storage";

// // const App = () => {
// //   const [value, setValue] = useState();
// //   useEffect(() => {
// //     // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW4yQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImZ1bmRyYWlzZXJJZCI6IjI0ZmJkYzU3LTkzYjAtNGFjMC04ZmIyLTI2NjAyOGEwNmEwNSIsInByb2ZpbGVJbWFnZSI6bnVsbCwiaWF0IjoxNzEzMjY3OTcyLCJleHAiOjE3MTMyNzE1NzJ9.hrzLYnuEjWpGKKHpwQq2EaO2ov1cmr8TKi3vNp82UC8
// //     // secureLocalStorage.setItem("number", 12);
// //     // secureLocalStorage.setItem("string", "12");
// //     // secureLocalStorage.setItem("boolean", true);
// //     // let value = secureLocalStorage.getItem("object");
// //     // setValue(value.message);
// //     // console.log(value);
// //   }, []);

// //   //   const handledownlad = () => {
// //   // const data= axios.
// //   //   }
// //   return (
// //     <div>
// //       {/* <Header />     */}
// //       This is a sample code
// //       {/* {value} */}
// //       {/* <button onClick={handledownlad}></button> */}
// //     </div>
// //   );
// // };

// // import { useEffect, useState } from "react";
// // import { Button } from "@nextui-org/react";

// // const CircularProgressBar = ({ percentage = 30 }) => {
// //   const [offset, setOffset] = useState();

// //   useEffect(() => {
// //     const progressOffset = ((100 - percentage) / 100) * 339.292;
// //     setOffset(progressOffset);
// //   }, [percentage]);
// //   const url = "flightData01-05-202415:01:19.xlsx";
// //   return (
// //     <>
// //       <div
// //         className="circular-progress"
// //         data-inner-circle-color="white"
// //         data-percentage="50"
// //         data-progress-color="#0FA900"
// //         data-bg-color="#D2F2CF"
// //       >
// //         <div className="subGoal">
// //           <div className="inner-circle"></div>
// //           <p className="percentage">(50%)</p>
// //           <h2 className="currentGoal">&#8377 1,500</h2>
// //           <p className="percentage">
// //             of <span className="totalGoal">&#8377 3,000</span> Goal{" "}
// //           </p>
// //         </div>
// //       </div>
// //       {/* <svg className="progress-ring" width="120" height="120">
// //         <circle
// //           className="progress-ring__circle"
// //           strokeWidth="8"
// //           fill="transparent"
// //           r="50"
// //           cx="60"
// //           cy="60"
// //         />
// //         <text x="50%" y="50%" className="progress-ring__text">
// //           {percentage}%
// //         </text>
// //         <circle
// //           className="progress-ring__circle--progress"
// //           strokeWidth="8"
// //           strokeDasharray="339.292"
// //           strokeDashoffset={offset}
// //           fill="transparent"
// //           r="50"
// //           cx="60"
// //           cy="60"
// //         />
// //       </svg>
// //       <a
// //         href={`https://rationally-dynamic-shrimp.ngrok-free.app/download/${url}`}
// //         variant="contained"
// //         color="primary"
// //       >
// //         download
// //       </a> */}
// //     </>
// //   );
// // };

// // export default CircularProgressBar;

// import { useEffect, useRef, useState } from "react";

// export const CircularProgress = ({ percentage }) => {
//   const circularProgressRef = useRef(null);
//   const [currentPercentage, setCurrentPercentage] = useState(40);

//   useEffect(() => {
//     const circularProgress = circularProgressRef.current;
//     const progressValue = circularProgress.querySelector(".percentage");
//     const innerCircle = circularProgress.querySelector(".inner-circle");

//     let startValue = currentPercentage;
//     const endValue = Number(percentage);
//     const speed = 50;
//     const progressColor = circularProgress.getAttribute("data-progress-color");

//     const progress = setInterval(() => {
//       startValue++;
//       progressValue.textContent = `(${endValue}%)`;

//       innerCircle.style.backgroundColor = circularProgress.getAttribute(
//         "data-inner-circle-color"
//       );

//       circularProgress.style.background = `conic-gradient(${progressColor} ${
//         endValue * 3.6
//       }deg,${circularProgress.getAttribute("data-bg-color")} 0deg)`;

//       if (startValue === endValue) {
//         clearInterval(progress);
//       }
//     }, speed);

//     setCurrentPercentage(endValue); // Update currentPercentage state
//     return () => clearInterval(progress);
//   }, [percentage]);

//   return (
//     <div
//       ref={circularProgressRef}
//       className="circular-progress"
//       data-inner-circle-color="white"
//       data-percentage={percentage}
//       data-progress-color="#0FA900"
//       data-bg-color="#D2F2CF"
//     >
//       <div className="subGoal">
//         <div className="inner-circle"></div>
//         <p className="percentage">({currentPercentage}%)</p>{" "}
//         {/* Use currentPercentage instead of percentage */}
//         <h2 className="currentGoal">&#8377; 1,500</h2>
//         <p className="percentage">
//           of <span className="totalGoal">&#8377; 3,000</span> Goal
//         </p>
//       </div>
//     </div>
//   );
// };

// export default function page() {
//   return (
//     <>
//       <CircularProgress percentage={510} />
//     </>
//   );
// }
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import { CircularProgressbarWithChildren } from "react-circular-progressbar";
// export default function page() {
//   const percentage = 66;
//   return (
//     // <CircularProgressbar
//     //   value={percentage}
//     //   text={`${percentage}%`}
//     //   styles={{
//     //     // Customize the root svg element
//     //     root: {},
//     //     // Customize the path, i.e. the "completed progress"
//     //     path: {
//     //       // Path color
//     //       stroke: `rgba(62, 152, 199, ${percentage / 100})`,
//     //       // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
//     //       strokeLinecap: "butt",
//     //       // Customize transition animation
//     //       transition: "stroke-dashoffset 0.5s ease 0s",
//     //       // Rotate the path
//     //       transform: "rotate(0.25turn)",
//     //       transformOrigin: "center center",
//     //     },
//     //     // Customize the circle behind the path, i.e. the "total progress"
//     //     trail: {
//     //       // Trail color
//     //       stroke: "#d6d6d6",
//     //       // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
//     //       strokeLinecap: "butt",
//     //       // Rotate the trail
//     //       transform: "rotate(0.25turn)",
//     //       transformOrigin: "center center",
//     //     },
//     //     // Customize the text
//     //     text: {
//     //       // Text color
//     //       fill: "#f88",
//     //       textAnchor: "start",
//     //       x: 18,
//     //       y: 50,
//     //       // Text size
//     //     },
//     //     // Customize background - only used when the `background` prop is true
//     //     background: {
//     //       fill: "black",
//     //     },
//     //   }}
//     // />
//     <div style={{ width: "384px", height: "384px" }}>
//       <svg
//         className="CircularProgressbar"
//         viewBox="0 0 384 384" // Updated viewBox to 384x384
//         data-test-id="CircularProgressbar"
//       >
//         <path
//           className="CircularProgressbar-trail"
//           style={{
//             stroke: "#d6d6d6",
//             strokeLinecap: "butt",
//             transform: "rotate(0.25turn)",
//             transformOrigin: "center center",
//             strokeDasharray: "1152px 1152px", // Adjusted strokeDasharray based on the new size
//             strokeDashoffset: "0px",
//           }}
//           d="
//       M 192,192
//       m 0,-184
//       a 184,184 0 1 1 0,368
//       a 184,184 0 1 1 0,-368
//     "
//           strokeWidth="16" // Increased strokeWidth for better visibility in a larger circle
//           fillOpacity="0"
//         />
//         <path
//           className="CircularProgressbar-path"
//           style={{
//             stroke: "rgba(62, 152, 199, 0.66)",
//             strokeLinecap: "butt",
//             transition: "strokeDashoffset 0.5s ease 0s",
//             transform: "rotate(0.25turn)",
//             transformOrigin: "center center",
//             strokeDasharray: "1152px 1152px", // Adjusted strokeDasharray based on the new size
//             strokeDashoffset: "382.1077121399715px", // Adjusted strokeDashoffset proportionally
//           }}
//           d="
//       M 192,192
//       m 0,-184
//       a 184,184 0 1 1 0,368
//       a 184,184 0 1 1 0,-368
//     "
//           strokeWidth="16" // Increased strokeWidth for better visibility in a larger circle
//           fillOpacity="0"
//         />
//         <text
//           className="CircularProgressbar-text"
//           style={{ fill: "#f88", fontSize: "32px" }} // Adjusted fontSize for better visibility in a larger circle
//           textAnchor="start"
//           x="20" // Adjusted x coordinate for the text
//           y="200" // Adjusted y coordinate for the text
//         >
//           66%
//         </text>
//         <text
//           className="Additional-text"
//           style={{ fill: "#333", fontSize: "14px" }} // Font size and color for additional text
//           textAnchor="start"
//           x="20" // Adjusted x coordinate for the additional text
//           y="240" // Adjusted y coordinate for the additional text
//         >
//           (50%) ₹1,500 of ₹3,000 Goal
//         </text>
//       </svg>
//     </div>
//   );
// }
import React from "react";
const CircularProgressbar = () => {
  // Constants for amount and goal
  const percentage = 90;
  const amount = 1500; // Example: ₹1,500
  const goal = 3000; // Example: ₹3,000

  const pathLength = 1152; // Total strokeDasharray length for the progress bar

  // Calculate the strokeDashoffset based on the percentage
  const strokeDashoffset = ((100 - percentage) / 100) * pathLength;

  return (
    <div style={{ width: "384px", height: "384px" }}>
      <svg
        className="CircularProgressbar"
        viewBox="0 0 384 384"
        data-test-id="CircularProgressbar"
      >
        <path
          className="CircularProgressbar-trail"
          style={{
            stroke: "#d6d6d6",
            strokeLinecap: "butt",
            transform: "rotate(0.25turn)",
            transformOrigin: "center center",
            strokeDasharray: `${pathLength}px ${pathLength}px`,
            strokeDashoffset: "0px",
          }}
          d="
            M 192,192
            m 0,-184
            a 184,184 0 1 1 0,368
            a 184,184 0 1 1 0,-368
          "
          strokeWidth="16"
          fillOpacity="0"
        />
        <path
          className="CircularProgressbar-path"
          style={{
            stroke: "rgba(62, 152, 199, 0.66)",
            strokeLinecap: "butt",
            transition: "strokeDashoffset 0.5s ease 0s",
            transform: "rotate(0.25turn)",
            transformOrigin: "center center",
            strokeDasharray: `${pathLength}px ${pathLength}px`,
            strokeDashoffset: `${strokeDashoffset}px`,
          }}
          d="
            M 192,192
            m 0,-184
            a 184,184 0 1 1 0,368
            a 184,184 0 1 1 0,-368
          "
          strokeWidth="16"
          fillOpacity="0"
        />
        <text
          className="CircularProgressbar-text"
          style={{ fill: "#f88", fontSize: "32px" }}
          textAnchor="start"
          x="20"
          y="200"
        >
          {`${percentage}%`}
        </text>
        <text
          className="Additional-text"
          style={{ fill: "#333", fontSize: "14px" }}
          textAnchor="start"
          x="20"
          y="240"
        >
          ({`${percentage}%`}) ₹{amount} of ₹{goal} Goal
        </text>
      </svg>
    </div>
  );
};

export default CircularProgressbar;
