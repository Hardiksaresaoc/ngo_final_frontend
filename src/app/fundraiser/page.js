"use client";
import { useState } from "react";
import "../../component/module.fundraiser.css";
import Link from "next/link";
import Image from "next/image";

export default function page() {
  const [fundraiser, setfundraiser] = useState([]);
  // const data = axios.get();
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
                <p className="completeGoal">(50%)</p>
                <h2 className="currentGoal">&#8377; 1,500</h2>
                <p className="completeGoal">
                  of <span className="totalGoal">&#8377; 3,000</span> Goal{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="resolution" style={{ width: "50%" }}>
            <h1 className="resolutionAbout">About My Resolution</h1>
            <p className="motivation">{fundraiser.resolution}</p>
            <div className="resolutionBtn">
              <Link href="#" className="resolutionLink">
                <button type="submit" className="mainbtn">
                  <i className="fa-solid fa-share-nodes"></i>Share
                </button>
              </Link>
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
        <button type="button" className="userStory active">
          My Story
        </button>
        <button type="button" className="userStory">
          Gallery
        </button>
      </article>
      <aside className="mainAside">
        <div className="leftAside">
          <p className="aboutMe">
            Habitant nisl luctus feugiat integer amet sagittis tincidunt. Id ac
            malesuada molestie in etiam ac. Ac erat viverra metus ut augue
            adipiscing ornare vitae. Non consectetur at sit ultrices feugiat sit
            suscipit malesuada. Sit vel vel odio pretium nunc eget habitasse
            dui. Viverra sit suspendisse volutpat et risus. Sit vel vel odio
            pretium nunc eget habitasse dui. Viverra sit suspendisse volutpat et
            risus. Sit vel vel odio pretium nunc eget habitasse dui. Viverra sit
            suspendisse volutpat et risus.
          </p>
          <h3 className="reason">Money Raised For</h3>
          <p className="aboutMe">{fundraiser.money_raised_for}</p>
        </div>
        <div className="leftAside-img"></div>
        <div className="rightAside">
          <div className="container">
            <h3 className="supporters">Our Supporters</h3>
            <div className="allSupporters">
              <p className="ourSupporters">
                <i className="fa-sharp fa-solid fa-play rightTriangle"></i>{" "}
                Jaivik Dharamsingh Pandey
              </p>
              <p className="ourSupporters">
                <i className="fa-sharp fa-solid fa-play rightTriangle"></i>{" "}
                Jaivik Dharamsingh Pandey
              </p>
              <p className="ourSupporters">
                <i className="fa-sharp fa-solid fa-play rightTriangle"></i>{" "}
                Jaivik Dharamsingh Pandey
              </p>
              <p className="ourSupporters">
                <i className="fa-sharp fa-solid fa-play rightTriangle"></i>{" "}
                Jaivik Dharamsingh Pandey
              </p>
              <p className="ourSupporters">
                <i className="fa-sharp fa-solid fa-play rightTriangle"></i>{" "}
                Jaivik Dharamsingh Pandey
              </p>
              <p className="ourSupporters">
                <i className="fa-sharp fa-solid fa-play rightTriangle"></i>{" "}
                Jaivik Dharamsingh Pandey
              </p>
              <p className="ourSupporters">
                <i className="fa-sharp fa-solid fa-play rightTriangle"></i>{" "}
                Jaivik Dharamsingh Pandey
              </p>
              <p className="ourSupporters">
                <i className="fa-sharp fa-solid fa-play rightTriangle"></i>{" "}
                Jaivik Dharamsingh Pandey
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
