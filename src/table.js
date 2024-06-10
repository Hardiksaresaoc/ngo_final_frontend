import React, { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel, MdTimer } from "react-icons/md";
import { renderField } from "./validation";

export function Table({ data, styles, formatDate }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // Adjust this value to change the number of rows per page

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <div className={styles.tableContainer}>
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
            {currentRows.map((item) => (
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
                  {item.fundraiser ? item.fundraiser.firstName : "--"}
                  <br />
                  {item.fundraiser?.email}
                </td>
                <td>{item.amount}</td>
                <td>{item.payment_type}</td>
                <td>
                  {item.payment_status ? (
                    item.payment_status === "success" ? (
                      <FaCircleCheck color="#0FA900" />
                    ) : item.payment_status === "failed" ? (
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
      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
}
export function FundraiserTable({ styles, data, formatDate }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
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
            {currentRows?.map((item) => (
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
      {data.length > 0 ? (
        <div className={styles.pagination}>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
