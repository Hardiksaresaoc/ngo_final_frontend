"use client";
import { useState } from "react";
import axios from "axios"; // Add Axios import
import { useRouter } from "next/navigation";

const DefaultResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpGen, setOtpGen] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(""); // State for password error

  const router = useRouter();
  const handleForgot = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    try {
      const response = await axios.get(
        "https://allowing-shiner-needlessly.ngrok-free.app/auth/forgot-password",
        { email }
      );
      console.log(response.data);
      setLoading(false);
      setOtpGen(true);
    } catch (error) {
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
        "https://allowing-shiner-needlessly.ngrok-free.app/auth/reset-password",
        { otp, newPassword }
      );
      console.log(response.data);
      setLoading(false);
      alert("Password reset complete! Login now");
      router.replace("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Oops! Something went wrong.");
      setLoading(false);
    }
  };

  return otpGen ? (
    <div>
      <form className="reset-password" onSubmit={resetpassword}>
        <h1>Forgot Password</h1>
        <p>Enter OTP and your new password.</p>
        <div>
          <label htmlFor="otp">OTP:</label>
          <input
            type="text"
            name="otp"
            id="otp"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="reset-pwd">
          {!loading ? "Submit" : "Sending..."}
        </button>
      </form>
    </div>
  ) : (
    <div>
      <form className="reset-password" onSubmit={handleForgot}>
        <h1>Forgot Password</h1>
        <p>You are not alone. We've all been here at some point.</p>
        <div>
          <label htmlFor="email">Email address:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="reset-pwd">
          {!loading ? "Get secure link" : "Sending..."}
        </button>
      </form>
    </div>
  );
};

export default DefaultResetPassword;
