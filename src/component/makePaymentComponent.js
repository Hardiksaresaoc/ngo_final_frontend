"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const RazorpayPaymentComponent = ({ amount }) => {
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
        const response = await axios.post(
          "http://localhost:3003/payment/checkout",
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
      console.log({ amount });
      try {
        await loadRazorpayScript();
        const orderDetails = await fetchOrderDetails();

        console.log(orderDetails + "h");
        var options = {
          key: "rzp_test_b3XerWcrISxnCT", // Enter the Key ID generated from the Dashboard
          amount: "1000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "Acme Corp",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: orderDetails, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          callback_url: "http://localhost:3003/payment/paymentVerfications",
          prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9000090000",
          },
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

export default RazorpayPaymentComponent;
