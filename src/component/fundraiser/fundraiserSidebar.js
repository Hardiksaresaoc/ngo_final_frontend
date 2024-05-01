"use client";
import { usePathname } from "next/navigation";
import styles from "./fundraiserSidebar.module.css";
import Link from "next/link";
import Image from "next/image";

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
              <Image
                src="/images/dashboard.png"
                alt="dashboard"
                className={styles.sidebarImage}
                height="16"
                width="16"
              />
              Dashboard
            </p>
          </Link>
          <Link href="/fundraiserAdmin/update">
            <p
              className={`tabButton ${
                pathname === "/fundraiserAdmin/update" ? styles.active : ""
              }`}
            >
              <Image
                src="/images/circle.png"
                alt="fundraiser"
                className={styles.sidebarImage}
                height="16"
                width="16"
              />
              Fundraiser
            </p>
          </Link>
          <Link href="/fundraiserAdmin/photo">
            <p
              className={`tabButton ${
                pathname === "/fundraiserAdmin/photo" ? styles.active : ""
              }`}
            >
              <i className={`fas fa-image ${styles.asideIcon}`}></i>
              Photos
            </p>
          </Link>
          <Link href="report">
            <p
              className={`tabButton ${
                pathname === "/fundraiserAdmin/report" ? styles.active : ""
              }`}
            >
              <Image
                src="/images/table.png"
                alt="Report"
                className={styles.sidebarImage}
                height="16"
                width="16"
              />
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
              <Image
                style={{ width: "100%", height: "400px", objectFit: "contain" }}
                src="/images/FrontImage.png"
                alt="Soldiers"
                unoptimized
                height="300"
                width="100"
              />
            </div>
          </div>
        </div>
        <div className={styles.lowerPart}>
          <p>
            Fundraising Page Link:
            <Link href={`http://localhost:3000/fundraiser/${link}`}>
              {link}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};
