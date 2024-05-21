"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import styles from "./forgot.module.css";
import Image from "next/image";
const DefaultResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpGen, setOtpGen] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      console.log(email);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_serverAPI}/auth/forgot-password`,
        { email },
        config
      );

      setLoading(false);
      Swal.fire({
        title: "OTP generate Successfully",
        text: `${response.data.message}`,
        icon: "success",
        confirmButtonText: "okay",
      });

      setOtpGen(true);
    } catch (error) {
      Swal.fire({
        title: "Try Again after 15 minutes ",
        text: `${error.response.data.message}`,
        icon: "error",
        confirmButtonText: "okay",
      });
      console.error("Error sending OTP:", error);
      setLoading(false);
    }
  };

  const resetpassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_serverAPI}/auth/reset-password`,
        { otp, newPassword }
      );

      setLoading(false);
      Swal.fire({
        title: "Password Reset Successfully",
        text: "Login with your new password",
        icon: "success",
        confirmButtonText: "okay",
      });
      router.replace("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Oops! Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.main}>
        {otpGen ? (
          <div className={styles.main}>
            <section className={styles.mainSection}>
              <div className={styles.leftSection}>
                <form className={styles.mainForm} onSubmit={resetpassword}>
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
                    <h2 className={styles.formTag}>Reset Password</h2>
                    <div className={styles.formInput}>
                      <div className={styles.inputInside}>
                        <label htmlFor="otp" className={styles.filled}>
                          OTP
                        </label>

                        <div className={styles.inputIcon}>
                          <i
                            className={` fa-solid fas fa-envelope  ${styles.formIcon}`}
                          ></i>
                        </div>
                        <input
                          className={styles.inputField}
                          name="otp"
                          id="otp"
                          onChange={(e) => setOtp(e.target.value)}
                          // onBlur={handleBlur("email")}
                          type="text"
                          value={otp}
                          placeholder="Enter your OTP"
                          required
                        />
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
                            onChange={(e) => setNewPassword(e.target.value)}
                            // onBlur={handleBlur("password")}
                            type={showPassword ? "text" : "password"}
                            value={newPassword}
                            placeholder="Enter your password"
                            id="password"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className={styles.submit}>
                      <button type="submit" className={styles.buttonSubmit}>
                        {loading ? "loading" : "Reset Password"}
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
        ) : (
          <div className={styles.main}>
            <section className={styles.mainSection}>
              <div className={styles.leftSection}>
                <form className={styles.mainForm} onSubmit={handleForgot}>
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
                    <h2 className={styles.formTag}>Forgot Password</h2>
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
                          type="email"
                          value={email}
                          placeholder="Enter your email"
                          required
                          id="email"
                        />
                      </div>
                    </div>

                    <div className={styles.submit}>
                      <button type="submit" className={styles.buttonSubmit}>
                        {loading ? "loading" : "Forgot Password"}
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
        )}
      </div>
    </>
  );
};

export default DefaultResetPassword;
