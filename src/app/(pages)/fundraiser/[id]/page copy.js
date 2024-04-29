"use client";

import axios from "axios";
// import "../../../component/module.fundraiser.css";
import "../../../component/module.fundraiser.css";
Image
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

// import Dashboard from "../(fundraiserAdmin)/(components)/dashboard/page";

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
            "ngrok-skip-browser-warning": "true",
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

    if (isNaN(raisedAmount) || isNaN(targetAmount) || targetAmount <= 0) {
      return "--";
    }

    const percentage = (raisedAmount / targetAmount) * 100;

    if (percentage > 100) {
      return "100%+";
    } else {
      return `${Math.round(percentage)}%`;
    }
  };

  return (
    <>
      <div className="box">
        <div className="banner">
          <div className="imgArea">
            <img
              src="/images/fundraisal.png"
              alt="Indian Military"
              className="mainImage"
              height="100%"
              width="100%"
            />
          </div>
        </div>
        <div className="hero" style={{ width: "100%" }}>
          <div className="mainGoal" style={{ width: "50%" }}>
            <div className="goal">
              <div className="subGoal">
                <p className="completeGoal">{calculateGoalPercentage()}</p>
                <h2 className="currentGoal">
                  &#8377; {fundraiser.raised_amount}
                </h2>
                <p className="completeGoal">
                  of{" "}
                  <span className="totalGoal">
                    &#8377; {fundraiser.target_amount}
                  </span>{" "}
                  Goal
                </p>
              </div>
            </div>
          </div>
          <div className="resolution" style={{ width: "50%" }}>
            <h1 className="resolutionAbout">About My Resolution</h1>
            <p className="motivation">
              <br />
              {fundraiser.resolution}
            </p>
            <div className="resolutionBtn">
              {showPopup && (
                <div className="sharePopupOverlay" onClick={closePopup}>
                  <div
                    className="sharePopup"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3>Share this fundraiser:</h3>
                    <div className="shareToggle">
                      <FacebookShareButton url={shareURL}>
                        <FaFacebook className="shareIcon" />
                      </FacebookShareButton>
                      <TwitterShareButton url={shareURL}>
                        <FaTwitter className="shareIcon" />
                      </TwitterShareButton>
                      <LinkedinShareButton url={shareURL}>
                        <FaLinkedin className="shareIcon" />
                      </LinkedinShareButton>
                      <WhatsappShareButton url={shareURL}>
                        <FaWhatsapp className="shareIcon" />
                      </WhatsappShareButton>
                    </div>
                  </div>
                </div>
              )}
              <a className="resolutionLink">
                <button
                  type="button"
                  className="mainbtn"
                  onClick={() => handleShare(window.location.href)}
                  style={{ marginBottom: "20px" }} // Adjust margin bottom to create space for the toggle
                >
                  <i className="fa-solid fa-share-nodes"></i>Share
                </button>
              </a>
              <Link href="#" className="resolutionLink">
                <button type="submit" className="mainbtn filled">
                  Contribute
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <article className="article">
        <button
          type="button"
          // className="userStory active"
          className={`userStory ${activeTab === "myStory" ? "active" : ""}`}
          onClick={() => handleTabChange("myStory")}
        >
          My Story
        </button>
        <button
          type="button"
          // className="userStory active"
          className={`userStory ${activeTab === "gallery" ? "active" : ""}`}
          onClick={() => handleTabChange("gallery")}
        >
          Gallery
        </button>
      </article>
      <aside className="mainAside">
        {activeTab === "myStory" ? (
          <div className="leftAside">
            <p className="aboutMe">
              {fundraiser.story || "No content to show"}
            </p>
            <h3 className="reason">Money Raised For</h3>
            <p className="aboutMe">{fundraiser.money_raised_for} </p>
          </div>
        ) : (
          //images
          <div className="leftAside">
            {fundraiser?.gallery?.map((image, index) => (
              <div key={index} className="galleryImage">
                <Image
                  src={`https://allowing-shiner-needlessly.ngrok-free.app/fundRaiser/fundraiser-page/${image}`}
                  alt={`Image ${image}`}
                  className="galleryImg"
                  height="200"
                  width="200"
                />
              </div>
            ))}
          </div>
        )}
        <div className="rightAside">
          <div className="container">
            <h3 className="supporters">Our Supporters</h3>
            <div className="allSupporters">
              {fundraiser.supporters && fundraiser.supporters.length > 0 ? (
                fundraiser.supporters.map((supporter, index) => (
                  <p key={index} className="ourSupporters">
                    <i className="fa-sharp fa-solid fa-play rightTriangle"></i>
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
