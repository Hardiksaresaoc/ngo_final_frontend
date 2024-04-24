"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./fundraisersAdmin.css";
// import "./module.fundraiser.css";
import "../../../component/module.admin.css";
import "../../../component/module.popupadmin.css";
import useAuth from "@/context/auth";
import Sidebar from "../../../component/sidebar";
export default function FundraiserPage() {
  const [cookies, setCookie] = useCookies(["token"]);
  const { user } = useAuth("ADMIN");

  const [fundraisers, setFundraisers] = useState([]);
  const [error, setError] = useState(null);
  const [active, setactive] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFundraiser, setSelectedFundraiser] = useState(null);

  const [header, setheader] = useState();
  const [formData, setFormData] = useState({
    name: selectedFundraiser?.firstName || "",
    email: selectedFundraiser?.email || "",
    resolution: "",
    story: "",
    money_raised_for: "",
    target_amount: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://allowing-shiner-needlessly.ngrok-free.app/admin/fundraiserPage/updatePage/${selectedFundraiser.fundraiser_page?.id}`,
        formData,
        { headers: header }
      );
      console.log("Update successful:", response.data);
      setShowPopup(false);
    } catch (error) {
      console.error("Error updating fundraiser:", error);
    }
  };
  useEffect(() => {
    if (selectedFundraiser) {
      setFormData({
        name: selectedFundraiser?.firstName || "",
        target_amount: "",
        email: selectedFundraiser?.email || "",
        resolution: "",
        story: "",
        money_raised_for: "",
      });
    }
  }, [selectedFundraiser]);

  useEffect(() => {
    const token = cookies.token;
    const headers = {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
    };
    setheader(headers);
    console.log("f", fundraisers);

    const fetchData = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "https://allowing-shiner-needlessly.ngrok-free.app/admin/fundraiser",
          config
        );
        setFundraisers(response.data);

        console.log(response);
        setFundraisers(response.data);
        // setFundraisers((e)=>console.log(e[0].status)) // Set the response data to the state
      } catch (error) {
        setError("Error fetching fundraisers. Please try again later.");
        console.error("Error fetching fundraisers:", error);
      }
    };
    fetchData();
  }, []);

  return user ? (
    <section>
      <Sidebar />
      <div className="rightSection">
        <div className="rightsubSection">
          <h1>Fundraiser</h1>
          <table className="adminTable">
            <thead>
              <tr>
                <th className="tableHead">Id</th>
                <th className="tableHead">Name</th>
                <th className="tableHead">Email</th>
                <th className="tableHead">Phone Number</th>
                <th className="tableHead">URL</th>
                <th className="tableHead">Status</th>
                <th className="tableHead">Edit</th>
              </tr>
            </thead>
            {fundraisers.length >= 0 ? (
              <tbody>
                {fundraisers?.map((fundraiser) => (
                  <tr key={fundraiser.fundraiser_id}>
                    <td>{fundraiser.f_id}</td>
                    <td>{fundraiser.firstName}</td>
                    <td>{fundraiser.email.toLowerCase()}</td>
                    <td>{fundraiser.mobile_number}</td>
                    <td>
                      http://localhost:3000/fundraiser/
                      {fundraiser.fundraiser_page?.id}
                    </td>
                    <td>
                      <label className="switch">
                        <input
                          type="checkbox"
                          onChange={() => {
                            // Toggle the status locally
                            const updatedStatus = !fundraiser.status;
                            console.log(updatedStatus);
                            // Update the status in the state
                            setFundraisers((prevFundraisers) =>
                              // console.log(prevFundraisers),
                              prevFundraisers.map((item) =>
                                item.id === fundraiser.id
                                  ? { ...item, status: updatedStatus }
                                  : item
                              )
                            );
                            // Make API request to update status
                            console.log("aa", header);
                            axios(
                              {
                                method: "put",
                                url: `https://allowing-shiner-needlessly.ngrok-free.app/admin/fundraiser/status/${fundraiser.fundraiser_id}`,
                                headers: header,
                              }
                              // { status: updatedStatus }
                            );
                          }}
                          defaultChecked={fundraiser.status === "active"}
                        />
                        <span className="slider round"></span>
                      </label>
                    </td>

                    <td>
                      <button
                        onClick={() => {
                          setShowPopup(true);
                          setSelectedFundraiser(fundraiser);
                        }}
                      >
                        <i className="fa-solid fa-pen-to-square editText"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              "error fetching data , try again later"
            )}
          </table>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="hero">
            <h1>Edit Fundraiser Details</h1>
            <div className="fundraiserDetail">
              <span>
                <span>ID</span>
                <br />
                <input
                  type="text"
                  name="fundraiserId"
                  id="fundraiserId"
                  placeholder="Enter your fundraiser Id"
                  value={selectedFundraiser?.fundraiser_page?.id} // Assuming fundraiser_id is the correct property
                  disabled
                />
              </span>
              <span>
                <span>Name</span>
                <br />
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled
                />
              </span>
              <span>
                <span>Email</span>
                <br />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={selectedFundraiser.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  disabled
                />
              </span>

              <span>
                <span>Target Amount</span>
                <br />
                <input
                  type="number"
                  name="target_amount"
                  id="target_amount"
                  placeholder="target_amount"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      target_amount: parseInt(e.target.value, 10),
                    })
                  }
                  value={selectedFundraiser?.fundraiser_page?.target_amount}
                />
              </span>
            </div>
            <div className="thirdfundraiserDetail">
              <span>
                <span>About My Resolution</span>
                <br />
                <textarea
                  name="resolution"
                  id="resolution"
                  cols="30"
                  rows="10"
                  placeholder="Enter about my resolution.."
                  value={formData.resolution}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      resolution: e.target.value,
                    })
                  }
                ></textarea>
              </span>
              <span>
                <span>My Story</span>
                <br />
                <textarea
                  name="story"
                  id="story"
                  cols="30"
                  rows="10"
                  placeholder="Enter my story.."
                  value={formData.story}
                  onChange={(e) =>
                    setFormData({ ...formData, story: e.target.value })
                  }
                ></textarea>
              </span>
            </div>
            <div className="fourthfundraiserDetail">
              <span>
                <span>Money Raised For</span>
                <br />
                <textarea
                  name="money_raised_for"
                  id="money_raised_for"
                  cols="30"
                  rows="10"
                  placeholder="Enter money raised for.."
                  value={formData.money_raised_for}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      money_raised_for: e.target.value,
                    })
                  }
                ></textarea>
              </span>
            </div>
            <div className="formButton">
              <button
                onClick={() => {
                  setShowPopup(false);
                }}
                type="reset"
                className="fundButton donorButton"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="fundButton"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  ) : (
    "loading"
  );
}
