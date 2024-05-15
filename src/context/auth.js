"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

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
   }, []);

  return { user };
};

export default useAuth;
