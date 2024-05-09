"use client";

import axios from "axios";
import styles from "@/component/fundraiser.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

export default function page({ params }) {
  const [fundraiser, setFundraiser] = useState({}); // Initialize fundraiser as an empty object
  const fundraiserID = params.id;
  console.log("af", fundraiserID);
  const [activeTab, setActiveTab] = useState("myStory");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };
  const [showPopup, setShowPopup] = useState(false);
  const [shareURL, setShareURL] = useState(""); // URL to share

  const handleShare = (url) => {
    const message = ` ${fundraiser.resolution} ${url}`;
    setShareURL(message);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await axios.get(
          `https://allowing-shiner-needlessly.ngrok-free.app/fundraiser-page/${fundraiserID}`,
          config
        );
        setFundraiser(response.data); // Set the response data to the state
        console.log(response); // Set the response data to the state
      } catch (error) {
        console.error("Error fetching fundraisers:", error);
      }
    };
    fetchData();
  }, []);
  const calculateGoalPercentage = () => {
    const raisedAmount = fundraiser.raised_amount;
    const targetAmount = fundraiser.target_amount;

    if (
      !fundraiser ||
      isNaN(raisedAmount) ||
      isNaN(targetAmount) ||
      fundraiser.target_amount <= 0
    ) {
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
    <>
      <div className={styles.box}>
        <div className={styles.banner}>
          <div className={styles.imgArea}>
            <img
              src="/images/fundraisal.png"
              alt="Indian Military"
              className={styles.mainImage}
              height="100%"
              width="100%"
            />
          </div>
        </div>
        <div className={styles.hero} style={{ width: "100%" }}>
          <div className={styles.mainGoal} style={{ width: "50%" }}>
            <div className={styles.goal}>
              <div className={styles.subGoal}>
                <p className={styles.completeGoal}>
                  {calculateGoalPercentage() || 0}
                </p>
                <h2 className={styles.currentGoal}>
                  &#8377; {fundraiser.raised_amount}
                </h2>
                <p className={styles.completeGoal}>
                  of
                  <span className={styles.totalGoal}>
                    &#8377; {fundraiser.target_amount}
                  </span>
                  Goal
                </p>
              </div>
            </div>
          </div>
          <div className={styles.resolution} style={{ width: "50%" }}>
            <h1 className={styles.resolutionAbout}>About My Resolution</h1>
            <p className={styles.motivation}>
              <br />
              {fundraiser.resolution}
            </p>
            <div className={styles.resolutionBtn}>
              {showPopup && (
                <div className={styles.sharePopupOverlay} onClick={closePopup}>
                  <div
                    className={styles.sharePopup}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3>Share this fundraiser:</h3>
                    <div className={styles.shareToggle}>
                      <FacebookShareButton url={shareURL}>
                        <FaFacebook className={styles.shareIcon} />
                      </FacebookShareButton>
                      <TwitterShareButton url={shareURL}>
                        <FaTwitter className={styles.shareIcon} />
                      </TwitterShareButton>
                      <LinkedinShareButton url={shareURL}>
                        <FaLinkedin className={styles.shareIcon} />
                      </LinkedinShareButton>
                      <WhatsappShareButton url={shareURL}>
                        <FaWhatsapp className={styles.shareIcon} />
                      </WhatsappShareButton>
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
                  <i className={`fa-solid fa-share-nodes`}></i>
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
                  Contribute
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
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
                  src={`https://allowing-shiner-needlessly.ngrok-free.app/fundRaiser/fundraiser-page/${image}`}
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
                    <i
                      className={`fa-sharp fa-solid ${styles.rightTriangle}`}
                    ></i>
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
}
