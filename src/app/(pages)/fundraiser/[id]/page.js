"use client";

import axios from "axios";
import styles from "./fundraiser.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { PiHandHeartDuotone } from "react-icons/pi";
import { BiDonateHeart } from "react-icons/bi";
import { TiTick } from "react-icons/ti";

import {
  FaFacebook,
  FaLinkedin,
  FaRegCopy,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { CiShare2 } from "react-icons/ci";
import "react-circular-progressbar/dist/styles.css";
import Notfundraiser from "@/component/nofundraiser";
import Loading from "@/app/loading";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function page({ params }) {
  const [fundraiser, setFundraiser] = useState(null);
  const fundraiserID = params.id;
  const [activeTab, setActiveTab] = useState("myStory");

  const [Isfundraiser, setIsfundraiser] = useState();
  const [loading, setloading] = useState(false);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };
  const [showPopup, setShowPopup] = useState(false);
  const [shareURL, setShareURL] = useState("");
  const [copied, setCopied] = useState(false);

  const handleShare = (url) => {
    const message = ` ${fundraiser.resolution} ${url}`;
    setShareURL(message);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        };
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_serverAPI}/fundraiser-page/${fundraiserID}`,
          config
        );
        setFundraiser(() => response.data);
        setIsfundraiser(true);
        setloading(false);

        if (response.status == 400) {
          setIsfundraiser(false);
        }
      } catch (error) {
        console.error("Error fetching fundraisers:", error);
        setloading(false);
      }
    };
    fetchData();
  }, []);
  const calculateGoalPercentage = () => {
    const raisedAmount = fundraiser?.fundraiserPage?.raised_amount;
    const targetAmount = fundraiser?.fundraiserPage?.target_amount;

    if (isNaN(raisedAmount) || isNaN(targetAmount) || targetAmount <= 0) {
      return "--";
    }

    const percentage = (raisedAmount / targetAmount) * 100;

    if (percentage > 100) {
      return "100%";
    } else {
      return `${Math.round(percentage)}%`;
    }
  };
  const headers = {
    "ngrok-skip-browser-warning": "true",
  };
  const pathLength = 1152; // Total strokeDasharray length for the progress bar

  const strokeDashoffset =
    ((100 - calculateGoalPercentage()) / 100) * pathLength;

  return loading ? (
    <Loading />
  ) : Isfundraiser ? (
    <>
      <main className={styles.mainClass}>
        <div className={styles.imgArea}>
          <img
            src="/images/HeroImage.png"
            alt="Our Soldier"
            height="400px"
            width="100%"
          />
        </div>
        <div className={styles.contributers}>
          {/* <div style={{ width: "384px", height: "384px" }}></div> */}
          <div className={styles.goal}>
            <svg
              className={styles.CircularProgressbar}
              viewBox="0 0 384 384"
              data-test-id="CircularProgressbar"
            >
              <path
                className={styles["CircularProgressbar-trail"]}
                style={{
                  stroke: "#d6d6d6",
                  strokeLinecap: "butt",
                  transform: "rotate(0.25turn)",
                  transformOrigin: "center center",
                  strokeDasharray: `${pathLength}px ${pathLength}px`,
                  strokeDashoffset: "0px",
                }}
                d="
            M 192,192
            m 0,-184
            a 184,184 0 1 1 0,368
            a 184,184 0 1 1 0,-368
          "
                strokeWidth="16"
                fillOpacity="0"
              />
              <path
                className={styles["CircularProgressbar-path"]}
                style={{
                  stroke: "rgba(62, 152, 199, 0.66)",
                  strokeLinecap: "butt",
                  transition: "strokeDashoffset 0.5s ease 0s",
                  transform: "rotate(0.25turn)",
                  transformOrigin: "center center",
                  strokeDasharray: `${pathLength}px ${pathLength}px`,
                  strokeDashoffset: `${strokeDashoffset}px`,
                }}
                d="
            M 192,192
            m 0,-184
            a 184,184 0 1 1 0,368
            a 184,184 0 1 1 0,-368
          "
                strokeWidth="16"
                fillOpacity="0"
              />
              <text
                className={styles["CircularProgressbar-text"]}
                style={{ fill: "#f88", fontSize: "32px" }}
                textAnchor="start"
                x="20"
                y="200"
              >
                {`${calculateGoalPercentage()}`}
              </text>
              <text
                className={styles["Additional-text"]}
                style={{ fill: "#333", fontSize: "14px" }}
                textAnchor="start"
                fontSize="12em"
                x="22"
                y="240"
              >
                ({`${calculateGoalPercentage()}`}) ₹
                {fundraiser?.fundraiserPage?.raised_amount} of ₹
                {fundraiser?.fundraiserPage?.target_amount} Goal
              </text>
            </svg>
            {/* <div className={styles.subGoal}>
              <p className={styles.completeGoal}>{calculateGoalPercentage()}</p>
              <h2 className={styles.currentGoal}>
                &#8377; {fundraiser?.fundraiserPage?.raised_amount}
              </h2>
              <p className={styles.completeGoal}>
                of{" "}
                <span className={styles.totalGoal}>
                  &#8377; {fundraiser?.fundraiserPage?.target_amount}
                </span>{" "}
                Goal
              </p>
            </div>  */}
            <div className={styles.resolution} style={{ width: "50%" }}>
              <div className={styles.resolutionBtn}>
                {showPopup && (
                  <div
                    className={styles.sharePopupOverlay}
                    onClick={closePopup}
                  >
                    <div
                      className={styles.sharePopup}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h3
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "-30px",
                          fontSize: "32px",
                        }}
                      >
                        Share this fundraiser
                      </h3>
                      <div className={styles.shareToggle}>
                        <FacebookShareButton url={shareURL}>
                          <FaFacebook
                            color="#1877F2"
                            className={styles.shareIcon}
                          />
                        </FacebookShareButton>
                        <TwitterShareButton url={shareURL}>
                          <FaXTwitter className={styles.shareIcon} />
                        </TwitterShareButton>
                        <LinkedinShareButton url={shareURL}>
                          <FaLinkedin
                            color="#0a66c2"
                            className={styles.shareIcon}
                          />
                        </LinkedinShareButton>
                        <WhatsappShareButton url={shareURL}>
                          <FaWhatsapp
                            color="#25D366"
                            className={styles.shareIcon}
                          />
                        </WhatsappShareButton>
                      </div>
                      <div className={styles.clipboard}>
                        <a
                          style={{
                            height: "100%",
                            width: "100%",
                            fontSize: "2em",
                          }}
                          onClick={(e) => {
                            e.preventDefault(); // Prevent default button behavior
                            if (!copied) {
                              handleCopy();
                            }
                          }}
                        >
                          {copied ? <TiTick /> : <FaRegCopy />}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                <a className={styles.resolutionLink}>
                  <button
                    type="button"
                    className={styles.mainbtn}
                    onClick={() => handleShare(window.location.href)}
                    style={{ marginBottom: "20px" }} // Adjust margin bottom to create space for the toggle
                  >
                    <CiShare2 />
                    Share
                  </button>
                </a>
                <Link
                  href={`/fundraiser/${params.id}/donate`}
                  className={styles.resolutionLink}
                >
                  <button
                    type="submit"
                    className={`${styles.mainbtn} ${styles.filled}`} // Combine the CSS classes
                  >
                    <BiDonateHeart />
                    Contribute
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.fundraiserResolution}>
            <div className={styles.fundraiserImg}>
              <Image
                src={`${process.env.NEXT_PUBLIC_serverAPI}/fundRaiser/profile-image/${fundraiser?.profileImage}`}
                alt=""
                width="200"
                height="200"
                className={styles.userImg}
              />
              <p className={styles.fundraiserName}>
                {capitalizeFirstLetter(fundraiser?.firstName)}{" "}
              </p>
            </div>
            <div className={styles.fundraiserDetail}>
              <h1>About My Resolution</h1>
              <p>{fundraiser?.fundraiserPage?.resolution}</p>
            </div>
          </div>
        </div>
      </main>
      <article className={styles.article}>
        <button
          type="button"
          // className={styles.userStory active"
          className={`${styles.userStory} ${
            activeTab === "myStory" ? `${styles.active}` : ""
          }`}
          onClick={() => handleTabChange("myStory")}
        >
          My Story
        </button>
        <button
          type="button"
          // className={styles.userStory active"
          className={`${styles.userStory} ${
            activeTab === "gallery" ? `${styles.active}` : ""
          }`}
          onClick={() => handleTabChange("gallery")}
        >
          Gallery
        </button>
      </article>
      <aside className={styles.mainAside}>
        {activeTab === "myStory" ? (
          <div className={styles.leftAside}>
            <p className={styles.aboutMe}>
              {fundraiser?.fundraiserPage?.story || "No content to show"}
            </p>
            <h3 className={styles.reason}>Money Raised For</h3>
            <p className={styles.aboutMe}>
              {fundraiser?.fundraiserPage?.money_raised_for}{" "}
            </p>
          </div>
        ) : (
          //images
          <div className={styles.leftAside}>
            {fundraiser?.fundraiserPage?.gallery?.map((image, index) => (
              <div key={index} className={styles.galleryImage}>
                <img
                  src={`${process.env.NEXT_PUBLIC_serverAPI_local}/fundRaiser/fundraiser-page/${image}`}
                  loader={({ src }) =>
                    `${src}?headers=${JSON.stringify(headers)}`
                  }
                  alt={`Image ${image}`}
                  className={styles.galleryImg}
                  height="200"
                  width="200"
                />
              </div>
            ))}
          </div>
        )}
        <div className={styles.rightAside}>
          <div className={styles.container}>
            <h3 className={styles.supporters}>Our Supporters</h3>
            <div className={styles.allSupporters}>
              {fundraiser?.fundraiserPage?.supporters &&
              fundraiser?.fundraiserPage?.supporters.length > 0 ? (
                fundraiser?.fundraiserPage?.supporters.map(
                  (supporter, index) => (
                    <p key={index} className={styles.ourSupporters}>
                      <PiHandHeartDuotone fill="#000080" />
                      {capitalizeFirstLetter(supporter)}
                    </p>
                  )
                )
              ) : (
                <p>No supporters found.</p>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  ) : Isfundraiser === false ? (
    <Notfundraiser />
  ) : (
    <Notfundraiser />
  );
}
