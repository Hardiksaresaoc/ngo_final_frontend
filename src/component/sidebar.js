"use client";
import React from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css"; // Import your CSS module
import Image from "next/image";

import { BsPersonRaisedHand } from "react-icons/bs";
import { TbPasswordFingerprint } from "react-icons/tb";
import { MdAddCircleOutline, MdDashboard } from "react-icons/md";
import { FaDonate } from "react-icons/fa";

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
          <MdDashboard color="black" />
          Dashboard
        </p>
      </Link>
      <Link href="/admin/generatecode">
        <p
          className={`${styles.link} ${
            pathname === "/admin/generatecode" ? `${styles.active}` : ""
          }`}
        >
          <TbPasswordFingerprint color="black" />
          Credentials
        </p>
      </Link>
      <Link href="/admin/fundraisers">
        <p
          className={`${styles.link} ${
            pathname === "/admin/fundraisers" ? `${styles.active}` : ""
          }`}
        >
          <BsPersonRaisedHand color="black" />
          {/* <i className={`fa-regular fa-coins}`}></i> */}
          Fundraiser
        </p>
      </Link>
      <Link href="/admin/adddonation">
        <p
          className={`${styles.link} ${
            pathname === "/admin/adddonation" ? `${styles.active}` : ""
          }`}
        >
          <MdAddCircleOutline color="black" />
          Donation
        </p>
      </Link>
    </div>
  );
}
