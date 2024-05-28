"use client";
import MakePaymentComponent from "@/component/makePaymentComponent";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import styles from "../fundraiser/[id]/donate/donate.module.css";
import PayUPaymentPage from "@/component/PayUPaymentPage";
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
  const [form, setForm] = useState({ name: "", number: "", amount: 0 });
  const [hash, setHash] = useState(null);
  const [transactionId, setTransactionId] = useState(null);

  const [donor_Comments, setdonor_Comments] = useState("");
  const [submitted, setsubmitted] = useState(false);
  const [reference, setReference] = useState({});
  const [toggle, setToggle] = useState(1);

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

  const getHash = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_serverAPI}/payu/hash`, {
        ...form,
      })
      .then((res) => {
        console.log(res.data.data);
        setHash(res.data.data.hash);
        setTransactionId(res.data.data.transactionId);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (event) => {
    if (event.target.name === "amount") {
      setForm({ ...form, [event.target.name]: parseInt(event.target.value) });
    } else {
      setForm({ ...form, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = async (e) => {
    getHash();
    setToggle(2);

    e.preventDefault();
    const newErrors = {};

    const formData = {
      amount: amount,
      donor_phone: donor_phone,
      donor_name: donor_name,
      donor_email: donor_email,
      pan: pan,
      donor_address: address,
      donor_state: donor_state,
      donor_country: donor_country,
      donor_pin: donor_pin,
    };
    // if (!formData.amount) newErrors.amount = "Please enter donation amount.";
    // if (!formData.donor_name) newErrors.donor_name = "Please enter your name.";
    // if (!formData.donor_phone)
    //   newErrors.donor_phone = "Please enter phone number.";

    // if (!formData.donor_email)
    //   newErrors.donor_email = "Please enter Your email.";
    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    //   return;
    // }
    const config = {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    };
    try {
      // formData["amount"] = Number(formData["amount"]);

      // const response = await axios.post(
      //   `${process.env.NEXT_PUBLIC_serverAPI}/donate`,
      //   form,
      //   config
      // );

      // setReference(response.data.data);
      setsubmitted(true);
    } catch (error) {
      // Swal.fire({
      //   title: "error while adding",
      //   text: `${error.response.data.message}`,
      //   icon: "failed",
      //   confirmButtonText: "Close",
      // });
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
                        name="amount"
                        placeholder="Enter your donation amount"
                        value={amount}
                        onChange={handleChange}
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
                        name="name"
                        value={donor_name}
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        name="number"
                        value={donor_phone}
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
        <PayUPaymentPage
          setToggle={setToggle}
          form={form}
          hash={hash}
          transactionId={transactionId}
        />
      )}
    </>
  );
}
