"use client";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
const crypto = require("crypto");

export default function page({}) {
  const [form, setForm] = useState({ name: "", number: "", amount: 0 });
  const [toggle, setToggle] = useState(1);
  const [hash, setHash] = useState(null);
  const [transactionId, setTransactionId] = useState(null);

  // Set the API endpoint URL
  const apiEndpoint = "https://test.payu.in/_payment";

  // Set the merchant key and salt
  const merchantKey = "LW5ok7";
  const salt = "pdIAUZH1cR5tdFvYoWQ7MY8ciJdylGrO";

  // Set the order details
  const amount = "100.00";
  const productInfo = "TestProduct";
  const firstName = "John";
  const email = "john@example.com";
  const phone = "9999999999";
  const txnId = "TXN" + "1234";
  const surl = "https://localhost:3000/login";
  const furl = "https://localhost:3000/donate";

  // Create a map of parameters to pass to the PayU API
  const params = {
    key: merchantKey,
    txnid: txnId,
    amount: amount,
    productinfo: productInfo,
    firstname: firstName,
    email: email,
    phone: phone,
    surl: surl,
    furl: furl,
  };

  const handleChange = (event) => {
    if (event.target.name === "amount") {
      setForm({ ...form, [event.target.name]: parseInt(event.target.value) });
    } else {
      setForm({ ...form, [event.target.name]: event.target.value });
    }
  };

  function generateTransactionID() {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 1000000000);
    const merchantPrefix = "T";
    const transactionID = `${merchantPrefix}${timestamp}${randomNumber}`;
    return setTransactionId(transactionID);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getHash();
    setToggle(2);
  };

  const getHash = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_serverAPI}/payu/hash`, {
        ...form,
        transactionId: transactionId,
      })
      .then((res) => {
        setHash(res.data.hash);
        setTransactionId(res.data.transactionId);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    generateTransactionID();
  }, []);

  return (
    <>
      {toggle === 1 && (
        <div>
          <form
            onSubmit={handleSubmit}
            action="https://test.payu.in/_payment"
            method="post"
          >
            <input type="hidden" name="key" value="LW5ok7" />
            <input type="hidden" name="txnid" value={txnId} />
            <input type="hidden" name="productinfo" value="TestProduct" />
            <input type="hidden" name="amount" value="100.00" />
            <input type="hidden" name="email" value="john@example.com" />
            <input type="hidden" name="firstname" value="John" />
            <input
              type="hidden"
              name="surl"
              value="https://localhost:3000/login"
            />
            <input
              type="hidden"
              name="furl"
              value="https://localhost:3000/donate"
            />
            <input type="hidden" name="phone" value="9999999999" />
            <input type="hidden" name="hash" value={hash} />
            <input type="submit" value="submit" />{" "}
          </form>
        </div>
      )}
    </>
  );
}
