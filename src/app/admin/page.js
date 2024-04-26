"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import Sidebar from "../../component/sidebar";
import useAuth from "@/context/auth";
import styles from "./admin.module.css";
import Image from "next/image";

export default function FundraiserPage() {
  const { user } = useAuth("ADMIN");
  const [allData, setallData] = useState([]);

  const cookies = new Cookies();
  const [token, setToken] = useState();
  const [error, setError] = useState(null);
  const [currentDate] = useState(new Date());
  useEffect(() => {
    const data = cookies.get("token");
    setToken(data);
  }, [cookies]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        };
        ///ngrok
        const response = await axios.get(
          "https://allowing-shiner-needlessly.ngrok-free.app/admin/adminDashboard",
          config
        );

        console.log(response.data);
        setallData(response.data);
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        console.error("Error while getting data:", error);
      }
    };
    fetchData();
  }, [token]);

  return user ? (
    <>
      <section className={styles.section}>
        <Sidebar />
        <div className={styles.rightwrapper}>
          <div className={styles.rightmain}>
            <div className={styles.mainbox}>
              <div className={styles.box}>
                <Image src="/images/coins-hand.svg" width={58} height={58} />
                <p>
                  <span> &#8377; {allData.totalDonations}/-</span>
                  <span>Total Donation</span>
                </p>
              </div>
              <div className={`${styles.box} ${styles.secend}`}>
                <img src="/images/Icon.svg" />
                <p>
                  <span> {allData.totalFundraisers}</span>
                  <span>Total Fundraisers</span>
                </p>
              </div>
              <div className={styles.box}>
                <img src="/images/Icon.svg" />
                <p>
                  <span>{allData.activeFundraisers}</span>
                  <span>Active Fundraisers</span>
                </p>
              </div>
              <div className={`${styles.box} ${styles.secend}`}>
                <img src="/images/coins-03.svg" />
                <p>
                  <span> &#8377; {allData.todayDonations}/-</span>
                  <span>Today’s Donation</span>
                </p>
              </div>
              <div className={styles.box}>
                <img src="/images/coins-03.svg" />
                <p>
                  <span> &#8377; {allData.thisMonthDonations}/-</span>
                  <span>Last Month Donation</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    "loading"
  );
}
