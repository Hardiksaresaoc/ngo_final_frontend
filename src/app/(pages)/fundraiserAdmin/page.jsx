"use client";
import { TopHeader } from "@/component/fundraiser/fundraiserSidebar";
import styles from "./dashboard.module.css";
import AsideBar from "@/component/fundraiser/fundraiserSidebar";
import useAuth from "@/context/auth";
import { useContext } from "react";
import { FundraiserContext } from "@/context/FundraiserContext";
import Loading from "@/app/loading";

export default function Dashboard() {
  const { user } = useAuth("FUNDRAISER");

  const fundraiserCtx = useContext(FundraiserContext);
  return user ? (
    <>
      <TopHeader link={`${fundraiserCtx.fundraiser_page?.id}`} />
      <aside className={styles.aside}>
        <AsideBar />
        {fundraiserCtx ? (
          <div className={styles.rightAside}>
            <div className={styles.upperPortion}>
              <h2>Welcome to your Support our Heroes Account!</h2>
            </div>
            <div className={styles.lowerPortion}>
              <div className={styles.donors}>
                <div className={styles.totalRaise}>
                  <p>
                    <i className={` fa-solid fa-coins`}></i>
                    Total Amount Raised
                  </p>
                  <p className={styles.amtMoney}>
                    &#8377; {fundraiserCtx.total_amount_raised}
                  </p>
                </div>
                <div className={styles.totalDonors}>
                  <p>
                    <i className={`fa-solid fa-hand-holding-heart`}></i>
                    No. of Donors
                  </p>
                  <p className={`${styles["no-donor"]}`}>
                    {fundraiserCtx.total_donations}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </aside>
    </>
  ) : (
    <Loading />
  );
}
