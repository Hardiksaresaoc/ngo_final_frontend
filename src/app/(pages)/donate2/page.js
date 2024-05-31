"use client";
import axios from "axios";
import React, { useState } from "react";

const page = () => {
  const [form, setForm] = useState();

  function validateForm() {
    var amount = document.forms["paymentform"]["payeramount"].value;
    if (amount < 0) {
      alert("Amount should be a greater than Rs.0");
      return false;
    }
  }

  const handleChange = (event) => {
    if (event.target.name === "amount") {
      setForm({ ...form, [event.target.name]: parseInt(event.target.value) });
    } else {
      setForm({ ...form, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_serverAPI}/easypay/donation`,
      form,
      config
    );
    console.log(response.data);
    window.location.href = response.data;
  };

  return (
    <>
      <div>
        <div className="payment-section">
          <div className="eazypay-payment">
            <form onSubmit={handleSubmit}>
              <label htmlFor="payername"> Name: (Required)</label>
              <br />
              <input
                type="text"
                id="payername"
                name="payername"
                required=""
                onChange={handleChange}
              />
              <br />
              <label htmlFor="payerphone"> Phone Number: (Optional)</label>
              <br />
              <input
                type="text"
                id="payerphone"
                name="mobileNumber"
                onChange={handleChange}
              />
              <br />
              <label htmlFor="payeremail"> Email ID: (Required)</label>
              <br />
              <input
                type="email"
                id="payeremail"
                name="email"
                onChange={handleChange}
              />
              <br />
              <label htmlFor="payeramount"> Amount:</label>
              <br />
              <input
                type="number"
                min={0}
                id="amount"
                name="amount"
                required=""
                onChange={handleChange}
              />
              <br />
              <br />
              <input
                id="paybutton"
                name="payeramount"
                type="submit"
                defaultValue="Pay Amount"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
