"use client";
import React from "react";
import MakePaymentComponent from "../../component/makePaymentComponent";

const Payment = ({ amount }) => {
  return (
    <div>
      <h4>Payment page</h4>
      <MakePaymentComponent amount={amount} />
    </div>
  );
};

export default Payment;
