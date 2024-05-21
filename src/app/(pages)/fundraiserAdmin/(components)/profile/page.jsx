"use client";
import Loading from "@/app/loading";
import { TopHeader } from "@/component/fundraiser/fundraiserSidebar";
import useAuth from "@/context/auth";
import { FundraiserContext } from "@/context/FundraiserContext";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import styles from "./profile.module.css";

export default function Page() {
  const { user } = useAuth("FUNDRAISER");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState(null);
  const [token, setToken] = useState("");
  const [number, setNumber] = useState("");
  const [image, setImage] = useState();
  const [dob, setDOB] = useState(null);
  const [pan, setPan] = useState("");
  const [showAccountDetails, setShowAccountDetails] = useState(true);
  const [imagePreview, setImagePreview] = useState("");
  const fundraiserCtx = useContext(FundraiserContext);
  const [profileImage, setprofileImage] = useState(null);

  useEffect(() => {
    const data = Cookies.get("token");
    setToken(data || "");
    // cookies.set("token", data || "");
  }, [Cookies]);
  useEffect(() => {
    const profile = fundraiserCtx.fundraiser?.profileImage;
    setprofileImage(profile);
  }, [fundraiserCtx.fundraiser]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_serverAPI}/fundRaiser/update`,
        {
          firstName,
          lastName,
          email,
          address,
          state,
          city,
          country,
          pincode,
          number,
          dob,
          pan,
        },
        config
      );
      Swal.fire({
        title: "Updated",
        text: "Updated  Succesfully!!",
        icon: "success",
        confirmButtonText: "Close",
        confirmButtonColor: "#000080",
        confirmButtonColor: "#000080",
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: `${err.response.data.message}`,
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };
  const handleImageUpload = async (e) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      setImage(formData);
      setImagePreview(file);
      setprofileImage(image);
    }
  };

  const handleSubmitImageUpload = async () => {
    if (image) {
      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_serverAPI}/fundRaiser/upload`,
          image,
          config
        );
        Swal.fire({
          title: "upload complete ",
          text: "added!!",
          icon: "success",
          confirmButtonColor: "#000080",

          confirmButtonText: "Close",
        });

        const imageUrl = response?.data?.data?.imageUrl;
        fundraiserCtx.fetchData();
        window.location.reload();
      } catch (err) {
        Swal.fire({
          title: "Opps",
          text: `${err.response.data.message}`,
          icon: "error",
          confirmButtonText: "Close",
          confirmButtonColor: "#000080",
        });
      }
    }
  };

  const reset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setAddress("");
    setState("");
    setCity("");
    setCountry("");
    setPincode("");
    setNumber("");
    setDOB("");
    setPan("");
  };

  useEffect(() => {
    const imgInp = document.getElementById("imgInp");
    const blah = document.getElementById("blah");

    if (imgInp && blah) {
      imgInp.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            blah.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    return () => {
      if (imgInp) {
        imgInp.removeEventListener("change");
      }
    };
  }, []);

  return user ? (
    <>
      <TopHeader link={`${fundraiserCtx.fundraiser?.fundraiser_page?.id}`} />
      <section className={styles.mainSection}>
        <div className={styles.leftSection}>
          <a
            href="#"
            className={styles.sidebarLink}
            onClick={() => setShowAccountDetails(true)}
          >
            <p
              className={`${styles.sideBar} ${
                showAccountDetails ? `${styles.active}` : ""
              }`}
            >
              <i className={`fa-solid fa-user`}></i> Account Details
            </p>
          </a>
          <a
            className={styles.sidebarLink}
            onClick={() => setShowAccountDetails(false)}
          >
            <p
              className={`${styles.sideBar} ${
                !showAccountDetails ? `${styles.active}` : ""
              }`}
            >
              <i className={`fa-regular fa-image`}></i> Upload Profile Photo
            </p>
          </a>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.accountDetails}>
            <h1>
              {showAccountDetails ? "Account Details" : "Upload Profile Photo"}
            </h1>
            {showAccountDetails ? (
              <>
                <form className={styles.form}>
                  <div className={styles.firstpersonalDetail}>
                    <span>
                      <span>First Name</span>
                      <br />
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter your first name"
                        required
                      />
                    </span>
                    <span>
                      <span>Last Name</span>
                      <br />
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter your last name"
                      />
                    </span>
                    <span>
                      <span>Email</span>
                      <br />
                      <input
                        type="email"
                        name="email"
                        disabled
                        value={fundraiserCtx?.fundraiser?.email}
                      />
                    </span>
                  </div>
                  <div className={styles.secondpersonalDetail}>
                    <span>
                      <span>Address</span>
                      <br />
                      <input
                        type="text"
                        name="address"
                        onChange={(e) => setAddress(e.target.value)}
                        id="address"
                        placeholder="Enter your address"
                      />
                    </span>
                    <span>
                      <span>City</span>
                      <br />
                      <input
                        type="text"
                        name="city"
                        id="city"
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter your city"
                      />
                    </span>
                    <span>
                      <span>State</span>
                      <br />
                      <input
                        type="text"
                        name="state"
                        onChange={(e) => setState(e.target.value)}
                        id="state"
                        placeholder="Enter your state"
                      />
                    </span>
                  </div>
                  <div className={styles.thirdpersonalDetail}>
                    <span>
                      <span>Country</span>
                      <br />
                      <input
                        type="text"
                        name="country"
                        id="country"
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Enter your country"
                      />
                    </span>
                    <span>
                      <span>Pincode</span>
                      <br />
                      <input
                        type="text"
                        name="pincode"
                        id="pincode"
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="Enter your pincode"
                      />
                    </span>
                    <span>
                      <span>Mobile Number</span>
                      <br />
                      <input
                        type="number"
                        name="mobileNumber"
                        id="mobileNumber"
                        value={fundraiserCtx?.fundraiser?.mobile_number}
                        placeholder="Enter your mobile no."
                        maxLength="10"
                        onChange={(e) => setNumber(e.target.value)}
                        pattern="[1-9]{1}[0-9]{9}]"
                        required
                      />
                    </span>
                  </div>
                  <div className={styles.fourthpersonalDetail}>
                    <span>
                      <span>DOB</span>
                      <br />
                      <input
                        type="date"
                        name="PANnumber"
                        id="DOB"
                        onChange={(e) => setDOB(e.target.value)}
                        placeholder="Enter your PAN number"
                      />
                    </span>
                    <span>
                      <span>PAN Number</span>
                      <br />
                      <input
                        type="text"
                        onChange={(e) => setPan(e.target.value)}
                        name="PANnumber"
                        id="PANnumber"
                        placeholder="Enter your PAN number"
                      />
                    </span>
                  </div>
                  <div className={styles.formButton}>
                    <Link href="#">
                      <button
                        type="reset"
                        onClick={reset}
                        className={`${styles.fundButton} ${styles.donorButton}`}
                      >
                        Cancel
                      </button>
                    </Link>
                    <button
                      type="submit"
                      onClick={handleUpdate}
                      className={styles.fundButton}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div>
                <Image
                  id="blah"
                  src={
                    profileImage
                      ? `${process.env.NEXT_PUBLIC_serverAPI}/fundraiser/profile-image/${profileImage}`
                      : URL.createObjectURL(imagePreview)
                  }
                  alt="your image"
                  width={225}
                  height={225}
                  style={{ borderRadius: "50%", marginBottom: "1em" }}
                />

                <br />
                <input
                  accept="image/*"
                  type="file"
                  id="imgInp"
                  onChange={(e) => handleImageUpload(e)}
                />

                <button
                  type="submit"
                  onClick={handleSubmitImageUpload}
                  className={styles.fundButton}
                >
                  submit
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  ) : (
    <Loading />
  );
}
