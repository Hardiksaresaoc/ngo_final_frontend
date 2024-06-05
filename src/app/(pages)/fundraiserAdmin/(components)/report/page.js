"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./report.module.css";
import AsideBar, { TopHeader } from "@/component/fundraiser/fundraiserSidebar";
import Cookies from "js-cookie";
import { FundraiserContext } from "@/context/FundraiserContext";
import Swal from "sweetalert2";
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel, MdTimer } from "react-icons/md";

export default function Page() {
  const [data, setData] = useState([]);
  const [token, setToken] = useState();
  const [filters, setFilters] = useState({
    from_date: null,
    to_date: null,
    donation_id: null,
    payment_option: null,
    payment_status: null,
  });

  const fundraiserCtx = useContext(FundraiserContext);

  useEffect(() => {
    const data = Cookies.get("token");
    setToken(data);
  }, [Cookies]);

  useEffect(() => {
    token && fetchData();
  }, [token]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_serverAPI}/fundRaiser/donations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: filters,
        }
      );
      setData(response?.data?.data);
      Swal.close();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  function formatDate(dateString) {
    if (!dateString) {
      return "";
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "";
    }

    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    Swal.fire({
      title: "Searching",
      text: "Please wait...",
      icon: "info",
      showConfirmButton: false,
    });

    fetchData();
  };

  const handleDownload = async () => {
    Swal.fire({
      title: "Downloading",
      text: "Please wait...",
      icon: "info",
      showConfirmButton: false,
    });

    try {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_serverAPI}/fundRaiser/donations/download`,
        requestOptions
      );
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "DonationData.xlsx";
      a.click();
      URL.revokeObjectURL(downloadUrl);
      Swal.close();
    } catch (error) {
      console.error("Error downloading file:", error);
      Swal.fire({
        title: "Opps!",
        text: "something went wrong!!",
        icon: "error",
        confirmButtonColor: "#000080",

        confirmButtonText: "Close",
      });
    }
  };
  const renderField = (field) => (field ? field : "--");

  return (
    <>
      <TopHeader link={`${fundraiserCtx.fundraiser.fundraiser_page?.id}`} />
      <aside className={styles.aside}>
        <AsideBar />

        <div className={styles.rightAside}>
          <h1>Donation Report</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.upperForm}>
              <span className={styles.fromDate}>
                <span>From Date</span>
                <br />
                <input
                  type="date"
                  name="from_date"
                  id="from_date"
                  value={filters.from_date}
                  onChange={handleInputChange}
                />
              </span>
              <span className={styles.toDate}>
                <span>To Date</span>
                <br />
                <input
                  type="date"
                  name="to_date"
                  id="to_date"
                  value={filters.to_date}
                  onChange={handleInputChange}
                />
              </span>
              <span>
                <span>Donation Id</span>
                <br />
                <input
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, "");
                  }}
                  type="text"
                  name="donation_id"
                  id="donation_id"
                  value={filters.donation_id}
                  onChange={handleInputChange}
                />
              </span>
              <span>
                <label htmlFor="payment_option">Payment Option</label>
                <br />
                <select
                  id="payment_option"
                  name="payment_option"
                  onChange={handleInputChange}
                >
                  <option value="" hidden>
                    Select Method
                  </option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </span>
            </div>
            <div className={styles.lowerForm}>
              <p>
                <label htmlFor="payment_status">Payment Status</label>
                <br />
                <select
                  id="payment_status"
                  name="payment_status"
                  onChange={handleInputChange}
                >
                  <option value="" hidden>
                    Select Status
                  </option>
                  <option value="success">Success</option>
                  <option value="failed">Failed</option>
                  <option value="pending">Pending</option>
                </select>
              </p>

              <button type="submit" className={styles.formsearchButton}>
                <i className={`fa-solid fa-magnifying-glass`}></i>
                Search
              </button>
            </div>
          </form>

          <button
            type="button"
            onClick={handleDownload}
            className={styles.downloadExcel}
          >
            <i className={`fa-solid fa-file-excel`}></i> Download Excel
          </button>

          <div className={styles.tableMain}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Donation Id</th>
                  <th>Donation Date</th>
                  <th>Donor Details</th>
                  <th>Amount</th>
                  <th>Donor PAN</th>
                  <th>Donor Address</th>
                  <th>Payment Type</th>
                  <th>Payment Status</th>
                  <th>Donor City</th>
                  <th>Donor State</th>
                  <th>Donor Country</th>
                  <th>Donor Pincode</th>
                  <th>Donor Bank</th>
                  <th>Donor Bank-branch</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item) => (
                  <tr key={item.donation_id_frontend}>
                    <td>{item.donation_id_frontend}</td>
                    <td>{formatDate(item.donation_date)} </td>
                    <td>
                      {item.donor_first_name}
                      <br />
                      {item.donor_email}
                      <br />
                      {item.donor_phone}
                    </td>

                    <td>{renderField(item.amount)}</td>
                    <td>{renderField(item.pan)}</td>
                    <td>{renderField(item.donor_address)}</td>
                    <td>{item.payment_type ? item.payment_type : "--"}</td>
                    <td>
                      {item.payment_status ? (
                        item.payment_status == "success" ? (
                          <FaCircleCheck color="#0FA900" />
                        ) : item.payment_status == "failed" ? (
                          <MdCancel color="red" />
                        ) : (
                          <MdTimer />
                        )
                      ) : (
                        "--"
                      )}
                    </td>
                    <td>{renderField(item.donor_city)}</td>
                    <td>{renderField(item.donor_state)}</td>
                    <td>{renderField(item.donor_country)}</td>
                    <td>{renderField(item.donor_pincode)}</td>
                    <td>{renderField(item.donor_bank_name)}</td>
                    <td>{renderField(item.donor_bank_branch)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </aside>
    </>
  );
}
