import Link from "next/link";
import React from "react";
import styles from "./footer.module.css";
export default function Footer() {
  return (
    <footer className={styles.mainFooter}>
      <div className="upperFooter">
        <div className="aboutUs">
          <h3>About Us</h3>
          <p className="aboutCompany">
            <Link href="#" className="aboutUsLink">
              <i className="fa-regular fa-circle-dot"></i> Our Story
            </Link>
          </p>
          <p className="aboutCompany">
            <Link href="#" className="aboutUsLink">
              <i className="fa-regular fa-circle-dot"></i> Vision & Mission
            </Link>
          </p>
          <p className="aboutCompany">
            <Link href="#" className="aboutUsLink">
              <i className="fa-regular fa-circle-dot"></i> Team
            </Link>
          </p>
          <p className="aboutCompany">
            <Link href="#" className="aboutUsLink">
              <i className="fa-regular fa-circle-dot"></i> Legal Status
            </Link>
          </p>
          <p className="aboutCompany">
            <Link href="#" className="aboutUsLink">
              <i className="fa-regular fa-circle-dot"></i> OUR FAQs
            </Link>
          </p>
        </div>
        <div className="donate">
          <h3>Donate</h3>
          <p className="aboutCompany">
            <Link href="#" className="aboutUsLink">
              <i className="fa-regular fa-circle-dot"></i> Online Donation
            </Link>
          </p>
          <p className="aboutCompany">
            <Link href="#" className="aboutUsLink">
              <i className="fa-regular fa-circle-dot"></i> Bank Transfer
            </Link>
          </p>
          <p className="aboutCompany">
            <Link href="#" className="aboutUsLink">
              <i className="fa-regular fa-circle-dot"></i> Write a Cheque /
              Demand Draft
            </Link>
          </p>
          <p className="aboutCompany">
            <Link href="#" className="aboutUsLink">
              <i className="fa-regular fa-circle-dot"></i> Donate for Tax
              Benefits
            </Link>
          </p>
        </div>
        <div className="scanner">
          <h3>Scan & Donate</h3>
          <img
            src="/images/ngo-qr-code.png"
            alt="Scan & Donate"
            height="150"
            width="150"
          />
          <p className="scannerId">
            UPI ID - supportourheroes.62349310@hdfcbank
          </p>
        </div>
      </div>
      <div className="lowerFooter">
        <p className="headline">
          SUPPORT OUR HEROES a Trust registered under Section 60 of Indian
          Trusts Act, 1882. Registration no. 246/2017.
        </p>
        <p className="headlinePolicy">
          All donations are permitted a 50% exemption from tax under section 80G
          (5)(vi) of Income Tax
        </p>
        <div className="socialmedia">
          <Link href="#">
            <img
              src="/images/facebook().png"
              alt="facebook"
              height="50"
              width="50"
              className="socialmediaImage"
            />
          </Link>
          <Link href="#">
            <img
              src="/images/twitter().png"
              alt="twitter"
              height="50"
              width="50"
              className="socialmediaImage"
            />
          </Link>
          <Link href="#">
            <img
              src="/images/youtube().png"
              alt="youtube"
              height="50"
              width="50"
              className="socialmediaImage"
            />
          </Link>
          <Link href="#">
            <img
              src="/images/linkedin().png"
              alt="linkedin"
              height="50"
              width="50"
              className="socialmediaImage"
            />
          </Link>
        </div>
        <p className="copyright">Copyright © 2022 Support Our Heroes</p>
      </div>
    </footer>
  );
}
