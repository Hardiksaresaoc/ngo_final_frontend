"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useCookies } from "react-cookie";
import { usePathname } from "next/navigation";
import "./module.header.css"; // Assuming this imports your custom styles
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import useAuth from "@/context/auth";
import { FundraiserContext } from "@/context/FundraiserContext";

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
        <img
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
              <a className={`navlink ${pathname == "/login" ? "active" : ""}`}>
                Home
              </a>
            </Link>
          </li>
          <li className="dropdownLi">
            <div className="dropdown">
              <button className="dropbtn navlink">
                Projects
                <i className="fa fa-caret-down downIcon"></i>
              </button>
              <div className="dropdown-content">
                <a
                  href="https://supportourheroes.in/project-pithu/"
                  className="dropdownProject"
                >
                  Project PITHU
                </a>
                <a
                  href="https://supportourheroes.in/project-sehat/"
                  className="dropdownProject"
                >
                  Project SEHAT
                </a>
                <a
                  href="https://supportourheroes.in/project-saksham/"
                  className="dropdownProject"
                >
                  Project SAKSHAM
                </a>
                <a
                  href="https://supportourheroes.in/project-sashakt/"
                  className="dropdownProject"
                >
                  Project SASHAKT
                </a>
                <a
                  href="https://supportourheroes.in/project-insaniyat/"
                  className="dropdownProject"
                >
                  Project INSANIYAT
                </a>
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
                <a
                  href="https://supportourheroes.in/vision-mission/"
                  className="dropdownProject"
                >
                  Vission & Mission
                </a>
                <a
                  href="https://supportourheroes.in/team/"
                  className="dropdownProject"
                >
                  Team
                </a>
                <a
                  href="https://supportourheroes.in/letters-of-appreciation/"
                  className="dropdownProject"
                >
                  Letters of
                  <br />
                  Appreciation
                </a>
                <a
                  href="https://supportourheroes.in/legal-status/"
                  className="dropdownProject"
                >
                  Legal Status
                </a>
                <a
                  href="https://supportourheroes.in/tax-exemption-donation-faqs/"
                  className="dropdownProject"
                >
                  Tax Exemption
                  <br />
                  Donation FAQs
                </a>
              </div>
            </div>
          </li>
          <li className="headerLi">
            <Link legacyBehavior href="https://supportourheroes.in/our-faqs/">
              <a className="navlink">Our FAQs</a>
            </Link>
          </li>
          <li className="headerLi">
            <Link legacyBehavior href="https://supportourheroes.in/contact-us/">
              <a className="navlink">Contact Us</a>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="headerBtn">
        {user && user.role === "FUNDRAISER" ? (
          <>
            <div className="profileimg">
              <button type="button" onClick={toggle} className="profilebutton">
                <img
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
                      <li data-value="option1">Dashboard</li>
                      <li data-value="option2">View Profile</li>
                      <li data-value="option3" style={{ color: "red" }}>
                        <a
                          onClick={handleLogout}
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
        ) : user && user.role === "ADMIN" ? (
          <>
            <div className="profileimg">
              <button type="button" onClick={toggle} className="profilebutton">
                <img style={{ background: "grey" }} width="40" height="40" />
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
                        <a
                          onClick={handleLogout}
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
