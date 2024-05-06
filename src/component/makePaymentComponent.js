"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const MakePaymentComponent = ({ amount, name, reference }) => {
  useEffect(() => {
    const loadRazorpayScript = async () => {
      try {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
      } catch (error) {
        console.error("Error loading Razorpay script:", error);
      }
    };

    const fetchOrderDetails = async () => {
      try {
        console.log({ reference });
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_serverAPI}/payment/checkout/${reference.reference}`,
          { amount }
        );
        console.log(response.data.response);
        return response?.data?.response.id;
      } catch (error) {
        console.error("Error fetching order details:", error);
        throw new Error("Error fetching order details");
      }
    };

    const initiatePayment = async () => {
      console.log({ amount, name });
      try {
        await loadRazorpayScript();
        const orderDetails = await fetchOrderDetails();

        console.log(orderDetails + "h");
        amount = String(amount) + "00";
        var options = {
          key: "rzp_test_b3XerWcrISxnCT", // Enter the Key ID generated from the Dashboard
          amount: parseInt(amount), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "Support Our Heroes",
          description: "Test Transaction",
          image: "",
          order_id: orderDetails, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          callback_url: `${process.env.NEXT_PUBLIC_serverAPI}/payment/paymentVerfications`,
          // prefill: {
          //   name: name,
          //   email: "gaurav.kumar@example.com",
          //   contact: "9000090000",
          // },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
      } catch (error) {
        console.error("Error initiating payment:", error);
        throw new Error("Error initiating payment");
      }
    };
    initiatePayment();
  }, []);

  return null;
};

export default MakePaymentComponent;
