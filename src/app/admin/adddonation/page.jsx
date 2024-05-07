"use client";
import Sidebar from "@/component/sidebar";
// export default GeneratePage;
import styles from "./adddonation.module.css";
// import "./styles.css";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
import { showAlert } from "@/component/alert";
import Swal from "sweetalert2";
export default function page() {
  const cookies = new Cookies();
  const [token, settoken] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    amount: "",
    donor_name: "",
    // merge fname and lname
    donor_email: "",
    donor_phone: "",
    payment_type: "",
    donation_date: "",
    //
    lastName: "",
    donor_address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    pan: "",
    refrence_payment: "",
    donor_bankName: "",
    donor_bankBranch: "",
  });

  const reset = () => {
    setFormData({
      email: "",
      amount: "",
      donor_name: "",
      donor_email: "",
      donor_phone: "",
      payment_type: "",
      donation_date: "",
      lastName: "",
      donor_address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      pan: "",
      refrence_payment: "",
      donor_bankName: "",
      donor_bankBranch: "",
    });
  };
  useEffect(() => {
    const data = cookies.get("token");
    settoken(data);
  }, [cookies]);
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
    // showAlert({
    //   title: "hey",
    //   text: "new",
    //   icon: "success",
    //   confirmButtonText: "cool",
    // });
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
    if (!formData.donor_name) {
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
    if (!formData.payment_type) {
      newErrors.payment_type = "Donation type is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      formData["amount"] = Number(formData["amount"]);
      const response = await axios({
        method: "post",
        //processENV
        url: `${process.env.NEXT_PUBLIC_serverAPI}/admin/addOfflineDonation`,
        headers: config.headers,
        data: formData,
      });
      if (response.status == 201) {
        Swal.fire({
          title: "Added Succesfully",
          text: "Donation added!!",
          icon: "success",
          confirmButtonText: "Close",
          confirmButtonColor: "#000080",
        });
        console.log("success");
        reset();
        setLoading(false);
        console.log("API response:", response.data);
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
  return (
    <>
      {/* {console.log(token)} */}

      <section className={styles.mainFundraiser}>
        <Sidebar />
        <div className={styles.rightSection}>
          <div className={styles.rightpart}>
            <h1 className={styles.bigText}>Fundraiser Information</h1>
            <form className={styles.mainForm}>
              <div className={styles.fundraiserDetail}>
                <span>
                  <span>
                    Fundraiser E-mail
                    <span className={styles.compulsory}>*</span>
                  </span>
                  <br />
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter fundraiser e-mail"
                  />
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
                      value={formData.donor_name}
                      onChange={handleChange}
                      name="donor_name"
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
                      name="lastName"
                      value={formData.lastName}
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
                      name="pincode"
                      id="pincode"
                      placeholder="Enter donor pincode"
                    />
                  </span>
                  <span>
                    <span>
                      Mobile Number <span className={styles.compulsory}>*</span>
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
                    <input
                      type="text"
                      name="payment_type"
                      value={formData.payment_type}
                      onChange={handleChange}
                      id="payment_type"
                      placeholder="Choose donor payment method"
                      required
                    />
                    {errors.donor_paymentType && (
                      <p style={{ color: "red", marginTop: "5px" }}>
                        {errors.donor_paymentType}
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
                      style={{ width: "170px", color: "#667085" }}
                      className={styles.donation_date}
                      required
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
                      name="donor_bankName"
                      id="bankName"
                      value={formData.donor_bankName}
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
                {/* {Object.keys(errors).length > 0 && (
                  <div className={styles.errorMessages}>
                    {Object.values(errors).map((error, index) => (
                      <p key={index} style={{ color: "red" }}>
                        {error}
                      </p>
                    ))}
                  </div>
                )} */}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
