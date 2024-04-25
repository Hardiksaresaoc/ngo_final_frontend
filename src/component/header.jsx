"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useCookies } from "react-cookie";
import { usePathname } from "next/navigation";
import "./module.header.css"; // Assuming this imports your custom styles
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { FundraiserContext } from "@/context/FundraiserContext";
import Image from "next/image";

export default function Header({ role, rolename }) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  // console.log(pathname);
  // const user = useAuth(role);
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
    <header className="head">
      <div className="logo">
        <Image
          src="/images/ProjectLogo.png"
          alt="Webpage Logo"
          className="logoImg"
          height="100"
          width="100"
        />
      </div>
      <nav className="headerNav">
        <ul className="headerUL">
          <li className="headerLi">
            <Link legacyBehavior href="/">
              <Link
                className={`navlink ${pathname == "/login" ? "active" : ""}`}
              >
                Home
              </Link>
            </Link>
          </li>
          <li className="dropdownLi">
            <div className="dropdown">
              <button className="dropbtn navlink">
                Projects
                <i className="fa fa-caret-down downIcon"></i>
              </button>
              <div className="dropdown-content">
                <Link
                  href="https://supportourheroes.in/project-pithu/"
                  className="dropdownProject"
                >
                  Project PITHU
                </Link>
                <Link
                  href="https://supportourheroes.in/project-sehat/"
                  className="dropdownProject"
                >
                  Project SEHAT
                </Link>
                <Link
                  href="https://supportourheroes.in/project-saksham/"
                  className="dropdownProject"
                >
                  Project SAKSHAM
                </Link>
                <Link
                  href="https://supportourheroes.in/project-sashakt/"
                  className="dropdownProject"
                >
                  Project SASHAKT
                </Link>
                <Link
                  href="https://supportourheroes.in/project-insaniyat/"
                  className="dropdownProject"
                >
                  Project INSANIYAT
                </Link>
              </div>
            </div>
          </li>
          <li className="dropdownLi">
            <div className="dropdown">
              <button className="dropbtn navlink">
                About Us
                <i className="fa fa-caret-down downIcon"></i>
              </button>
              <div className="dropdown-content">
                <Link
                  href="https://supportourheroes.in/vision-mission/"
                  className="dropdownProject"
                >
                  Vission & Mission
                </Link>
                <Link
                  href="https://supportourheroes.in/team/"
                  className="dropdownProject"
                >
                  Team
                </Link>
                <Link
                  href="https://supportourheroes.in/letters-of-appreciation/"
                  className="dropdownProject"
                >
                  Letters of
                  <br />
                  Appreciation
                </Link>
                <Link
                  href="https://supportourheroes.in/legal-status/"
                  className="dropdownProject"
                >
                  Legal Status
                </Link>
                <Link
                  href="https://supportourheroes.in/tax-exemption-donation-faqs/"
                  className="dropdownProject"
                >
                  Tax Exemption
                  <br />
                  Donation FAQs
                </Link>
              </div>
            </div>
          </li>
          <li className="headerLi">
            <Link legacyBehavior href="https://supportourheroes.in/our-faqs/">
              <Link className="navlink">Our FAQs</Link>
            </Link>
          </li>
          <li className="headerLi">
            <Link legacyBehavior href="https://supportourheroes.in/contact-us/">
              <Link className="navlink">Contact Us</Link>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="headerBtn">
        {user && user.role === "FUNDRAISER" ? (
          <>
            <div className="profileimg">
              <button type="button" onClick={toggle} className="profilebutton">
                <Image
                  src={`https://allowing-shiner-needlessly.ngrok-free.app/fundRaiser/fundraiser-page/${FundraiserContext.fundraiser_image}`}
                  width="40"
                  height="40"
                />
                {!isopen ? (
                  <div className="custom-dropdown">
                    <div className="selected-option">
                      <i className="fa-solid fa-angle-up fa-rotate-180"></i>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="custom-dropdown">
                      <div className="selected-option">
                        <i className="fa-solid fa-angle-down"></i>
                      </div>
                    </div>

                    <ul className="dropdown-options">
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
            <div className="profileimg">
              <button type="button" onClick={toggle} className="profilebutton">
                <Image style={{ background: "grey" }} width="40" height="40" />
                {!isopen ? (
                  <div className="custom-dropdown">
                    <div className="selected-option">
                      <i className="fa-solid fa-angle-up fa-rotate-180"></i>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="custom-dropdown">
                      <div className="selected-option">
                        <i className="fa-solid fa-angle-down"></i>
                      </div>
                    </div>
                    <ul className="dropdown-options">
                      <li data-value="option3" style={{ color: "red" }}>
                        <Link
                          onClick={handleLogout}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          Log out
                        </Link>
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
              <Button className="innerBtn">Log in</Button>
            </Link>
            <Link href="https://supportourheroes.in/donate-now/">
              <Button className="innerBtn filled">Donate</Button>
            </Link>
          </>
        )}

        <i className="fa-solid fa-bars headerIcon"></i>
      </div>
    </header>
  );
}
