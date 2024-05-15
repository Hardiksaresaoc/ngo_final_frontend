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
            <Link
              href="https://supportourheroes.in/our-story/"
              className={styles.aboutUsLink}
            >
              <i className={`fa-regular  fa-circle-dot }`}></i> Our Story
            </Link>
          </p>
          <p className={styles.aboutCompany}>
            <Link
              href="https://supportourheroes.in/vision-mission/"
              className={styles.aboutUsLink}
            >
              <i className={`fa-regular  fa-circle-dot }`}></i> Vision & Mission
            </Link>
          </p>
          <p className={styles.aboutCompany}>
            <Link
              href="https://supportourheroes.in/team-2/"
              className={styles.aboutUsLink}
            >
              <i className={`fa-regular  fa-circle-dot }`}></i> Team
            </Link>
          </p>
          <p className={styles.aboutCompany}>
            <Link
              href="https://supportourheroes.in/legal-status/"
              className={styles.aboutUsLink}
            >
              <i className={`fa-regular  fa-circle-dot }`}></i> Legal Status
            </Link>
          </p>
          <p className={styles.aboutCompany}>
            <Link
              href="https://supportourheroes.in/our-faqs/"
              className={styles.aboutUsLink}
            >
              <i className={`fa-regular  fa-circle-dot }`}></i> OUR FAQs
            </Link>
          </p>
        </div>
        <div className={styles.donate}>
          <h3>Donate</h3>
          <p className={styles.aboutCompany}>
            <Link
              href="https://eazypay.icicibank.com/eazypayLink?P1=bsIifrs+TIpdJsIeVKK9Dw=="
              className={styles.aboutUsLink}
            >
              <i className={`fa-regular  fa-circle-dot }`}></i> Online Donation
            </Link>
          </p>
          <p className={styles.aboutCompany}>
            <Link
              href="https://supportourheroes.in/donate-now/"
              className={styles.aboutUsLink}
            >
              <i className={`fa-regular  fa-circle-dot }`}></i> Bank Transfer
            </Link>
          </p>
          <p className={styles.aboutCompany}>
            <Link
              href="https://supportourheroes.in/donate-now/"
              className={styles.aboutUsLink}
            >
              <i className={`fa-regular  fa-circle-dot }`}></i> Write a Cheque /
              Demand Draft
            </Link>
          </p>
          <p className={styles.aboutCompany}>
            <Link
              href=" https://supportourheroes.in/tax-exemption-donation-faqs/"
              className={styles.aboutUsLink}
            >
              <i className={`fa-regular  fa-circle-dot }`}></i> Donate for Tax
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
          <Link href="https://www.facebook.com/support.our.heroes.initiative/">
            <Image
              src="/images/facebook().png"
              alt="facebook"
              height="50"
              width="50"
              className={styles.socialmediaImage}
            />
          </Link>
          <Link href="https://twitter.com/heroes_support">
            <Image
              src="/images/twitter().png"
              alt="twitter"
              height="50"
              width="50"
              className={styles.socialmediaImage}
            />
          </Link>
          <Link href="https://www.youtube.com/channel/UC6K5yueYHK1bpvFbTuY5YGQ">
            <Image
              src="/images/youtube().png"
              alt="youtube"
              height="50"
              width="50"
              className={styles.socialmediaImage}
            />
          </Link>
          <Link href="https://www.linkedin.com/in/support-our-heroes-16a526120/">
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
