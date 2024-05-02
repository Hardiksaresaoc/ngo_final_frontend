"use client";
import React from "react";
import MakePaymentComponent from "../../component/makePaymentComponent";

const Payment = ({ amount, name, reference, id }) => {
  console.log(id);
  return (
    <div>
      <h4>Payment page</h4>
      <MakePaymentComponent
        amount={amount}
        name={name}
        reference={reference}
        id={id}
      />
    </div>
  );
};

export default Payment;
