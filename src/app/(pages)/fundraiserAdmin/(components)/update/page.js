"use client";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AsideBar, { TopHeader } from "@/component/fundraiser/fundraiserSidebar";
import styles from "./update.module.css";
import { FundraiserContext } from "@/context/FundraiserContext";
import useAuth from "@/context/auth";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default function Update() {
  const { user } = useAuth("FUNDRAISER");
  const fundraiserCtx = useContext(FundraiserContext);

  const [token, setToken] = useState(null);

  useEffect(() => {
    const data = Cookies.get("token");
    setToken(data);
  }, [Cookies]);

  const [target_amount, setTargetAmount] = useState();
  const [resolution, setResolution] = useState("");
  const [story, setMyStory] = useState("");
  const [money_raised_for, setRaisedFor] = useState("");

  useEffect(() => {
    if (fundraiserCtx.fundraiser_page) {
      const { target_amount, resolution, story, money_raised_for } =
        fundraiserCtx.fundraiser_page;
      setTargetAmount(parseInt(target_amount));
      setResolution(resolution || "");
      setMyStory(story || "");
      setRaisedFor(money_raised_for || "");
    }
  }, [fundraiserCtx.fundraiser_page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        target_amount: parseInt(target_amount),
        resolution,
        story,
        money_raised_for,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_serverAPI}/fundraiser-page/updatePage/${fundraiserCtx.fundraiser_page?.id}`,
        data,
        config
      );
      Swal.fire({
        title: "Done",
        text: "Updated Sucessfully!!",
        icon: "success",
        confirmButtonColor: "#000080",

        confirmButtonText: "Close",
      });
      console.log(res?.data?.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        title: "Ooops!!",
        text: "something went wrong!!",
        icon: "error",
        confirmButtonText: "Close",
        confirmButtonColor: "#000080",
      });
    }
  };

  return user ? (
    <>
      <TopHeader link={`${fundraiserCtx.fundraiser_page?.id}`} />
      <aside className={styles.aside}>
        <AsideBar />

        <div className={styles.rightAside}>
          <h1>Update Fundraiser Page</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.mainCol}>
              <div className={styles.firstCol}>
                <label htmlFor="FundraisingTarget">
                  Fundraising Target (INR)*
                  <br />
                  <input
                    type="number"
                    min="1"
                    value={target_amount}
                    name="FundraisingTarget"
                    className={styles.FundraisingTarget}
                    onChange={(e) => setTargetAmount(e.target.value)}
                  />
                </label>
                <label htmlFor="MyResolution">
                  <span>
                    About My Resolution * <span>Max 350 Characters</span>
                  </span>
                  <textarea
                    spellcheck="false"
                    value={resolution}
                    name="MyResolution"
                    className={styles.MyStory}
                    cols="30"
                    rows="10"
                    onChange={(e) => setResolution(e.target.value)}
                  ></textarea>
                </label>
              </div>
              <div className={styles.secondCol}>
                <label htmlFor="MyStory" className={styles.aboutMe}>
                  <span>
                    My Story * <span>Max 500 Characters</span>
                  </span>
                  <textarea
                    name="MyStory"
                    spellcheck="false"
                    value={story}
                    className={styles.MyStory}
                    cols="30"
                    rows="16"
                    onChange={(e) => setMyStory(e.target.value)}
                  ></textarea>
                </label>
              </div>
            </div>
            <div className={styles.thirdCol}>
              <label htmlFor="MoneyRaised">
                <span>
                  Money Raised For * <span>Max 500 Characters</span>
                </span>
                <textarea
                  spellcheck="false"
                  name="MoneyRaised"
                  value={money_raised_for}
                  className={styles.MoneyRaised}
                  cols="30"
                  rows="5"
                  onChange={(e) => setRaisedFor(e.target.value)}
                ></textarea>
              </label>
            </div>
            <div className={styles.submitButton}>
              <button type="submit" className={styles.formButton}>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </aside>
    </>
  ) : (
    "null"
  );
}
