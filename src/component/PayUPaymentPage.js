"use client";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";

const PayUPaymentPage = ({ setToggle, form, hash, transactionId }) => {
  console.log(form, hash, transactionId);
  const { name, number, amount, donor_email } = form;

  return (
    <form action="https://test.payu.in/_payment" method="post">
      <input type="hidden" name="key" value="LW5ok7" />
      <input type="hidden" name="txnid" value={transactionId} />
      <input type="hidden" name="productinfo" value="TestProduct" />
      <input type="hidden" name="amount" value={amount} />
      <input type="hidden" name="email" value={donor_email} />
      <input type="hidden" name="firstname" value={name} />
      <input
        type="hidden"
        name="surl"
        value="http://localhost:3001/payu/success"
      />
      <input
        type="hidden"
        name="furl"
        value="http://localhost:3001/payu/failed"
      />
      <input type="hidden" name="phone" value={number} />
      <input type="hidden" name="hash" value={hash} />
      <input type="submit" value="submit" />{" "}
    </form>
  );
};
export default PayUPaymentPage;
