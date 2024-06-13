"use client";
import styles from "./donation.module.css";
import { useState } from "react";
import axios from "axios";
import Right from "./right";

export default function Page() {
  const images = [
    "/images/ChiefMinisterOfAssam.jpeg",
    "/images/GovernorOfAndhraPradesh.jpeg",
    "/images/EasternNavalCommand.jpeg",
    "/images/EasternAirCommand.jpeg",
    "/images/ArmyEducationalCorps.jpeg",
    "/images/SainikWelfareAndhraPradesh.jpeg",
  ];

  const teamData = [
    {
      src: "/images/vinod-neb.png",
      name: "Late Wg. Cdr. Vinod Nebb (Retd)",
      award: " Vir Chakra & Bar (VrC)",
      patron: "Patron",
    },
    {
      src: "/images/RDSharma.png",
      name: "Lt. Col. R.D. Sharma (Retd.)",
      award: "",
      patron: "Patron",
    },
    {
      src: "/images/JSDhillon.png",
      name: "Lt. Gen. J.S. Dhillon (Retd), Vishisht Seva Medal (VSM)",
      award: " ",
      patron: "Patron",
    },
    {
      src: "/images/RanjeetShukla.png",
      name: "Mr. Ranjeet Shukla",
      award: " ",
      patron: "Co-founder",
    },
    {
      src: "/images/GauravShukla.png",
      name: "Mr. Gaurav Shukla",
      award: " ",
      patron: "Co-founder",
    },
    {
      src: "/images/GavirKumar.png",
      name: "Cdr. (IN) Gavi Kumar (Retd)",
      award: "Head of PR & Communications",
      patron: "",
    },
  ];

  const [formData, setFormData] = useState({
    donor_first_name: "",
    lastName: "",
    donor_email: "",
    donor_phone: "",
    panNumber: "",
    address: "",
    amount: 0,
  });

  const [donationOption, setDonationOption] = useState("donateAnyAmount");
  const [want80GCertificate, setWant80GCertificate] = useState(false);
  const [checkboxCounts, setCheckboxCounts] = useState({
    schoolFees: 0,
    medicalCare: 0,
    ration: 0,
  });
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (formData.amount <= 0) {
      newErrors.amount = "Amount must be a positive number.";
    }
    if (!formData.donor_first_name.trim()) {
      newErrors.donor_first_name = "First name is required.";
    }
    if (
      !formData.donor_email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.donor_email)
    ) {
      newErrors.donor_email = "Valid email is required.";
    }
    if (
      !formData.donor_phone.trim() ||
      !/^\d{10}$/.test(formData.donor_phone)
    ) {
      newErrors.donor_phone = "Mobile Number must be 10 digits";
    }
    if (want80GCertificate) {
      if (!formData.panNumber.trim()) {
        newErrors.panNumber = "PAN number is required for 80G certificate.";
      }
      if (!formData.address.trim()) {
        newErrors.address = "Address is required for 80G certificate.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "amount" ? parseInt(value, 10) || 0 : value,
    });
  };

  const handleDonationOptionChange = (e) => {
    setDonationOption(e.target.value);
    // if (e.target.value !== "donateAnyAmount") {
    setFormData({
      ...formData,
      amount: 0,
    });
    // } else {
    setSelectedCheckboxes([]);
    setCheckboxCounts({
      schoolFees: 0,
      medicalCare: 0,
      ration: 0,
    });
  };
  // };

  const handle80GCertificateChange = (e) => {
    setWant80GCertificate(e.target.value === "yes");
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    const amountMap = {
      schoolFees: 2500,
      medicalCare: 2000,
      ration: 1250,
    };

    if (
      checked
      // && donationOption !== "donateProjects"
    ) {
      setDonationOption("donateProjects");
    }

    setSelectedCheckboxes((prevSelected) => {
      const updatedSelected = checked
        ? [...prevSelected, id]
        : prevSelected.filter((item) => item !== id);
      return updatedSelected;
    });

    setFormData((prevData) => {
      const newAmount = checked
        ? prevData.amount + amountMap[id] * (checkboxCounts[id] + 1)
        : prevData.amount > 0 &&
          (prevData.amount - amountMap[id]) * checkboxCounts[id];
      return { ...prevData, amount: newAmount };
    });

    setCheckboxCounts((prevCounts) => ({
      ...prevCounts,
      [id]: checked ? 1 : 0,
    }));
  };
  // console.log(formData.amount);

  const incrementCount = (id) => {
    const amountMap = {
      schoolFees: 2500,
      medicalCare: 2000,
      ration: 1250,
    };

    setCheckboxCounts((prevCounts) => {
      const newCount = prevCounts[id] + 1;
      setFormData((prevData) => ({
        ...prevData,
        amount: prevData.amount + amountMap[id],
      }));
      return { ...prevCounts, [id]: newCount };
    });
  };

  const decrementCount = (id) => {
    const amountMap = {
      schoolFees: 2500,
      medicalCare: 2000,
      ration: 1250,
    };

    setCheckboxCounts((prevCounts) => {
      const newCount = Math.max(0, prevCounts[id] - 1);
      setFormData((prevData) => ({
        ...prevData,
        amount: prevData.amount - (prevCounts[id] > 0 ? amountMap[id] : 0),
      }));
      return { ...prevCounts, [id]: newCount };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const dataToSend = {
      ...formData,
      amount: parseFloat(formData.amount).toFixed(2),
      selectedCheckboxes,
    };
    if (!want80GCertificate) {
      delete dataToSend.panNumber;
      delete dataToSend.address;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_serverAPI}/donate`,
        dataToSend
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_serverAPI}/easypay/donation`,
        dataToSend
      );
      console.log(response.data);
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <main className={styles.mainPage}>
        <div className={"container"}>
          <div className={styles.upperPortion}>
            <div className={styles.pageTagline}>
              <p className={styles.tagline}>
                “In our nation, there's always a soldier sacrificing his own
                comfort for our peace. Now, it's our turn to shower them with
                love and showing them they're not alone.”
              </p>
            </div>
            <div className={styles.upperRight}>
              <div className={styles.ytVideo}>
                <iframe
                  width="693"
                  height="330"
                  src="https://www.youtube.com/embed/FjjSQ52j93k?si=RS5z3l9AvawzolmT"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <div className={styles.benefits}>
                <ul className={styles.unorderList}>
                  <li className={styles.benefitOptions}>100% Transparency</li>
                  <li className={`${styles.benefitOptions} ${styles.green}`}>
                    Assured
                  </li>
                  <li className={`${styles.benefitOptions} ${styles.orange}`}>
                    Ex-soldiers
                  </li>
                  <li className={`${styles.benefitOptions} ${styles.red}`}>
                    Tax-benefit
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <section className={styles.mainClass}>
          <div className={styles.leftSection}>
            <h2>Registration Details</h2>
            <div className={styles.registerDetails}>
              <p className={styles.companyDetails}>
                SOH Registration Number:{" "}
                <span className={styles.companyData}>246/2017</span>
              </p>
              <p className={styles.companyDetails}>
                PAN Number:{" "}
                <span className={styles.companyData}>AASTS5940F</span>
              </p>
              <p className={styles.companyDetails}>
                80G Number:{" "}
                <span className={styles.companyData}>AASTS5940FF20216</span>
              </p>
              <p className={styles.companyDetails}>
                12A Number:{" "}
                <span className={styles.companyData}>AASTS5940FE20218</span>
              </p>
            </div>
            <form className={styles.formSection} onSubmit={handleSubmit}>
              <div className={styles.amountSection}>
                <label htmlFor="amount">Amount*</label>
                <input
                  type="text"
                  className={styles.amount}
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  disabled={donationOption !== "donateAnyAmount"}
                />
                {errors.amount && (
                  <span className={styles.error} style={{ color: "red" }}>
                    {errors.amount}
                  </span>
                )}
              </div>
              <div className={styles.amountOptions}>
                <div className={styles.operation}>
                  <input
                    type="radio"
                    id="donateAnyAmount"
                    name="donationOption"
                    value="donateAnyAmount"
                    checked={donationOption === "donateAnyAmount"}
                    onChange={handleDonationOptionChange}
                  />
                  <label htmlFor="donateAnyAmount">Donate any amount</label>
                </div>
                <div className={styles.operation}>
                  <input
                    type="radio"
                    id="donateProjects"
                    name="donationOption"
                    value="donateProjects"
                    onChange={handleDonationOptionChange}
                  />
                  <label htmlFor="donateProjects">
                    Donate for projects of SOH{" "}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.8 5.6H7.2V4H8.8M8.8 12H7.2V7.2H8.8M8 0C6.94943 0 5.90914 0.206926 4.93853 0.608964C3.96793 1.011 3.08601 1.60028 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.08601 14.3997 3.96793 14.989 4.93853 15.391C5.90914 15.7931 6.94943 16 8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 6.94943 15.7931 5.90914 15.391 4.93853C14.989 3.96793 14.3997 3.08601 13.6569 2.34315C12.914 1.60028 12.0321 1.011 11.0615 0.608964C10.0909 0.206926 9.05058 0 8 0Z"
                        fill="#A4A4A4"
                      />
                    </svg>
                  </label>
                </div>
                {donationOption === "donateProjects" && (
                  <>
                    <div className={`${styles.operation} ${styles.checkbox}`}>
                      <input
                        type="checkbox"
                        id="schoolFees"
                        name="schoolFees"
                        checked={checkboxCounts.schoolFees > 0}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="schoolFees">
                        ₹2,500 for school fees
                        <div
                          className={`${styles.amountSelect} ${styles.filled}`}
                        >
                          <button
                            type="button"
                            className={styles.minusButton}
                            onClick={() => decrementCount("schoolFees")}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className={styles.numberButton}
                            value={checkboxCounts.schoolFees}
                            readOnly
                          />
                          <button
                            type="button"
                            className={`${styles.minusButton} ${styles.plusButton}`}
                            onClick={() => incrementCount("schoolFees")}
                          >
                            +
                          </button>
                        </div>
                      </label>
                    </div>
                    <div className={`${styles.operation} ${styles.checkbox}`}>
                      <input
                        type="checkbox"
                        id="medicalCare"
                        name="medicalCare"
                        checked={checkboxCounts.medicalCare > 0}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="medicalCare">
                        ₹2,000 for medical care
                        <div className={styles.amountSelect}>
                          <button
                            type="button"
                            className={styles.minusButton}
                            onClick={() => decrementCount("medicalCare")}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className={styles.numberButton}
                            value={checkboxCounts.medicalCare}
                            readOnly
                          />
                          <button
                            type="button"
                            className={`${styles.minusButton} ${styles.plusButton}`}
                            onClick={() => incrementCount("medicalCare")}
                          >
                            +
                          </button>
                        </div>
                      </label>
                    </div>
                    <div className={`${styles.operation} ${styles.checkbox}`}>
                      <input
                        type="checkbox"
                        id="ration"
                        name="ration"
                        checked={checkboxCounts.ration > 0}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="ration">
                        ₹1,250 to provide ration
                        <div className={styles.amountSelect}>
                          <button
                            type="button"
                            className={styles.minusButton}
                            onClick={() => decrementCount("ration")}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className={styles.numberButton}
                            value={checkboxCounts.ration}
                            readOnly
                          />
                          <button
                            type="button"
                            className={`${styles.minusButton} ${styles.plusButton}`}
                            onClick={() => incrementCount("ration")}
                          >
                            +
                          </button>
                        </div>
                      </label>
                    </div>
                  </>
                )}
                <p className={styles.optionNotice}>
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.8 6.1H7.2V4.5H8.8M8.8 12.5H7.2V7.7H8.8M8 0.5C6.94942 0.5 5.90914 0.706926 4.93853 1.10896C3.96793 1.511 3.08601 2.10028 2.34315 2.84315C0.842855 4.34344 0 6.37827 0 8.5C0 10.6217 0.842855 12.6566 2.34315 14.1569C3.08601 14.8997 3.96793 15.489 4.93853 15.891C5.90914 16.2931 6.94942 16.5 8 16.5C10.1217 16.5 12.1566 15.6571 13.6569 14.1569C15.1571 12.6566 16 10.6217 16 8.5C16 7.44942 15.7931 6.40914 15.391 5.43853C14.989 4.46793 14.3997 3.58601 13.6569 2.84315C12.914 2.10028 12.0321 1.511 11.0615 1.10896C10.0909 0.706926 9.05058 0.5 8 0.5Z"
                      fill="#A4A4A4"
                    />
                  </svg>
                  These amounts are for the monthly donation per beneficiary.
                </p>
              </div>
              <h2>Personal Info</h2>
              <div className={styles.userName}>
                <div className={styles.name}>
                  <label htmlFor="firstName">First Name*</label>
                  <input
                    type="text"
                    id="firstName"
                    name="donor_first_name"
                    value={formData.donor_first_name}
                    onChange={handleChange}
                  />
                  {errors.donor_first_name && (
                    <span className={styles.error} style={{ color: "red" }}>
                      {errors.donor_first_name}
                    </span>
                  )}
                </div>
                <div className={styles.name}>
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={styles.email}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="donor_email"
                  value={formData.donor_email}
                  onChange={handleChange}
                />
                {errors.donor_email && (
                  <span className={styles.error} style={{ color: "red" }}>
                    {errors.donor_email}
                  </span>
                )}
              </div>
              <div className={styles.pNumber}>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .substring(0, 10);
                  }}
                  name="donor_phone"
                  value={formData.donor_phone}
                  onChange={handleChange}
                />
                {errors.donor_phone && (
                  <span className={styles.error} style={{ color: "red" }}>
                    {errors.donor_phone}
                  </span>
                )}
              </div>
              <div className={styles.gCerti}>
                <p>Do you want 80G Certificate?</p>
                <div className={styles.chooseOption}>
                  <div className={styles.formRadio}>
                    <input
                      type="radio"
                      id="no"
                      name="certificate"
                      value="no"
                      checked={!want80GCertificate}
                      onChange={handle80GCertificateChange}
                    />
                    <label htmlFor="no">No</label>
                  </div>
                  <div className={styles.formRadio}>
                    <input
                      type="radio"
                      id="yes"
                      name="certificate"
                      value="yes"
                      checked={want80GCertificate}
                      onChange={handle80GCertificateChange}
                    />
                    <label htmlFor="yes">Yes</label>
                  </div>
                </div>
              </div>
              {want80GCertificate && (
                <>
                  <div className={styles.panNo}>
                    <label htmlFor="panNumber">PAN No.*</label>
                    <input
                      type="text"
                      id="panNumber"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleChange}
                    />
                    {errors.panNumber && (
                      <span className={styles.error} style={{ color: "red" }}>
                        {errors.panNumber}
                      </span>
                    )}
                  </div>
                  <div className={styles.address}>
                    <label htmlFor="address">Address*</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                    {errors.address && (
                      <span className={styles.error} style={{ color: "red" }}>
                        {errors.address}
                      </span>
                    )}
                  </div>
                </>
              )}
              <div className={styles.donationBtn}>
                <button type="submit" className={styles.donateBtn}>
                  Donate ₹ {formData.amount}
                </button>
              </div>
            </form>
            <div className={styles.paymentIcons}>
              <div className={styles.icons}>
                <a href="#">
                  <img
                    src="/images/phonepay.png"
                    alt="phonepay"
                    width="40"
                    height="40"
                  />
                </a>
                <a href="#">
                  <img
                    src="/images/gpay.png"
                    alt="gpay"
                    width="40"
                    height="40"
                  />
                </a>
                <a href="#">
                  <img
                    src="/images/bheem.png"
                    alt="bheem"
                    width="40"
                    height="40"
                  />
                </a>
                <a href="#">
                  <img
                    src="/images/otherPay.png"
                    alt="otherPayment"
                    width="40"
                    height="40"
                  />
                </a>
              </div>
            </div>
          </div>
          <Right images={images} teamData={teamData} styles={styles} />
        </section>
        <section className={styles.mainSection}>
          <h2>
            “Join us in empowering our heroes and their families—your donation
            can make a world of difference.”
          </h2>
          <p>
            “Spread the word! Each share is a whisper of gratitude for our
            heroes.”
          </p>
          <div className={styles.socialMedia}>
            <a href="#">
              <img
                src="/images/facebook().png"
                alt="facebook"
                width="40"
                height="40"
              />
            </a>
            <a href="#">
              <img
                src="/images/twitter().png"
                alt="twitter"
                width="40"
                height="40"
              />
            </a>
            <a href="#">
              <img
                src="/images/youtube().png"
                alt="youtube"
                width="40"
                height="40"
              />
            </a>
            <a href="#">
              <img
                src="/images/linkedin().png"
                alt="linkedin"
                width="40"
                height="40"
              />
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
