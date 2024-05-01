"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css"; // Import your CSS module
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className={styles.leftSection}>
      <Link href="/admin">
        <p
          className={`${styles.link} ${
            pathname === "/admin" ? `${styles.active}` : ""
          }`}
        >
          <Image
            src="/images/dashboardIcon.png"
            height="16"
            width="16"
            alt="Dashboard Icon"
          />
          Dashboard
        </p>
      </Link>
      <Link href="/admin/generatecode">
        <p
          className={`${styles.link} ${
            pathname === "/admin/generatecode" ? `${styles.active}` : ""
          }`}
        >
          <i className={`fa-regular fa-address-book`}></i>
          Credentials
        </p>
      </Link>
      <Link href="/admin/fundraisers">
        <p
          className={`${styles.link} ${
            pathname === "/admin/fundraisers" ? `${styles.active}` : ""
          }`}
        >
          <i className={`fa-regular  fa-coins}`}></i>
          Fundraiser
        </p>
      </Link>
      <Link href="/admin/adddonation">
        <p
          className={`${styles.link} ${
            pathname === "/admin/adddonation" ? `${styles.active}` : ""
          }`}
        >
          <i className={`fa-regular  fa-hand-holding-dollar`}></i>
          Donation
        </p>
      </Link>
    </div>
  );
}
