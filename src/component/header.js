"use client";
import { Button } from "@nextui-org/react";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import styles from "./header.module.css"; // Assuming this imports your custom styles

import Loading from "@/app/loading";
import { FundraiserContext } from "@/context/FundraiserContext";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const [isopen, setisopen] = useState(false);
  const [loading, setLoading] = useState(false);
  const fundraiserCtx = useContext(FundraiserContext);
  const [profileImage, setProfileImage] = useState("");

  const toggle = () => {
    setisopen(!isopen);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      setProfileImage(decodedToken.profileImage);
    } else {
      setUser(null);
    }
  }, [Cookies.get("token")]);

  const handleLogout = (e) => {
    Swal.fire({
      title: "Logging you Out",
      text: "Please Wait",
      icon: "info",
      showConfirmButton: false,
    });

    setTimeout(() => {
      try {
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        router.replace("/login");
        Swal.close();
      } catch (error) {}
    }, 2000);
  };

  return loading ? (
    <Loading />
  ) : (
    <header className={styles.head}>
      <div className={styles.logo}>
        <Link href={"/"}>
          <Image
            priority
            alt="SOH"
            src="/images/ProjectLogo.png"
            className={styles.logoImg}
            height="100"
            width="100"
          />
        </Link>
      </div>
      <nav className={styles.headerNav}>
        <ul className={styles.headerUL}>
          <li className={styles.headerLi}>
            <Link legacyBehavior href="/">
              <a
                className={`${styles.navlink} ${
                  pathname === "/login" ? styles.active : ""
                }`}
              >
                Home
              </a>
            </Link>
          </li>
          <li className={styles.dropdownLi}>
            <div className={styles.dropdown}>
              <button className={`${styles.dropbtn} ${styles.navlink}`}>
                Projects
                <i className={`fa fa-caret-down ${styles.downIcon}`}></i>
              </button>
              <div className={`${styles["dropdown-content"]}`}>
                <Link
                  href="https://supportourheroes.in/project-pithu/"
                  className={styles.dropdownProject}
                >
                  Project PITHU
                </Link>
                <Link
                  href="https://supportourheroes.in/project-sehat/"
                  className={styles.dropdownProject}
                >
                  Project SEHAT
                </Link>
                <Link
                  href="https://supportourheroes.in/project-saksham/"
                  className={styles.dropdownProject}
                >
                  Project SAKSHAM
                </Link>
                <Link
                  href="https://supportourheroes.in/project-sashakt/"
                  className={styles.dropdownProject}
                >
                  Project SASHAKT
                </Link>
                <Link
                  href="https://supportourheroes.in/project-insaniyat/"
                  className={styles.dropdownProject}
                >
                  Project INSANIYAT
                </Link>
              </div>
            </div>
          </li>
          <li className={styles.dropdownLi}>
            <div className={styles.dropdown}>
              <button className={`${styles.dropbtn} ${styles.navlink}`}>
                About Us
                <i className={`fa fa-caret-down ${styles.downIcon}`}></i>
              </button>
              <div className={`${styles["dropdown-content"]}`}>
                <Link
                  href="https://supportourheroes.in/vision-mission/"
                  className={styles.dropdownProject}
                >
                  Vission & Mission
                </Link>
                <Link
                  href="https://supportourheroes.in/team/"
                  className={styles.dropdownProject}
                >
                  Team
                </Link>
                <Link
                  href="https://supportourheroes.in/letters-of-appreciation/"
                  className={styles.dropdownProject}
                >
                  Letters of
                  <br />
                  Appreciation
                </Link>
                <Link
                  href="https://supportourheroes.in/legal-status/"
                  className={styles.dropdownProject}
                >
                  Legal Status
                </Link>
                <Link
                  href="https://supportourheroes.in/tax-exemption-donation-faqs/"
                  className={styles.dropdownProject}
                >
                  Tax Exemption
                  <br />
                  Donation FAQs
                </Link>
              </div>
            </div>
          </li>
          <li className={styles.headerLi}>
            <Link legacyBehavior href="https://supportourheroes.in/our-faqs/">
              <a className={styles.navlink}>Our FAQs</a>
            </Link>
          </li>
          <li className={styles.headerLi}>
            <Link legacyBehavior href="https://supportourheroes.in/contact-us/">
              <a className={styles.navlink}>Contact Us</a>
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.headerBtn}>
        {user && user.role === "FUNDRAISER" ? (
          <>
            <div className={styles.profileimg}>
              <button
                type="button"
                onClick={toggle}
                className={styles.profilebutton}
              >
                <Image
                  src={
                    `${fundraiserCtx?.fundraiser?.profileImage}` == "undefined"
                      ? `${process.env.NEXT_PUBLIC_serverAPI}/fundRaiser/profile-image/${profileImage}`
                      : `${process.env.NEXT_PUBLIC_serverAPI}/fundRaiser/profile-image/${fundraiserCtx?.fundraiser?.profileImage}`
                  }
                  width="40"
                  height="40"
                  alt="profile"
                />
                {!isopen ? (
                  <div className={`${styles["custom-dropdown"]}`}>
                    <div className={`${styles["selcted-option"]}`}>
                      <i className={`fa-solid  fa-angle-up fa-rotate-180`}></i>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={`${styles["custom-dropdown"]}`}>
                      <div className={`${styles["selcted-option"]}`}>
                        <i className={`fa-solid  fa-angle-down`}></i>
                      </div>
                    </div>

                    <ul className={`${styles["dropdown-options"]}`}>
                      <li data-value="option1">
                        <Link
                          href="/fundraiserAdmin"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li data-value="option2">
                        <Link
                          href="/fundraiserAdmin/profile"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          Profile
                        </Link>
                      </li>
                      <li data-value="option3" style={{ color: "red" }}>
                        <a
                          onClick={(e) => handleLogout()}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          Log out
                        </a>
                        <span>
                          <showAlert />
                        </span>
                      </li>
                    </ul>
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button className={styles.innerBtn}>Log in</Button>
            </Link>
            <Link href="/donate">
              <Button className={`${styles.innerBtn} ${styles.filled}`}>
                Donate
              </Button>
            </Link>
          </>
        )}

        <i className={`fa-solid  fa-bars ${styles.headerIcon}`}></i>
      </div>
    </header>
  );
}
