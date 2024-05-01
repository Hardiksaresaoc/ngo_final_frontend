"use client";
import React from "react";
import MakePaymentComponent from "../../component/makePaymentComponent";

const Payment = ({ amount, name, reference }) => {
  return (
    <div>
      <h4>Payment page</h4>
      <MakePaymentComponent amount={amount} name={name} reference={reference} />
    </div>
  );
};

export default Payment;
