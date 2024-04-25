"use client";
import { TopHeader } from "@/component/fundraiser/fundraiserSidebar";
import "./dashboard.css";
import AsideBar from "@/component/fundraiser/fundraiserSidebar";
import useAuth from "@/context/auth";
import { useContext, useEffect, useState } from "react";
import { FundraiserContext } from "@/context/FundraiserContext";

export default function Dashboard() {
  const { user } = useAuth("FUNDRAISER");
  const fundraiserCtx = useContext(FundraiserContext);
  return user ? (
    <>
      <TopHeader link={`${fundraiserCtx.fundraiser_page?.id}`} />
      <aside>
        <AsideBar />
        <div className="rightAside">
          <div className="upperPortion">
            <h2>Welcome to your Support our Heroes Account!</h2>
          </div>
          <div className="lowerPortion">
            <div className="donors">
              <div className="totalRaise">
                <p>
                  <i className="fa-solid fa-coins"></i>Total Amount Raised
                </p>
                <p className="amtMoney">
                  &#8377; {fundraiserCtx.total_amount_raised}
                </p>
              </div>
              <div className="totalDonors">
                <p>
                  <i className="fa-solid fa-hand-holding-heart"></i>No. of
                  Donors
                </p>
                <p className="no-donor">{fundraiserCtx.total_donations}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  ) : (
    ""
  );
}
