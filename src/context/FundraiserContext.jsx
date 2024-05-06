"use client";
import { createContext, useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
export const FundraiserContext = createContext([]);

export default function FundraiserContextData({ children }) {
  const [fundraiser, setFundraiser] = useState({});
  const [token, setToken] = useState(null);
  const cookies = new Cookies();

  useEffect(() => {
    const data = cookies.get("token");
    setToken(data);
  }, [cookies]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        ///ngrok
        const config = {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_serverAPI}/fundRaiser`,
          config
        );
        if (response.status === 200) {
          // console.log(response.data)
          setFundraiser((oldState) => {
            return {
              ...oldState,
              ...response.data,
            };
          });
        } else {
          console.log("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("API error:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <FundraiserContext.Provider value={fundraiser}>
      {children}
    </FundraiserContext.Provider>
  );
}
