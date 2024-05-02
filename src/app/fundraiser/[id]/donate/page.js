"use client";
import axios from "axios";
import { useState } from "react";
import makePaymentComponent from "@/component/makePaymentComponent";
import Payment from "@/app/payment/page";

export default function page({ params }) {
  const [amount, setDonationAmount] = useState();
  const [donor_phone, setPhoneNumber] = useState();
  const [donor_name, setName] = useState("");
  const [submitted, setsubmitted] = useState(false);
  const [reference, setReference] = useState({}); // Initialize fundraiser as an empty object

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      amount: amount,
      donor_phone: donor_phone,
      donor_name: donor_name,
    };
    console.log(formData);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    };
    try {
      const response = await axios.post(
        `https://allowing-shiner-needlessly.ngrok-free.app/fundraiser-page/${params.id}/donate`,
        formData,
        config
      );
      setReference(response.data);
      setsubmitted(true);

      console.log(response);
    } catch (error) {
      console.log(error.message);
      setsubmitted(false);
    }
  };

  return (
    <>
      {!submitted ? (
        <>
          {" "}
          <form onSubmit={handleSubmit}>
            <label>Fundraiser ID</label>
            <input disabled value={params.id} />
            <br />
            <label>Name</label>
            <input
              type="text"
              value={donor_name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label>Donation Amount</label>
            <input
              name="amount"
              type="number"
              value={amount}
              onChange={(e) => setDonationAmount(e.target.value)}
            />
            <br />
            <label>Phone Number</label>
            <input
              value={donor_phone}
              type="number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        <Payment
          amount={amount}
          name={donor_name}
          reference={reference}
          id={params.id}
        />
      )}
    </>
  );
}
