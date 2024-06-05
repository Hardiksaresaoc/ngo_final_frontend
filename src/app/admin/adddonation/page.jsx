"use client";
import Sidebar from "@/component/sidebar";
import styles from "./adddonation.module.css";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "@/app/loading";
import useAuth from "@/context/auth";

export default function page() {
  const user = useAuth(["ADMIN"]);
  const [token, settoken] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    amount: "",
    donor_first_name: "",
    donor_last_name: "",
    donor_email: "",
    donor_phone: "",
    payment_method: "",
    donation_date: "",
    donor_address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    pan: "",
    refrence_payment: "",
    donor_bank_name: "",
    donor_bank_branch: "",
  });

  const reset = () => {
    setFormData({
      amount: "",
      donor_first_name: "",
      donor_last_name: "",
      donor_email: "",
      donor_phone: "",
      payment_method: "",
      donation_date: "",
      lastName: "",
      donor_address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      pan: "",
      refrence_payment: "",
      donor_bank_name: "",
      donor_bank_branch: "",
    });
  };

  useEffect(() => {
    const data = Cookies.get("token");
    settoken(data);
    setLoading(false);
  }, [Cookies]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "lastName") {
      // Merge last name with donor name
      setFormData((prevData) => ({
        ...prevData,
        donor_name: `${prevData.donor_name} ${value}`,

        [name]: value, // Update last name separately
      }));
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    // Validation
    const isEmailValid = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    const newErrors = {};

    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    }
    if (!formData.donor_first_name) {
      newErrors.firstName = "First Name is required";
    }
    if (!formData.donor_email || !isEmailValid(formData.donor_email)) {
      newErrors.donor_email = "email is required";
    }
    if (!formData.donor_phone) {
      newErrors.donor_phone = "Mobile Number should be 10 digits";
    }
    if (!formData.donation_date) {
      newErrors.donation_date = "Donation Date is required";
    }
    if (!formData.payment_method) {
      newErrors.payment_method = "Donation type is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      Swal.fire({
        title: "Adding donation",
        text: "Please wait...",
        icon: "info",
        showConfirmButton: false,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      formData["amount"] = Number(formData["amount"]);
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_serverAPI}/admin/addOfflineDonation`,
        headers: config.headers,
        data: formData,
      });
      if (response.status == 201) {
        setLoading(false);
        Swal.fire({
          title: "Added Succesfully",
          text: "Donation added!!",
          icon: "success",
          confirmButtonText: "Close",
          confirmButtonColor: "#000080",
        });
        reset();
        setLoading(false);
      }
      setLoading(false);
      setErrors({});
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong!!",
        icon: "error",
        confirmButtonText: "Close",
        confirmButtonColor: "#000080",
      });

      console.error("API error:", error);
      setLoading(false);
    }
  };

  return !user && loading ? (
    <Loading />
  ) : (
    <>
      <section className={styles.mainFundraiser}>
        <Sidebar />
        {!loading && user ? (
          <div className={styles.rightSection}>
            <div className={styles.rightpart}>
              <h1 className={styles.bigText}>Fundraiser Information</h1>
              <form className={styles.mainForm}>
                <div className={styles.fundraiserDetail}>
                  <span>
                    <span>Fundraiser E-mail</span>
                    <br />
                    <input
                      list="fundraiserPageList"
                      type="text"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter fundraiser e-mail"
                    />
                    <datalist id="fundraiserPageList">
                      {/* {fundraiserPages.map((page, index) => (
                      <option key={index} value={page} />
                    ))}{" "} */}
                    </datalist>
                  </span>
                  <span>
                    <span>
                      Amount <span className={styles.compulsory}>*</span>
                    </span>
                    <br />
                    <input
                      type="number"
                      name="amount"
                      min={1}
                      pattern="[0-9]*"
                      value={formData.amount}
                      onChange={handleChange}
                      id="amount"
                      placeholder="Enter donor amount"
                      required
                    />
                    {errors.amount && (
                      <p style={{ color: "red", marginTop: "5px" }}>
                        {errors.amount}
                      </p>
                    )}
                  </span>
                </div>
                <h2>Personal Information</h2>
                <div className={styles.personalDetail}>
                  <div className={styles.firstpersonalDetail}>
                    <span>
                      <span>
                        First Name <span className={styles.compulsory}>*</span>
                      </span>
                      <br />
                      <input
                        type="text"
                        value={formData.donor_first_name}
                        onChange={handleChange}
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(/\d/g, "");
                        }}
                        name="donor_first_name"
                        id="donor_name"
                        placeholder="Enter donor first name"
                        required
                      />
                      {errors.firstName && (
                        <p style={{ color: "red", marginTop: "5px" }}>
                          {errors.firstName}
                        </p>
                      )}
                    </span>
                    <span>
                      <span>Last Name</span>
                      <br />
                      <input
                        type="text"
                        name="donor_last_name"
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(/\d/g, "");
                        }}
                        value={formData.donor_last_name}
                        onChange={handleChange}
                        id="lastName"
                        placeholder="Enter donor last name"
                      />
                    </span>
                    <span>
                      <span>
                        Email <span className={styles.compulsory}>*</span>
                      </span>
                      <br />
                      <input
                        type="email"
                        value={formData.donor_email}
                        onChange={handleChange}
                        name="donor_email"
                        id="donor_email"
                        placeholder="Enter donor e-mail"
                        required
                      />
                      {errors.donor_email && (
                        <p style={{ color: "red", marginTop: "5px" }}>
                          {errors.donor_email}
                        </p>
                      )}
                    </span>
                  </div>
                  <div className={styles.secondpersonalDetail}>
                    <span>
                      <span>Address</span>
                      <br />
                      <input
                        type="text"
                        value={formData.donor_address}
                        onChange={handleChange}
                        name="donor_address"
                        id="donor_address"
                        placeholder="Enter donor address"
                      />
                    </span>
                    <span>
                      <span>City</span>
                      <br />
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        id="city"
                        placeholder="Enter donor city"
                      />
                    </span>
                    <span>
                      <span>State</span>
                      <br />
                      <input
                        type="text"
                        value={formData.state}
                        onChange={handleChange}
                        name="state"
                        id="state"
                        placeholder="Enter donor state"
                      />
                    </span>
                  </div>
                  <div className={styles.thirdpersonalDetail}>
                    <span>
                      <span>Country</span>
                      <br />
                      <input
                        type="text"
                        value={formData.country}
                        onChange={handleChange}
                        name="country"
                        id="country"
                        placeholder="Enter donor country"
                      />
                    </span>
                    <span>
                      <span>Pincode</span>
                      <br />
                      <input
                        type="text"
                        value={formData.pincode}
                        onChange={handleChange}
                        onInput={(e) => {
                          e.target.value = e.target.value
                            .replace(/\D/g, "")
                            .substring(0, 6);
                        }}
                        name="pincode"
                        id="pincode"
                        placeholder="Enter donor pincode"
                      />
                    </span>
                    <span>
                      <span>
                        Mobile Number{" "}
                        <span className={styles.compulsory}>*</span>
                      </span>
                      <br />
                      <input
                        type="text"
                        onInput={(e) => {
                          e.target.value = e.target.value
                            .replace(/\D/g, "")
                            .substring(0, 10);
                        }}
                        min={0}
                        name="donor_phone"
                        value={formData.donor_phone}
                        onChange={handleChange}
                        autoComplete="off"
                        id="donor_phone"
                        placeholder="Enter donor mobile no."
                        maxLength="10"
                        required
                      />
                      {errors.donor_phone && (
                        <p style={{ color: "red", marginTop: "5px" }}>
                          {errors.donor_phone}
                        </p>
                      )}
                    </span>
                  </div>
                </div>
                <h2>Donation Information</h2>
                <div className={styles.donationDetail}>
                  <div className={styles.firstdonationDetail}>
                    <span>
                      <span>PAN Number</span>
                      <br />
                      <input
                        type="text"
                        name="pan"
                        value={formData.pan}
                        onChange={handleChange}
                        pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                        id="pan"
                        placeholder="Enter donor PAN number"
                      />
                    </span>
                    <span>
                      <span>
                        Offline Payment Method
                        <span className={styles.compulsory}>*</span>
                      </span>
                      <br />
                      <select
                        id="payment_method"
                        name="payment_method"
                        value={formData.payment_method}
                        onChange={handleChange}
                        required
                      >
                        <option value="" hidden>
                          Select Method
                        </option>
                        <option value="Cash">Cash</option>
                        <option value="Direct Bank Transfer">
                          Direct Bank Transfer
                        </option>
                        <option value="Cheque/DD">Cheque/DD</option>
                      </select>

                      {errors.payment_method && (
                        <p style={{ color: "red", marginTop: "5px" }}>
                          {errors.payment_method}
                        </p>
                      )}
                    </span>
                    <span>
                      Reference number
                      <input
                        type="text"
                        name="refrence_payment"
                        value={formData.refrence_payment}
                        onChange={handleChange}
                        id="refrence_payment"
                        placeholder="Enter donor Reference Number"
                      />
                    </span>
                  </div>
                  <div className={styles.seconddonationDetail}>
                    <span className={styles.offlinePaymentDate}>
                      <span>
                        Donation (Date)
                        <span className={styles.compulsory}>*</span>
                      </span>
                      <br />
                      <input
                        type="date"
                        name="donation_date"
                        id="donation_date"
                        value={formData.donation_date}
                        onChange={handleChange}
                        className={styles.donation_date}
                        required
                        style={{
                          width: "170px",
                          color: "#667085",
                          display: "flex",
                          flexDirection: "column",
                        }}
                        max={new Date().toISOString().split("T")[0]}
                      />

                      {errors.donation_date && (
                        <p style={{ color: "red", marginTop: "5px" }}>
                          {errors.donation_date}
                        </p>
                      )}
                    </span>
                    <span>
                      <span>Bank Name</span>
                      <br />
                      <input
                        type="text"
                        name="donor_bank_name"
                        id="bankName"
                        value={formData.donor_bank_name}
                        onChange={handleChange}
                        placeholder="Enter donor bank name"
                      />
                    </span>
                    <span>
                      <span>Bank Branch Name</span>
                      <br />
                      <input
                        type="text"
                        name="donor_bankBranch"
                        id="branchName"
                        value={formData.donor_bankBranch}
                        onChange={handleChange}
                        placeholder="Enter donor branch name"
                      />
                    </span>
                  </div>
                </div>
                <div className={styles.formButton}>
                  <button
                    type="reset"
                    className={`${styles.fundButton} ${styles.donorButton}`}
                    onClick={reset}
                  >
                    Cancel
                  </button>
                  <button
                    className={styles.fundButton}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </section>
    </>
  );
}
