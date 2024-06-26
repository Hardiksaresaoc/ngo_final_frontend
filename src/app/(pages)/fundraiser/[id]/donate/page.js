"use client";
import axios from "axios";
import { useState } from "react";
import MakePaymentComponent from "@/component/makePaymentComponent";
import styles from "./donate.module.css";
import showAlert from "@/component/alert";
import Swal from "sweetalert2";
export default function page({ params }) {
  const [amount, setDonationAmount] = useState();
  const [donor_phone, setPhoneNumber] = useState();
  const [donor_email, setdonor_email] = useState("");
  const [donor_name, setName] = useState("");
  const [pan, setPan] = useState("");
  const [address, setAddress] = useState("");
  const [donor_state, setdonor_state] = useState("");
  const [donor_country, setdonor_country] = useState("");
  const [donor_pin, setdonor_pin] = useState("");

  const [donor_Comments, setdonor_Comments] = useState("");
  const [submitted, setsubmitted] = useState(false);
  const [reference, setReference] = useState({});
  const [errors, setErrors] = useState({});
  const reset = () => {
    setDonationAmount("");
    setPhoneNumber("");
    setdonor_email("");
    setName("");
    setPan("");
    setAddress("");
    setdonor_state("");
    setdonor_country("");
    setdonor_pin("");
    setdonor_Comments("");
    setsubmitted(false);
    setErrors({});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    const formData = {
      amount: amount,
      donor_phone: donor_phone,
      donor_first_name: donor_name,
      donor_email: donor_email,
      pan: pan,
      address: address,
      donor_state: donor_state,
      donor_country: donor_country,
      donor_pin: donor_pin,
    };
    if (!formData.amount) newErrors.amount = "Please enter donation amount.";
    if (!formData.donor_first_name)
      newErrors.donor_first_name = "Please enter your name.";
    if (!formData.donor_phone)
      newErrors.donor_phone = "Please enter phone number.";

    if (!formData.donor_email)
      newErrors.donor_email = "Please enter Your email.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    };
    try {
      formData["amount"] = Number(formData["amount"]);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_serverAPI}/donate/fundraiser-page/${params.id}`,
        formData,
        config
      );

      setReference(response.data.data);
      setsubmitted(true);
    } catch (error) {
      Swal.fire({
        title: "error while adding",
        text: `${error.response.data.message}`,
        icon: "failed",
        confirmButtonText: "Close",
      });
      setsubmitted(false);
    }
  };

  return (
    <>
      {!submitted ? (
        <>
          <div className={styles.donateform}>
            <div className={styles.donationtitle}>
              <img src="/images/logo.png" height="49px" width="50px" />
              <h1>SUPPORT OUR HEROES</h1>
            </div>
            <section className={styles.wrapperdonation}>
              <div className={styles.donationimg}>
                <div className={styles.information}>
                  <img src="/images/payment.svg" width="100%" height="640px" />
                </div>
              </div>
              <div className={styles.donationdetdetails}>
                <form className={styles.form}>
                  <h1>Please Enter Your Details</h1>
                  <div className={styles.details}>
                    <div className={`${styles.donationdetails} ${styles.com}`}>
                      <label htmlFor="donation amount">Donation Amount </label>
                      <input
                        type="number"
                        className={styles.number}
                        name="number"
                        placeholder="Enter your donation amount"
                        value={amount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        min="0"
                      />
                      {errors.amount && (
                        <span style={{ color: "red" }} className={styles.error}>
                          {errors.amount}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={styles.details}>
                    <div className={styles.donationdetails}>
                      <label htmlFor="donor name">Donor Name</label>
                      <input
                        type="text"
                        className={styles.username}
                        name="username"
                        value={donor_name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your first name"
                        maxLength="20"
                        size="30"
                        required
                      />
                      {errors.donor_name && (
                        <span style={{ color: "red" }} className={styles.error}>
                          {errors.donor_name}
                        </span>
                      )}
                    </div>
                    <div className={styles.donationdetails}>
                      <label htmlFor="e-mail">E-mail</label>
                      <input
                        type="donor_email"
                        className={styles.donor_email}
                        value={donor_email}
                        onChange={(e) => setdonor_email(e.target.value)}
                        name="donor_email"
                        placeholder="Enter your e-mail"
                        required
                      />
                      {errors.donor_email && (
                        <span style={{ color: "red" }} className={styles.error}>
                          {errors.donor_email}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={styles.details}>
                    <div className={styles.donationdetails}>
                      <label htmlFor="tel">Mobile Number</label>
                      <input
                        type="text"
                        className={styles.mobilenumber}
                        name="tel"
                        value={donor_phone}
                        onChange={(e) => {
                          const inputValue = e.target.value.replace(/\D/g, "");
                          if (inputValue.length <= 10) {
                            setPhoneNumber(inputValue);
                          }
                        }}
                        placeholder="Enter your mobile no."
                      />
                      {errors.donor_phone && (
                        <span style={{ color: "red" }} className={styles.error}>
                          {errors.donor_phone}
                        </span>
                      )}
                    </div>
                    <div className={`${styles.donationdetails} ${styles.num}`}>
                      <label htmlFor="pannumber">PAN Number</label>
                      <input
                        type="text"
                        className={styles.pannumber}
                        name="Pannumber"
                        value={pan}
                        onChange={(e) => setPan(e.target.value)}
                        placeholder="Enter your PAN number"
                        required
                        autoComplete=""
                      />
                    </div>
                  </div>
                  <div className={styles.details}>
                    <div className={`${styles.donationdetails} ${styles.num}`}>
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        className={styles.address}
                        name="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your address"
                      />
                    </div>
                    <div className={`${styles.donationdetails} ${styles.num}`}>
                      <label htmlFor="state">State</label>
                      <input
                        type="text"
                        className={styles.state}
                        value={donor_state}
                        onChange={(e) => setdonor_state(e.target.value)}
                        name="State"
                        placeholder="Enter your state"
                      />
                    </div>
                  </div>
                  <div className={styles.details}>
                    <div className={`${styles.donationdetails} ${styles.num}`}>
                      <label htmlFor="country">Country</label>
                      <input
                        type="text"
                        className={styles.country}
                        name="Country"
                        value={donor_country}
                        onChange={(e) => setdonor_country(e.target.value)}
                        placeholder="Enter your country"
                      />
                    </div>
                    <div className={`${styles.donationdetails} ${styles.num}`}>
                      <label htmlFor="pincode">Pincode</label>
                      <input
                        type="text"
                        className={styles.pincode}
                        name="Pincode"
                        value={donor_pin}
                        onChange={(e) => setdonor_pin(e.target.value)}
                        placeholder="Enter your pincode"
                      />
                    </div>
                  </div>
                  <div className={styles.details}>
                    <div
                      className={`${styles.donationdetails} ${styles.com} ${styles.num}`}
                    >
                      <label htmlFor="comment">Comment</label>
                      <input
                        type="text"
                        value={donor_Comments}
                        onChange={(e) => setdonor_Comments(e.target.value)}
                        className={styles.comment}
                        name="Comment"
                        placeholder="Write a comment..."
                      />
                    </div>
                  </div>
                  <div className={styles.donates}>
                    <button
                      type="button"
                      id="button"
                      className={styles.catBtn}
                      name="button_name"
                      aria-label="button_name"
                      onClick={reset}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      id="button_id"
                      className={`${styles.catBtn}  ${styles.donate}`}
                      name="button_name"
                      style={{ color: "#ffffff", backgroundColor: "#010080" }}
                      onClick={(e) => handleSubmit(e)}
                      aria-label="button_name"
                    >
                      Donate
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </>
      ) : (
        <MakePaymentComponent
          amount={amount}
          name={donor_name}
          reference={reference}
          id={params.id}
        />
      )}
    </>
  );
}
