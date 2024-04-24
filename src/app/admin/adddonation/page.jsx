"use client";
import Sidebar from "@/component/sidebar";
// export default GeneratePage;
import "./styCles.css";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
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
    setLoading(true);
    e.preventDefault();

    // Validation
    const newErrors = {};

    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    }
    if (!formData.donor_name) {
      newErrors.firstName = "First Name is required";
    }
    if (!formData.donor_email) {
      newErrors.email = "Email is required";
    }
    if (!formData.donor_phone) {
      newErrors.mobileNumber = "Mobile Number is required";
    }

    if (!formData.donation_date) {
      newErrors.paymentDate = "Donation Date is required";
    }
    // if (!formData.donor_paymentType) {
    //   newErrors.donor_paymentType = "Donation type required";
    // }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // API Call
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
        url: `https://allowing-shiner-needlessly.ngrok-free.app/admin/addOfflineDonation`,
        headers: config.headers,
        data: formData,
      });
      if (response.status == 201) {
        console.log("success");
        setLoading(false);
        setFormData({
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
        console.log("API response:", response.data);
        alert("done");
      }

      setErrors({});
    } catch (error) {
      console.error("API error:", error);
      setLoading(false);
    }
  };
  return (
    <>
      {/* {console.log(token)} */}

      <section className="mainFundraiser">
        <Sidebar />
        <div className="rightSection">
          <div className="rightpart">
            <h1 className="bigText">Fundraiser Information</h1>
            <form className="mainForm">
              <div className="fundraiserDetail">
                <span>
                  <span>
                    Fundraiser E-mail <span className="compulsory">*</span>
                  </span>
                  <br />
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your fundraiser e-mail"
                  />{" "}
                </span>
                <span>
                  <span>
                    Amount <span className="compulsory">*</span>
                  </span>
                  <br />
                  <input
                    type="number"
                    name="amount"
                    min={1}
                    value={formData.amount}
                    onChange={handleChange}
                    id="donor_phone"
                    placeholder="Enter your amount"
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
              <div className="personalDetail">
                <div className="firstpersonalDetail">
                  <span>
                    <span>
                      First Name <span className="compulsory">*</span>
                    </span>
                    <br />
                    <input
                      type="text"
                      value={formData.donor_name}
                      onChange={handleChange}
                      name="donor_name"
                      id="donor_name"
                      placeholder="Enter your first name"
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
                      placeholder="Enter your last name"
                    />
                  </span>
                  <span>
                    <span>
                      Email <span className="compulsory">*</span>
                    </span>
                    <br />
                    <input
                      type="email"
                      value={formData.donor_email}
                      onChange={handleChange}
                      name="donor_email"
                      id="donor_email"
                      placeholder="Enter your e-mail"
                      required
                    />
                    {errors.donor_email && (
                      <p style={{ color: "red", marginTop: "5px" }}>
                        {errors.donor_email}
                      </p>
                    )}
                  </span>
                </div>
                <div className="secondpersonalDetail">
                  <span>
                    <span>Address</span>
                    <br />
                    <input
                      type="text"
                      value={formData.donor_address}
                      onChange={handleChange}
                      name="donor_address"
                      id="donor_address"
                      placeholder="Enter your address"
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
                      placeholder="Enter your city"
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
                      placeholder="Enter your state"
                    />
                  </span>
                </div>
                <div className="thirdpersonalDetail">
                  <span>
                    <span>Country</span>
                    <br />
                    <input
                      type="text"
                      value={formData.country}
                      onChange={handleChange}
                      name="country"
                      id="country"
                      placeholder="Enter your country"
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
                      placeholder="Enter your pincode"
                    />
                  </span>
                  <span>
                    <span>
                      Mobile Number <span className="compulsory">*</span>
                    </span>
                    <br />
                    <input
                      type="text"
                      name="donor_phone"
                      value={formData.donor_phone}
                      onChange={handleChange}
                      id="donor_phone"
                      placeholder="Enter your mobile no."
                      maxLength="10"
                      pattern="[1-9]{1}[0-9]{9}"
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
              <div className="donationDetail">
                <div className="firstdonationDetail">
                  <span>
                    <span>PAN Number</span>
                    <br />
                    <input
                      type="text"
                      name="pan"
                      value={formData.pan}
                      onChange={handleChange}
                      id="pan"
                      placeholder="Enter your PAN number"
                    />
                  </span>
                  <span>
                    <span>
                      Offline Payment Method
                      <span className="compulsory">*</span>
                    </span>
                    <br />
                    <input
                      type="text"
                      name="payment_type"
                      value={formData.payment_type}
                      onChange={handleChange}
                      id="payment_type"
                      placeholder="Choose your payment method"
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
                      placeholder="Enter your Reference Number"
                    />
                  </span>
                </div>
                <div className="seconddonationDetail">
                  <span className="offlinePaymentDate">
                    <span>
                      Donation (Date) <span className="compulsory">*</span>
                    </span>
                    <br />
                    <input
                      type="date"
                      name="donation_date"
                      id="donation_date"
                      value={formData.donation_date}
                      onChange={handleChange}
                      className="paymentDate"
                      placeholder="Enter your Cheque/DD/NEFT date"
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
                      placeholder="Enter your bank name"
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
                      placeholder="Enter your branch name"
                    />
                  </span>
                </div>
              </div>
              <div className="formButton">
                <button type="reset" className="fundButton donorButton">
                  Cancel
                </button>
                <button
                  className="fundButton"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
                {Object.keys(errors).length > 0 && (
                  <div className="errorMessages">
                    {Object.values(errors).map((error, index) => (
                      <p key={index} style={{ color: "red" }}>
                        {error}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
