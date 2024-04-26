"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useCookies } from "react-cookie";
import { usePathname } from "next/navigation";
import styles from "./header.module.css"; // Assuming this imports your custom styles
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { FundraiserContext } from "@/context/FundraiserContext";
import Image from "next/image";

export default function Header() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  const [isopen, setisopen] = useState(false);
  const toggle = () => {
    setisopen(!isopen);
  };
  useEffect(() => {
    if (cookies.token) {
      const decodedToken = jwtDecode(cookies.token);
      setUser(decodedToken);
    } else {
      setUser(null);
    }
  }, [cookies.token]);

  const handleLogout = () => {
    removeCookie("token");
    router.replace("/login");
  };

  return (
    <header className={styles.head}>
      <div className={styles.logo}>
        <Image
          priority
          src="/images/ProjectLogo.png"
          alt="Webpage Logo"
          className={styles.logoImg}
          height="100"
          width="100"
        />
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
                <i
                  className={`${styles.fa} fa-caret-down ${styles.downIcon}`}
                ></i>
              </button>
              <div className={`${styles["dropdown-content"]}`}>
                {" "}
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
                <i
                  className={`${styles.fa} fa-caret-down ${styles.downIcon}`}
                ></i>
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
                  src={`https://allowing-shiner-needlessly.ngrok-free.app/fundRaiser/fundraiser-page/${FundraiserContext.fundraiser_image}`}
                  width="40"
                  height="40"
                />
                {!isopen ? (
                  <div className={`${styles["custom-dropdown"]}`}>
                    <div className={`${styles["selcted-option"]}`}>
                      <i
                        className={`${styles["fa-solid"]} fa-angle-up fa-rotate-180`}
                      ></i>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={`${styles["custom-dropdown"]}`}>
                      <div className={`${styles["selcted-option"]}`}>
                        <i
                          className={`${styles["fa-solid"]} fa-angle-down`}
                        ></i>
                      </div>
                    </div>

                    <ul className={`${styles["dropdown-options"]}`}>
                      <li data-value="option1">
                        {" "}
                        <Link
                          href="/logout"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li data-value="option2">
                        {" "}
                        <Link
                          href="/logout"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          Profile
                        </Link>
                      </li>
                      <li data-value="option3" style={{ color: "red" }}>
                        <span
                          onClick={() => handleLogout()}
                          // href="/logout"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          Log out
                        </span>
                      </li>
                    </ul>
                  </>
                )}
              </button>
            </div>
          </>
        ) : user && user.role === "ADMIN" ? (
          <>
            <div className={styles.profileimg}>
              <button
                type="button"
                onClick={toggle}
                className={styles.profilebutton}
              >
                <Image
                  src="/"
                  alt
                  style={{ background: "grey" }}
                  width="40"
                  height="40"
                />
                {!isopen ? (
                  <div className={`${styles["custom-dropdown"]}`}>
                    <div className={`${styles["selcted-option"]}`}>
                      <i
                        className={`${styles["fa-solid"]} fa-angle-up fa-rotate-180`}
                      ></i>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={`${styles["custom-dropdown"]}`}>
                      <div className={`${styles["selcted-option"]}`}>
                        <i
                          className={`${styles["fa-solid"]} fa-angle-down`}
                        ></i>
                      </div>
                    </div>
                    <ul className={`${styles["dropdown-options"]}`}>
                      <li data-value="option3" style={{ color: "red" }}>
                        <a
                          onClick={() => handleLogout()}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          Log out
                        </a>
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
            <Link href="https://supportourheroes.in/donate-now/">
              <Button className={`${styles.innerBtn} ${styles.filled}`}>
                Donate
              </Button>
            </Link>
          </>
        )}

        <i className={`${styles["fa-solid"]} fa-bars ${styles.headerIcon}`}></i>
      </div>
    </header>
  );
}
