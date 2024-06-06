"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import styles from "./donationHistory.module.css";
import Sidebar from "@/component/sidebar";
import useAuth from "@/context/auth";
import Loading from "@/app/loading";
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel, MdTimer } from "react-icons/md";
import { renderField, showSwal } from "@/validation";
export default function Page() {
  const user = useAuth(["ADMIN"]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const [filters, setFilters] = useState({
    from_date: null,
    to_date: null,
    donation_id: null,
    payment_option: null,
    payment_status: null,
  });

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
        `${process.env.NEXT_PUBLIC_serverAPI}/admin/donations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: filters,
        }
      );
      setData(response?.data?.data);
      setLoading(false);
      Swal.close();
    } catch (error) {
      setLoading(false);
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
    showSwal("info", "Searching...", "Please wait...", () => fetchData());
  };

  const handleDownload = async () => {
    try {
      showSwal("info", "Downloading...", "Please wait...", null, false);

      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_serverAPI}/admin/donations/download`,
        requestOptions
      );
      Swal.fire({
        title: "Please wait...",
        text: "Your download is in progress.",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

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
      showSwal("error", "Oops", "something went wrong");
    }
  };

  return !user && loading ? (
    <Loading />
  ) : (
    <>
      <section className={styles.section}>
        <Sidebar />
        {user && !loading ? (
          <div className={styles.rightsection}>
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
                    <option value="">Not selected</option>
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
                    <option value="">Not selected</option>
                    <option value="success">Success</option>
                    <option value="failed">Failed</option>
                    <option value="pending">Pending</option>
                  </select>{" "}
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
                    <th>Fundraiser Details</th>
                    <th>Amount</th>
                    <th>Payment Type</th>
                    <th>Payment Status</th>
                    <th>Donor PAN</th>
                    <th>Donor Address</th>
                    <th>Donor City</th>
                    <th>Donor State</th>
                    <th>Donor Country</th>
                    <th>Donor Pincode</th>
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
                      <td>
                        {item.fundraiser?.firstName}
                        <br />
                        {item.fundraiser?.email}
                      </td>
                      <td>{item.amount}</td>
                      <td>{item.payment_type}</td>
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
                      <td>{renderField(item.pan)}</td>
                      <td>{renderField(item.donor_address)}</td>
                      <td>{renderField(item.donor_city)}</td>
                      <td>{renderField(item.donor_state)}</td>
                      <td>{renderField(item.donor_country)}</td>
                      <td>{renderField(item.donor_pincode)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </section>
    </>
  );
}
