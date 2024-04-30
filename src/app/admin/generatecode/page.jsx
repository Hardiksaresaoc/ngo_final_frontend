"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Changed from "next/navigation" to "next/router"
import useAuth from "@/context/auth";
import axios from "axios"; // Added axios import
import Sidebar from "../../../component/sidebar";
import { Cookies } from "react-cookie";
import styles from "./generatecode.module.css";
import Link from "next/link";

const GeneratePage = () => {
  const cookies = new Cookies();
  const router = useRouter();
  const { user } = useAuth(["ADMIN"]);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mobile_number, setMobileNumber] = useState(""); // Changed from setmobile_number to setMobileNumber

  useEffect(() => {
    const data = cookies.get("token");
    setToken(data || ""); // Set token to an empty string if data is undefined
    cookies.set("token", data || "", { path: "/" }); // Set the token in cookies
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        "https://allowing-shiner-needlessly.ngrok-free.app/admin/generate",
        {
          email,
          firstName,
          mobile_number, // Changed from mobile_number to mobile_number
        },
        config
      );

      if (response.status == 201) {
        console.log("success", config);
        await axios.post(
          "https://allowing-shiner-needlessly.ngrok-free.app/admin/createPage",
          { email },
          config
        );
      }
      if (response.status !== 200) {
        // Changed from !response.ok to response.status !== 200
        throw new Error("Failed to generate.");
      }

      router.push("/success");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  const reset = () => {
    setEmail("");
    setFirstName("");
    setMobileNumber("");
    setError(null);
  };

  return (
    <section className={styles.section}>
      <Sidebar />
      <div className={styles.rightSection}>
        <div className={styles.rightsubSection}>
          <h1>Generate Credentials</h1>
          <div className={styles.rightsectionForm}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <span>
                <span>E-mail </span>
                <span className={styles.compulsory}>*</span>
                <br />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your e-mail"
                />
              </span>
              <span>
                <span>Name </span>
                <span className={styles.compulsory}>*</span>
                <br />
                <input
                  type="text"
                  value={firstName}
                  name="fullName"
                  id="fullName"
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </span>
              <span>
                <span>Mobile Number </span>
                <span className={styles.compulsory}>*</span>
                <br />
                <input
                  type="text"
                  name="mobileNumber"
                  id="mobileNumber"
                  value={mobile_number}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter your mobile no."
                  pattern="[0-9]{10}"
                  maxLength="10"
                />
              </span>

              <div className={styles.rightsectionBtn}>
                <button
                  type="reset"
                  onClick={reset}
                  className={`${styles.cancelBtn} ${styles.filled}`}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.cancelBtn}>
                  Generate
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeneratePage;
