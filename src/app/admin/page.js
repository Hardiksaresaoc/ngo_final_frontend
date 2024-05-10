"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import Sidebar from "../../component/sidebar";
import useAuth from "@/context/auth";
import styles from "./admin.module.css";
import Image from "next/image";
import Loading from "../loading";

export default function FundraiserPage() {
  const { user } = useAuth("ADMIN");
  const [allData, setallData] = useState([]);

  const cookies = new Cookies();
  const [token, setToken] = useState();
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const data = cookies.get("token");
    setToken(() => data);
  }, [cookies]);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        return;
      } else
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_serverAPI}/admin/adminDashboard`,
            config
          );
          if (response.status === 200) {
            console.log(response?.data?.data);
            setallData(response?.data?.data);
            setloading(false);
          }
        } catch (error) {
          setError("Error fetching data. Please try again later.");
          console.error("Error while getting data:", error);
        }
    };
    fetchData();
  }, [token]);

  return user && !loading ? (
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
                {/* icon */}
                <p>
                  <span> {allData.totalFundraisers}</span>
                  <span>Total Fundraisers</span>
                </p>
              </div>
              <div className={styles.box}>
                {/* icon */}

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
                  <span>This Month Donation</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    ""
  );
}
