"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [count, setCount] = useState(10); // Initial countdown value

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    // Redirect when count reaches 0
    if (count === 0) {
      clearInterval(countdownInterval);
      router.replace("/");
    }

    return () => clearInterval(countdownInterval);
  }, [count, router]);

  return (
    <div
      className="unauthorized"
      style={{
        fontSize: "2rem",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        flexDirection: "column", // Added to display child elements vertically
      }}
    >
      <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
        Unauthorized!
      </div>
      <div style={{ fontSize: "2rem" }}>
        Redirecting to home page in {count} seconds...
      </div>
    </div>
  );
}
