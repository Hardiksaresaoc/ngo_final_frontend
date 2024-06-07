"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./forgot.module.css";
import Image from "next/image";
import { showSwal } from "@/validation";
import { TbPasswordMobilePhone } from "react-icons/tb";

const DefaultResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpGen, setOtpGen] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

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

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_serverAPI}/auth/forgot-password`,
        { email },
        config
      );

      setLoading(false);
      showSwal(
        "success",
        "OTP generate Successfully",
        `${response.data.message}`
      );

      setOtpGen(true);
    } catch (error) {
      showSwal(
        "error",
        `Try again later`,
        error.response ? error.response.data.message : "An error occurred."
      );

      console.error("Error sending OTP:", error);
      setLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    } else {
      setPasswordError("");
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Password and Confirm Password must match.");
      return;
    } else {
      setConfirmPasswordError("");
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_serverAPI}/auth/reset-password`,
        { otp, newPassword }
      );

      setLoading(false);
      showSwal(
        "success",
        "Password Reset Successfully",
        "Login with your new password",
        () => router.replace("/login")
      );
    } catch (error) {
      console.error("Error resetting password:", error);

      showSwal("error", "Something went wrong", "Try again later");
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
                <form className={styles.mainForm} onSubmit={resetPassword}>
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
                          <i className={styles.keyIcon}>
                            <TbPasswordMobilePhone />
                          </i>
                        </div>
                        <input
                          className={styles.inputField}
                          name="otp"
                          id="otp"
                          onChange={(e) => {
                            const inputValue = e.target.value.replace(
                              /[^a-zA-Z0-9]/g,
                              ""
                            ); // Remove any character that is not a letter or digit
                            setOtp(inputValue);
                          }}
                          type="text"
                          value={otp}
                          placeholder="Enter your OTP"
                          required
                        />
                      </div>

                      <div className={styles.inputInside}>
                        <label htmlFor="password" className={styles.filled}>
                          New Password
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
                        </div>
                        <input
                          name="password"
                          className={styles.inputField}
                          onChange={(e) => setNewPassword(e.target.value)}
                          type={showPassword ? "text" : "password"}
                          value={newPassword}
                          placeholder="Enter your password"
                          id="password"
                          required
                        />
                        {passwordError && (
                          <p className={styles.errorMessage}>{passwordError}</p>
                        )}
                      </div>

                      <div className={styles.inputInside}>
                        <label
                          htmlFor="confirm-password"
                          className={styles.filled}
                        >
                          Confirm New Password
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
                        </div>
                        <input
                          name="confirm-password"
                          className={styles.inputField}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          type={showPassword ? "text" : "password"}
                          value={ConfirmPassword}
                          placeholder="Re-Enter New password"
                          id="confirm-password"
                          required
                        />
                        {confirmPasswordError && (
                          <p className={styles.errorMessage}>
                            {confirmPasswordError}
                          </p>
                        )}
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
