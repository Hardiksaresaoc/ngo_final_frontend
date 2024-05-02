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

  // State variables for blur and error messages
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");

  useEffect(() => {
    const data = cookies.get("token");
    setToken(data || ""); // Set token to an empty string if data is undefined
    cookies.set("token", data || "", { path: "/" }); // Set the token in cookies
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let newerrors = {};

    // Validation logic
    if (!email) {
      newerrors("Email is required.");
    }
    if (!firstName) {
      setFirstNameError("name is required.");
    }

    if (!mobile_number) {
      setMobileNumberError("Mobile number is required.");
    } else if (!/^\d{10}$/.test(mobile_number)) {
      setMobileNumberError("Mobile number must be 10 digits.");
    }

    if (email && firstName && mobile_number && /^\d{10}$/.test(mobile_number)) {
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
          <showAlert
            title={"ooppss!!"}
            text={`Something went wrong`}
            icon="failed"
            confirmButtonText="close"
          />;
          throw new Error("Failed to generate.");
        }

        router.push("/success");
      } catch (err) {
        console.log("Something went wrong.");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false); // Reset loading state if form is invalid
    }
  };

  // Handle blur events for input fields
  const handleBlur = (field, value) => {
    switch (field) {
      case "email":
        if (!value) {
          setEmailError("Email is required.");
        } else {
          setEmailError("");
        }
        break;
      case "firstName":
        if (!value) {
          setFirstNameError("Name is required.");
        } else {
          setFirstNameError("");
        }
        break;
      case "mobileNumber":
        if (!value) {
          setMobileNumberError("Mobile number is required.");
        } else if (!/^\d{10}$/.test(value)) {
          setMobileNumberError("Mobile number must be 10 digits.");
        } else {
          setMobileNumberError("");
        }
        break;
      default:
        break;
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
                  onBlur={() => handleBlur("email", email)}
                  placeholder="Enter Fundraiser's e-mail"
                />
                {emailError && (
                  <p style={{ color: "red" }} className={styles.error}>
                    {emailError}
                  </p>
                )}
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
                  onBlur={() => handleBlur("firstName", firstName)}
                  placeholder="Enter Fundraiser's full name"
                />
                {firstNameError && (
                  <p style={{ color: "red" }} className={styles.error}>
                    {firstNameError}
                  </p>
                )}
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
                  onBlur={() => handleBlur("mobileNumber", mobile_number)}
                  placeholder="Enter Fundraiser's mobile no."
                  pattern="[0-9]{10}"
                  maxLength="10"
                />
                {mobileNumberError && (
                  <p style={{ color: "red" }} className={styles.error}>
                    {mobileNumberError}
                  </p>
                )}
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
