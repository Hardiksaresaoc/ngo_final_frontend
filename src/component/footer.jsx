import Link from "next/link";
import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className={styles.mainFooter}>
      <div className={styles.upperFooter}>
        <div className={styles.aboutUs}>
          <h3>About Us</h3>
          <p className={styles.aboutCompany}>
            <Link href="#" className={styles.aboutUsLink}>
              <i className="fa-regular fa-circle-dot"></i> Our Story
            </Link>
          </p>
          <p className={styles.aboutCompany}>
            <Link href="#" className={styles.aboutUsLink}>
              <i className="fa-regular fa-circle-dot"></i> Vision & Mission
            </Link>
          </p>
          <p className={styles.aboutCompany}>
            <Link href="#" className={styles.aboutUsLink}>
              <i className="fa-regular fa-circle-dot"></i> Team
            </Link>
          </p>
          <p className={styles.aboutCompany}>
            <Link href="#" className={styles.aboutUsLink}>
              <i className="fa-regular fa-circle-dot"></i> Legal Status
            </Link>
          </p>
          <p className={styles.aboutCompany}>
            <Link href="#" className={styles.aboutUsLink}>
              <i className="fa-regular fa-circle-dot"></i> OUR FAQs
            </Link>
          </p>
        </div>
        <div className={styles.donate}>
          <h3>Donate</h3>
          <p className={styles.aboutCompany}>
            <Link href="#" className={styles.aboutUsLink}>
              <i className="fa-regular fa-circle-dot"></i> Online Donation
            </Link>
          </p>
          <p className={styles.aboutCompany}>
            <Link href="#" className={styles.aboutUsLink}>
              <i className="fa-regular fa-circle-dot"></i> Bank Transfer
            </Link>
          </p>
          <p className={styles.aboutCompany}>
            <Link href="#" className={styles.aboutUsLink}>
              <i className="fa-regular fa-circle-dot"></i> Write a Cheque /
              Demand Draft
            </Link>
          </p>
          <p className={styles.aboutCompany}>
            <Link href="#" className={styles.aboutUsLink}>
              <i className="fa-regular fa-circle-dot"></i> Donate for Tax
              Benefits
            </Link>
          </p>
        </div>
        <div className={styles.scanner}>
          <h3>Scan & Donate</h3>
          <Image
            src="/images/ngo-qr-code.png"
            alt="Scan & Donate"
            height="150"
            width="150"
          />
          <p className={styles.scannerId}>
            UPI ID - supportourheroes.62349310@hdfcbank
          </p>
        </div>
      </div>
      <div className={styles.lowerFooter}>
        <p className={styles.headline}>
          SUPPORT OUR HEROES a Trust registered under Section 60 of Indian
          Trusts Act, 1882. Registration no. 246/2017.
        </p>
        <p className={styles.headlinePolicy}>
          All donations are permitted a 50% exemption from tax under section 80G
          (5)(vi) of Income Tax
        </p>
        <div className={styles.socialmedia}>
          <Link href="#">
            <Image 
              src="/images/facebook().png"
              alt="facebook"
              height="50"
              width="50"
              className={styles.socialmediaImage}
            />
          </Link>
          <Link href="#">
            <Image 
              src="/images/twitter().png"
              alt="twitter"
              height="50"
              width="50"
              className={styles.socialmediaImage}
            />
          </Link>
          <Link href="#">
            <Image 
              src="/images/youtube().png"
              alt="youtube"
              height="50"
              width="50"
              className={styles.socialmediaImage}
            />
          </Link>
          <Link href="#">
            <Image 
              src="/images/linkedin().png"
              alt="linkedin"
              height="50"
              width="50"
              className={styles.socialmediaImage}
            />
          </Link>
        </div>
        <p className={styles.copyright}>Copyright © 2022 Support Our Heroes</p>
      </div>
    </footer>
  );
}
