"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";

const useAuth = (allowedRoles) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.replace("/login");
      return;
    }

    const decodedToken = jwtDecode(token);

    if (!decodedToken || !decodedToken.role) {
      router.replace("/login");
      console.log("redirecting");
      return;
    }

    if (
      allowedRoles &&
      allowedRoles.length > 0 &&
      !allowedRoles.includes(decodedToken.role)
    ) {
      router.replace("/unauthorized");
      return;
    }

    setUser(decodedToken);
    console.log("valid");
  }, []);
  // useEffect(() => {
  //   const refreshToken = Cookies.get("refreshToken");
  //   const token = Cookies.get("token");
  //   try {
  //     if (refreshToken && !token) {
  //       const config = {
  //         headers: {
  //           refreshToken: refreshToken,
  //           "Content-Type": "application/json",
  //         },
  //       };
  //       const response = axios
  //         .get(`${process.env.NEXT_PUBLIC_serverAPI}/auth/refreshtoken`, config)
  //         .then(console.log("ress", response.data));
  //     }
  //   } catch (error) {
  //     console.log("error");
  //   }
  // }, [router, Cookies]);

  useEffect(() => {
    const refreshToken = Cookies.get("refreshToken");
    const token = Cookies.get("token");
    const fetchData = async () => {
      try {
        if (refreshToken && !token) {
          const config = {
            headers: {
              refreshToken: refreshToken,
              "Content-Type": "application/json",
            },
          };
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_serverAPI}/auth/refreshtoken`,
            config
          );
          console.log("Response data:", response.data);
          Cookies.set("token", response.data.data.token);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, [router]);

  return { user };
};

export default useAuth;
