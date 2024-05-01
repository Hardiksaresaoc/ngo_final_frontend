"use client";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { usePathname } from "next/navigation";
import styles from "../header.module.css"; // Assuming this imports your custom styles

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
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

  const handleLogout = (e) => {
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
      <div className={styles.TagLine}>Support Our Heroes</div>
      <div className={styles.headerBtn}>
        <div className={styles.profileimg}>
          <button
            type="button"
            onClick={toggle}
            className={styles.profilebutton}
          >
            <Image
              src="/path/to/your/image.png" // Replace with your actual image path
              alt="Profile Image"
              width="40"
              height="40"
            />
            {!isopen ? (
              <div className={styles["custom-dropdown"]}>
                <div className={styles["selcted-option"]}>
                  <i
                    className={`${styles["fa-solid"]} fa-angle-up fa-rotate-180`}
                  ></i>
                </div>
              </div>
            ) : (
              <>
                <div className={styles["custom-dropdown"]}>
                  <div className={styles["selcted-option"]}>
                    <i className={`${styles["fa-solid"]} fa-angle-down`}></i>
                  </div>
                </div>
                <ul className={styles["dropdown-options"]}>
                  <li data-value="option3" style={{ color: "red" }}>
                    <a
                      onClick={(e) => handleLogout()}
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
        <i className={`${styles["fa-solid"]} fa-bars ${styles.headerIcon}`}></i>
      </div>
    </header>
  );
}
