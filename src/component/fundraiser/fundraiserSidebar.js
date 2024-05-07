"use client";
import { usePathname } from "next/navigation";
import styles from "./fundraiserSidebar.module.css";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiSolidReport } from "react-icons/bi";
import Swal from "sweetalert2";

export default function AsideBar() {
  const pathname = usePathname();
  return (
    <>
      <div className={styles.leftAside}>
        <div className={styles.container}>
          <Link href="/fundraiserAdmin/dashboard">
            <p
              className={`tabButton ${
                pathname === "/fundraiserAdmin/dashboard" ? styles.active : ""
              }`}
            >
              <MdDashboard /> Dashboard
            </p>
          </Link>
          <Link href="/fundraiserAdmin/update">
            <p
              className={`tabButton ${
                pathname === "/fundraiserAdmin/update" ? styles.active : ""
              }`}
            >
              <AiFillInfoCircle />
              Fundraiser
            </p>
          </Link>
          <Link href="/fundraiserAdmin/photo">
            <p
              className={`tabButton ${
                pathname === "/fundraiserAdmin/photo" ? styles.active : ""
              }`}
            >
              <i className={`fas fa-image `}></i>
              Photos
            </p>
          </Link>
          <Link href="report">
            <p
              className={`tabButton ${
                pathname === "/fundraiserAdmin/report" ? styles.active : ""
              }`}
            >
              <BiSolidReport />
              Donations Report
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
export const TopHeader = ({ link }) => {
  return (
    <>
      <section className={styles.section}>
        <div className={styles.main}>
          <div className={styles.leftSection}>
            <div className={styles.content}>
              <h1>Heroes Who Shielded Us, Let's Shield Their Future.</h1>
              <p>
                Creating a society where every family of our defence
                <br /> martyrs & veterans is self-dependent and can live a<br />
                healthy life like us.
              </p>
            </div>
          </div>
          <div className={styles.rightSection}>
            <div className={styles.ImageArea}>
              <img
                style={{ width: "100%", height: "548px", objectFit: "contain" }}
                src="/images/FrontImage.png"
                alt="Soldiers"
              />
            </div>
          </div>
        </div>
        <div className={styles.lowerPart}>
          <p>
            Fundraising Page Link:
            <a
              className={styles.tooltip}
              onClick={() => {
                navigator.clipboard
                  .writeText(`http://localhost:3000/fundraiser/${link}`)
                  .then(
                    Swal.fire({
                      title: "Coppied!",
                      text: "Coppied to ClipBoard!!",
                      icon: "success  ",
                      confirmButtonText: "Close",
                      confirmButtonColor: "#000080",
                    })
                  );
              }}
            >
              {link}
              <span
                style={{ width: "fit-content" }}
                className={styles.tooltiptext}
              >
                click to copy
              </span>
            </a>
          </p>
        </div>
      </section>
    </>
  );
};
