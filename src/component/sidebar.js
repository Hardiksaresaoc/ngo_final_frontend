"use client";
import React from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css"; // Import your CSS module

import { BsPersonRaisedHand } from "react-icons/bs";
import { TbPasswordFingerprint } from "react-icons/tb";
import {
  MdAddCircleOutline,
  MdDashboard,
  MdOutlineWorkHistory,
} from "react-icons/md";

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
          <MdDashboard color={`${pathname === "/admin" ? "white" : "black"}`} />
          Dashboard
        </p>
      </Link>
      <Link href="/admin/generatecode">
        <p
          className={`${styles.link} ${
            pathname === "/admin/generatecode" ? `${styles.active}` : ""
          }`}
        >
          <TbPasswordFingerprint
            color={`${pathname === "/admin/generatecode" ? "white" : "black"}`}
          />
          Generate Fundraiser
        </p>
      </Link>
      <Link href="/admin/fundraisers">
        <p
          className={`${styles.link} ${
            pathname === "/admin/fundraisers" ? `${styles.active}` : ""
          }`}
        >
          <BsPersonRaisedHand
            color={`${pathname === "/admin/fundraisers" ? "white" : "black"}`}
          />
          {/* <i className={`fa-regular fa-coins}`}></i> */}
          All Fundraiser
        </p>
      </Link>
      <Link href="/admin/adddonation">
        <p
          className={`${styles.link} ${
            pathname === "/admin/adddonation" ? `${styles.active}` : ""
          }`}
        >
          <MdAddCircleOutline
            color={`${pathname === "/admin/adddonation" ? "white" : "black"}`}
          />
          Offline Donation
        </p>
      </Link>
      <Link href="/admin/donationHistory">
        <p
          className={`${styles.link} ${
            pathname === "/admin/donationHistory" ? `${styles.active}` : ""
          }`}
        >
          <MdOutlineWorkHistory
            color={`${
              pathname === "/admin/donationHistory" ? "white" : "black"
            }`}
          />
          Donation History
        </p>
      </Link>
    </div>
  );
}
