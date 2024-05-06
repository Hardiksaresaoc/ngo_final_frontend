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
import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { CiShare2 } from "react-icons/ci";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function page({ params }) {
  const [fundraiser, setFundraiser] = useState({}); // Initialize fundraiser as an empty object
  const fundraiserID = params.id;
  const [activeTab, setActiveTab] = useState("myStory");

  const [Isfundraiser, setIsfundraiser] = useState(false);
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };
  const [showPopup, setShowPopup] = useState(false);
  const [shareURL, setShareURL] = useState(""); // URL to share
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
        setFundraiser(response.data);
        setIsfundraiser(true);
        console.log(response);
      } catch (error) {
        console.error("Error fetching fundraisers:", error);
      }
    };
    fetchData();
  }, []);
  const calculateGoalPercentage = () => {
    const raisedAmount = fundraiser.raised_amount;
    const targetAmount = fundraiser.target_amount;

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

  return (
    //  Isfundraiser ? (
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
          <div className={styles.goal}>
            <div className={styles.subGoal}>
              <p className={styles.completeGoal}>{calculateGoalPercentage()}</p>
              <h2 className={styles.currentGoal}>
                &#8377; {fundraiser.raised_amount}
              </h2>
              <p className={styles.completeGoal}>
                of{" "}
                <span className={styles.totalGoal}>
                  &#8377; {fundraiser.target_amount}
                </span>{" "}
                Goal
              </p>
            </div>
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
                      <div>
                        <button
                          className={styles.clipboard}
                          onClick={(e) => {
                            e.preventDefault(); // Prevent default button behavior
                            if (!copied) {
                              handleCopy();
                            }
                          }}
                        >
                          {copied ? "Copied!" : "Copy to clipboard"}
                        </button>
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
                src={`${process.env.NEXT_PUBLIC_serverAPI}/fundRaiser/fundraiser-page/${fundraiser.profileImage}`}
                alt=""
                width="200"
                height="200"
                className={styles.userImg}
              />
              <p className={styles.fundraiserName}>{""}</p>
            </div>
            <div className={styles.fundraiserDetail}>
              <h1>About My Resolution</h1>
              <p>{fundraiser.resolution}</p>
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
              {fundraiser.story || "No content to show"}
            </p>
            <h3 className={styles.reason}>Money Raised For</h3>
            <p className={styles.aboutMe}>{fundraiser.money_raised_for} </p>
          </div>
        ) : (
          //images
          <div className={styles.leftAside}>
            {fundraiser?.gallery?.map((image, index) => (
              <div key={index} className={styles.galleryImage}>
                <img
                  src={`${process.env.NEXT_PUBLIC_serverAPI}/fundRaiser/fundraiser-page/${image}`}
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
              {fundraiser.supporters && fundraiser.supporters.length > 0 ? (
                fundraiser.supporters.map((supporter, index) => (
                  <p key={index} className={styles.ourSupporters}>
                    <PiHandHeartDuotone />
                    {supporter}
                  </p>
                ))
              ) : (
                <p>No supporters found.</p>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
  // : (
  // <Notfundraiser />
  // );
}
