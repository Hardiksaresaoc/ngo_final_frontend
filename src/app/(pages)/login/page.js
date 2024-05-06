"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import styles from "./login.module.css";
import showAlert from "@/component/alert";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loggedin, setLoggedin] = useState(false);

  const router = useRouter();
  const [cookies, setCookie] = useCookies(["token"]);

  useEffect(() => {
    console.log("login");
    const token = cookies.token;
    if (token) {
      handleLoginSuccess(token);
      setLoggedin(true);
    }
  }, []);

  const validateForm = () => {
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submithandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true); // Start loading
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        //processENV
        `${process.env.NEXT_PUBLIC_serverAPI}/auth/login`,
        { email, password },
        config
      );
      if (!data || !data.token) {
        setErrors({
          loginError: "email or password error",
        });
      } else {
        setCookie("token", data.token);
        handleLoginSuccess(data.token);
      }
    } catch (error) {
      console.error("An error occurred while logging in:", error);

      if (error.response && error.response.status === 401) {
        setErrors({
          loginError: "Email or password is incorrect.",
        });
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleBlur = (field) => (e) => {
    const { value } = e.target;
    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required.`,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
      if (field === "email" && value.trim() && !/\S+@\S+\.\S+/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email is invalid.",
        }));
      }
      if (field === "password" && value.trim().length < 6) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password must be at least 6 characters.",
        }));
      }
    }
  };

  const handleLoginSuccess = (token) => {
    const decodedToken = jwtDecode(token);
    if (decodedToken.role === "ADMIN") {
      router.push("/admin");
    } else if (decodedToken.role === "FUNDRAISER") {
      router.push("/fundraiserAdmin");
    } else if (decodedToken.role === "NORMAL_USER_ROLE") {
      router.push("/user");
    } else {
      router.push("/");
    }
  };

  return !loggedin ? (
    <>
      <div className={styles.main}>
        {/* <Header /> */}

        <section className={styles.mainSection}>
          <div className={styles.leftSection}>
            <form className={styles.mainForm} onSubmit={submithandler}>
              <div className={styles.formImg}>
                <Image
                  src="/images/ProjectForm.png"
                  className={styles.w100}
                  alt="Indian Flag Tricolor"
                  height="120"
                  width="366"
                />
              </div>
              <div className={styles.lowerForm}>
                <h2 className={styles.formTag}>Log In</h2>
                <div className={styles.formInput}>
                  <div className={styles.inputInside}>
                    <label htmlFor="email" className={styles.filled}>
                      Email
                    </label>
                    <div className={styles.inputIcon}>
                      <i
                        className={` fa-solid fas fa-envelope  ${styles.formIcon}`}
                      ></i>
                    </div>
                    <input
                      className={styles.inputField}
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={handleBlur("email")}
                      type="email"
                      value={email}
                      placeholder="Enter your email"
                      required
                    />
                    {errors.email && (
                      <p style={{ color: "red", fontSize: "14px" }}>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className={styles.inputInside}>
                    <label htmlFor="password" className={styles.filled}>
                      Password
                    </label>
                    <div className={styles.inputIcon}>
                      <i className={`fas fa-key ${styles.keyIcon}`}></i>

                      <i
                        className={`fas ${
                          showPassword ? "fa-eye" : "fa-eye-slash"
                        } ${styles.eyeIcon} ${styles.formIcon}`}
                        onClick={() =>
                          setShowPassword(
                            (prevShowPassword) => !prevShowPassword
                          )
                        }
                        aria-hidden="true"
                      ></i>
                      <input
                        name="password"
                        className={styles.inputField}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={handleBlur("password")}
                        type={showPassword ? "text" : "password"}
                        value={password}
                        placeholder="Enter your password"
                        required
                      />
                      {errors.password && (
                        <p style={{ color: "red", fontSize: "14px" }}>
                          {errors.password}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.identification}>
                  <div className={styles.remember}>
                    <label htmlFor="rememberme">
                      <input
                        type="checkbox"
                        className={styles.rememberme}
                        id="rememberme"
                        name="rememberme"
                      />
                      Remember me
                    </label>
                  </div>
                  <div className={styles.forgot}>
                    <p className={styles.forgotPass}>
                      <Link
                        href="/forgot"
                        title=""
                        className={styles.forgotLink}
                      >
                        Forgot password?
                      </Link>
                    </p>
                  </div>
                </div>
                <div>
                  {errors.loginError && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "14px",
                        marginBottom: "6px",
                      }}
                    >
                      {errors.loginError}
                    </p>
                  )}
                </div>
                <div className={styles.submit}>
                  <button type="submit" className={styles.buttonSubmit}>
                    {loading ? "loading" : "Log In"}
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className={styles.rightSection}>
            <div className={styles.comment}>
              <h1 className={styles.coreValue}>
                Empower Fundraising Heroes: Your
                <br />
                Appeal Sparks Change!
              </h1>
            </div>
          </div>
        </section>
      </div>
    </>
  ) : (
    "loading"
  );
};

export default LoginPage;