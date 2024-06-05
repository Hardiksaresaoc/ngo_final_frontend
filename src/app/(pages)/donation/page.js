'use client'
import MySwiper, { MySwiperTeamMember, OneSwiper } from "@/component/MySwiper";
import styles from "./donation.module.css";
import { useState } from "react";
import axios from "axios";

export default function page() {
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(1250); // Default amount

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
      phoneNumber,
      panNumber,
      address,
      amount: amount,
    };

    try {
      const response = await axios.post("api/pay", data);
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
              “In our nation, there's always a soldier sacrificing his own comfort
              for our peace. Now, it's our turn to shower them with love and
              showing them they're not alone.”
            </p>
          </div>
          <div className={styles.upperRight}>
            <div className={styles.ytVideo}>
              <iframe
                width="693"
                height="330"
                src="https://www.youtube.com/embed/FjjSQ52j93k?si=RS5z3l9AvawzolmT"
                title="YouTube video player"
                frameBorder="0"
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
            <form className={styles.formSection}>
              <div className={styles.amountSection}>
                <label htmlFor="amount">Amount*</label>
                <input
                  type="text"
                  className={styles.amount}
                  name="Amount"
                  value="&#8377; 1,250"
                />
              </div>
              <div className={styles.amountOptions}>
                <div className={styles.operation}>
                  <input type="radio" id="PITHU" name="fav_language" />
                  <label htmlFor="amount">
                    Donate any amount
                  </label>
                </div>
                <div className={styles.operation}>
                  <input type="radio" id="SEHAT" name="fav_language" />
                  <label htmlFor="amount">
                    Donate for projects of SOH <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.8 5.6H7.2V4H8.8M8.8 12H7.2V7.2H8.8M8 0C6.94943 0 5.90914 0.206926 4.93853 0.608964C3.96793 1.011 3.08601 1.60028 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.08601 14.3997 3.96793 14.989 4.93853 15.391C5.90914 15.7931 6.94943 16 8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 6.94943 15.7931 5.90914 15.391 4.93853C14.989 3.96793 14.3997 3.08601 13.6569 2.34315C12.914 1.60028 12.0321 1.011 11.0615 0.608964C10.0909 0.206926 9.05058 0 8 0Z" fill="#A4A4A4" />
                    </svg>
                  </label>
                </div>
                <div className={`${styles.operation} ${styles.checkbox}`}>
                  <input type="checkbox" id="SAKSHAM" name="fav_language" />
                  <label htmlFor="amount">
                    ₹2,500 for school fees
                    <div className={`${styles.amountSelect} ${styles.filled}`}>
                    <button className={styles.minusButton}>
                      -
                    </button>
                    <input type="text" className={styles.numberButton}/>
                    <button className={`${styles.minusButton} ${styles.plusButton}`}>
                      +
                    </button></div>
                  </label>
                </div>
                <div className={`${styles.operation} ${styles.checkbox}`}>
                  <input type="checkbox" id="anyAmount" name="fav_language" />
                  <label htmlFor="amount">₹2,000 for medical care
                  <div className={styles.amountSelect}>
                    <button className={styles.minusButton}>
                      -
                    </button>
                    <input type="text" className={styles.numberButton}/>
                    <button className={`${styles.minusButton} ${styles.plusButton}`}>
                      +
                    </button></div>
                  </label>
                </div>
                <div className={`${styles.operation} ${styles.checkbox}`}>
                  <input type="checkbox" id="anyAmount" name="fav_language" />
                  <label htmlFor="amount">₹1,250 to provide ration
                  <div className={styles.amountSelect}>
                    <button className={styles.minusButton}>
                      -
                    </button>
                    <input type="text" className={styles.numberButton}/>
                    <button className={`${styles.minusButton} ${styles.plusButton}`}>
                      +
                    </button></div>
                  </label>
                </div>
                <p className={styles.optionNotice}><svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.8 6.1H7.2V4.5H8.8M8.8 12.5H7.2V7.7H8.8M8 0.5C6.94942 0.5 5.90914 0.706926 4.93853 1.10896C3.96793 1.511 3.08601 2.10028 2.34315 2.84315C0.842855 4.34344 0 6.37827 0 8.5C0 10.6217 0.842855 12.6566 2.34315 14.1569C3.08601 14.8997 3.96793 15.489 4.93853 15.891C5.90914 16.2931 6.94942 16.5 8 16.5C10.1217 16.5 12.1566 15.6571 13.6569 14.1569C15.1571 12.6566 16 10.6217 16 8.5C16 7.44942 15.7931 6.40914 15.391 5.43853C14.989 4.46793 14.3997 3.58601 13.6569 2.84315C12.914 2.10028 12.0321 1.511 11.0615 1.10896C10.0909 0.706926 9.05058 0.5 8 0.5Z" fill="#A4A4A4" />
                </svg>
                  These amounts are for the monthly donation per beneficiary.</p>
              </div>
              <h2>Personal Info</h2>
              <div className={styles.userName}>
                <div className={styles.name}>
                  <label htmlFor="amount">First Name*</label>
                  <input type="text" id="amount" name="fName" />
                </div>
                <div className={styles.name}>
                  <label htmlFor="amount">Last Name</label>
                  <input type="text" id="amount" name="lName" />
                </div>
              </div>
              <div className={styles.email}>
                <label htmlFor="amount">Email</label>
                <input type="email" id="amount" name="e-mail" />
              </div>
              <div className={styles.pNumber}>
                <label htmlFor="amount">Phone Number</label>
                <input type="number" id="amount" name="Phone-Number" />
              </div>
              <div className={styles.gCerti}>
                <p>Do you want 80G Certificate?</p>
                <div className={styles.chooseOption}>
                  <div className={styles.formRadio}>
                    <input type="radio" id="no" name="fav_language" />
                    <label htmlFor="no">No</label>
                  </div>
                  <div className={styles.formRadio}>
                    <input type="radio" id="yes" name="fav_language" />
                    <label htmlFor="yes">Yes</label>
                  </div>
                </div>
              </div>
              <div className={styles.panNo}>
                <label htmlFor="amount">PAN No.*</label>
                <input type="text" id="amount" name="PAN-No" />
              </div>
              <div className={styles.address}>
                <label htmlFor="amount">Address*</label>
                <input type="text" id="amount" name="Address" />
              </div>
              <div className={styles.donationBtn}>
                <button
                  type="submit"
                  onSubmit={handleSubmit}
                  className={styles.donateBtn}
                >
                  Donate &#8377; 1,250
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
              <img
                src="/images/summary(1).png"
                alt=""
                width="540"
                height="359"
                className={styles.summaryImage}
              />
              <p className={styles.middleTag}>
                This hit home as we had also experienced this lack of money at
                one point in our life after our father retired from the Army
                after 28 years of service.
              </p>
              <img
                src="/images/summary(2).png"
                alt=""
                width="540"
                height="359"
                className={styles.summaryImage}
              />
              <p className={styles.middleTag}>
                We saw a lot of enthusiasm on social media about our soldiers
                but not enough tangible action to change their lives
                meaningfully. That's when Support Our Heroes (SOH) was born with
                an aim to "serve those who fought for us"
              </p>
              <img
                src="/images/summary(3).png"
                alt=""
                width="540"
                height="359"
                className={styles.summaryImage}
              />
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
              <img
                src="/images/projectpithu.png"
                alt="Project Pithu"
                width="540"
                height="359"
                className={`${styles.summaryImage} ${styles.projectImage}`}
              />
              <p>
                <span className={styles.boldText}>(b) Project SEHAT</span> aims
                to pay health-related costs like monthly medicines, medical
                check-up by doctors etc. for destitute and old
                non-pensioners/their widows (20 soldiers/widows are being
                supported every month).
              </p>
              <img
                src="/images/projectsehat.png"
                alt="Project Sehat"
                width="540"
                height="359"
                className={`${styles.summaryImage} ${styles.projectImage}`}
              />
              <p>
                <span className={styles.boldText}>(c) Project SAKSHAM</span>{" "}
                aims to support children’s education (15 children of
                needy/disabled soldiers are being supported every month).
              </p>
              <img
                src="/images/projectsaksham.png"
                alt="Project Saksham"
                width="540"
                height="359"
                className={`${styles.summaryImage} ${styles.projectImage}`}
              />
              <p>
                <span className={styles.boldText}>(d) Project SASHAKT</span>{" "}
                aims to financially empower and provide livelihood opportunities
                to the widows of Ex-servicemen/needy veterans and their
                dependents (no monthly cases so far).
              </p>
              <img
                src="/images/projectsashakt.png"
                alt="Project Sashakt"
                width="540"
                height="359"
                className={`${styles.summaryImage} ${styles.projectImage}`}
              />
              <p>
                <span className={styles.boldText}>(e) Project INSANIYAT</span>{" "}
                aims to provide humanitarian assistance to Soldiers & their
                families as well as downtrodden people in the society (no
                monthly cases so far).
              </p>
              <img
                src="/images/projectinsaniyat.png"
                alt="Project Insaniyat"
                width="540"
                height="359"
                className={`${styles.summaryImage} ${styles.projectImage}`}
              />
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
              <img
                src="/images/cadetscholarship.png"
                alt="Cadet Scholarship"
                width="540"
                height="359"
                className={`${styles.summaryImage} ${styles.projectImage}`}
              />
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
              <img
                src="/images/summary(4).png"
                alt=""
                width="540"
                height="359"
                className={`${styles.summaryImage} ${styles.projectImage}`}
              />
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
