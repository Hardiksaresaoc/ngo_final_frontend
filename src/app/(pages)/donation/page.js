"use client";
import MySwiper, { MySwiperTeamMember, OneSwiper } from "@/component/MySwiper";
import styles from "./donation.module.css";
import { useState } from "react";
import axios from "axios";

export default function Page() {
  const images = [
    "/images/andhra.png",
    "/images/assam.png",
    "/images/easternNaval.png",
    "/images/easternNaval.png",
    "/images/easternNaval.png",
    "/images/easternNaval.png",
  ];
  const teamData = [
    {
      src: "/images/vinod-neb.png",
      name: "Late Wg. Cdr. Vinod Nebb (Retd)",
      award: " Vir Chakra & Bar (VrC)",
    },
    {
      src: "/images/RDSharma.png",
      name: "Lt. Col. R.D. Sharma (Retd.)",
      award: "",
    },
    {
      src: "/images/JSDhillon.png",
      name: "Lt. Gen. J.S. Dhillon (Retd), Vishisht Seva Medal (VSM)",
      award: " ",
    },
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    panNumber: "",
    address: "",
    amount: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "amount" ? parseInt(value, 10) || 0 : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("api/pay", formData);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <main className={styles.mainPage}>
        <div className={styles.upperPortion}>
          <div className={styles.pageTagline}>
            <p className={styles.tagline}>
              “In our nation, there's always a soldier sacrificing his own
              comfort for our peace. Now, it's our turn to shower them with love
              and showing them they're not alone.”
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
                />
              </div>
              <div className={styles.amountOptions}>
                <div className={styles.operation}>
                  <input type="radio" id="PITHU" name="donationType" />
                  <label htmlFor="PITHU">Donate any amount</label>
                </div>
                <div className={styles.operation}>
                  <input type="radio" id="SEHAT" name="donationType" />
                  <label htmlFor="SEHAT">
                    ₹2,500 for 1 month school fees (Project SAKSHAM)
                  </label>
                </div>
                <div className={styles.operation}>
                  <input type="radio" id="SAKSHAM" name="donationType" />
                  <label htmlFor="SAKSHAM">
                    ₹2,000 for 1 month medical care (Project SEHAT)
                  </label>
                </div>
                <div className={styles.operation}>
                  <input type="radio" id="anyAmount" name="donationType" />
                  <label htmlFor="anyAmount">Donate any amount</label>
                </div>
              </div>
              <h2>Personal Info</h2>
              <div className={styles.userName}>
                <div className={styles.name}>
                  <label htmlFor="firstName">First Name*</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.pNumber}>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.gCerti}>
                <p>Do you want 80G Certificate?</p>
                <div className={styles.chooseOption}>
                  <div className={styles.formRadio}>
                    <input type="radio" id="no" name="certificate" />
                    <label htmlFor="no">No</label>
                  </div>
                  <div className={styles.formRadio}>
                    <input type="radio" id="yes" name="certificate" />
                    <label htmlFor="yes">Yes</label>
                  </div>
                </div>
              </div>
              <div className={styles.panNo}>
                <label htmlFor="panNumber">PAN No.*</label>
                <input
                  type="text"
                  id="panNumber"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                />
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
              </div>
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
          <div className={styles.rightSection}>
            <div className={styles.content}>
              <p>
                “It was a chance encounter in May 2016 with retired Army men,
                war-disabled soldiers and war-widows at Jantar Mantar. There was
                a 70+ years old retired Sepoy who had a large family to support
                with his meagre pension. Both of his sons worked as daily
                labourers with no predictable income to feed their kids.
              </p>
              <p className={styles.middleTag}>
                This hit home as we had also experienced this lack of money at
                one point in our life after our father retired from the Army
                after 28 years of service.
              </p>
              <p>
                We saw a lot of enthusiasm on social media about our soldiers
                but not enough tangible action to change their lives
                meaningfully. That's when Support Our Heroes (SOH) was born with
                an aim to "serve those who fought for us"
              </p>
            </div>
            <h2 className={styles.ourHeroes}>About Support Our Heroes</h2>
            <div className={styles.supportHeroesContent}>
              <p>
                Support Our Heroes(SOH) is dedicated to providing timely help
                since 2017 to the needy Ex-soldiers and their families, disabled
                soldiers, Veer Naris / Widows, medically boarded out cadets from
                Officers Training Academies & PBOR from Training Centres who
                either cannot be helped under any Government/Armed Forces Scheme
                or they are given extremely long waiting period to receive the
                Governmental Aid.
              </p>
              <p>
                We are currently{" "}
                <span className={styles.boldText}>
                  operational in 17 states
                </span>{" "}
                and have helped more than 300 Ex-soldiers (including sailors &
                air warriors) & their families so far.{" "}
                <span className={styles.boldText}>
                  We are providing an ongoing help to 125 people every month
                </span>{" "}
                under our various projects outlined below :-
              </p>
              <p>
                <span className={styles.boldText}>(a) Project PITHU</span> aims
                to provide monthly ration for life to old non-pensioners/their
                widows living in penury in the far-flung parts of the country
                like North-East, Ladakh, Uttarakhand, Telangana etc. (90
                soldiers/widows are being supported every month).
              </p>
              <p>
                <span className={styles.boldText}>(b) Project SEHAT</span> aims
                to pay health-related costs like monthly medicines, medical
                check-up by doctors etc. for destitute and old
                non-pensioners/their widows (20 soldiers/widows are being
                supported every month).
              </p>
              <p>
                <span className={styles.boldText}>(c) Project SAKSHAM</span>{" "}
                aims to support children’s education (15 children of
                needy/disabled soldiers are being supported every month).
              </p>
              <p>
                <span className={styles.boldText}>(d) Project SASHAKT</span>{" "}
                aims to financially empower and provide livelihood opportunities
                to the widows of Ex-servicemen/needy veterans and their
                dependents (no monthly cases so far).
              </p>
              <p>
                <span className={styles.boldText}>(e) Project INSANIYAT</span>{" "}
                aims to provide humanitarian assistance to Soldiers & their
                families as well as downtrodden people in the society (no
                monthly cases so far).
              </p>
              <p>
                <span className={styles.boldText}>
                  (f) Wing Commander Vinod Nebb Memorial Scholarship:
                </span>{" "}
                Wg Cdr Vinod Nebb, VrC & Bar was one of our patrons who recently
                passed away. To recognize his active contribution to the growth
                of our NGO and celebrate his legacy we have recently started
                this scholarship for medically boarded out cadets from Officers
                Training Academies & PBOR from Training Centres who belong to
                poor economic background and are not getting any benefit of
                existing Government/Defence Schemes.
              </p>
            </div>
            <div className={styles.carousals}>
              <OneSwiper styles={styles} OneImage={images} />
            </div>
            <div className={styles.supportHeroesContent}>
              <p>
                We review every case expeditiously and try to offer meaningful
                help immediately through the above mentioned projects. While our
                funds are limited we can always have a bigger heart to help
                those in need. This belief is what attracts lots of like minded
                people to our cause.
              </p>
              <p>
                Our mission is to build an ecosystem that provides resettlement
                to abandoned old Ex-soldiers, ensures continued education for
                children of disabled Ex-soldiers & martyred soldiers and trains
                war widows to achieve self-sustainability.
              </p>
            </div>
            <h2 className={styles.ourTeams}>
              Meet the heartbeat of the organization (Our Team)
            </h2>
            <div className={styles.sliders}>
              <MySwiperTeamMember styles={styles} teamData={teamData} />
            </div>
            <p className={styles.sliderTag}>
              "Support Our Heroes (SOH)" is run by decorated Ex-Defence Officers
              of all three services (Army, Navy & Air Force).
            </p>
            <h2 className={styles.ourTeams}>Letters of Appreciation</h2>
            <div className={styles.sliders}>
              <div className={styles.LOA}>
                <MySwiper image={images} />
              </div>
            </div>
            <a href="#" className={styles.viewAllPage}>
              View All
            </a>
          </div>
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
