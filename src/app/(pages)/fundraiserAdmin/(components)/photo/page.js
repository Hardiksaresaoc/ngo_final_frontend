"use client";
import { useState, useContext, useEffect } from "react";
import AsideBar, { TopHeader } from "@/component/fundraiser/fundraiserSidebar";
import styles from "./photo.module.css";
import { FundraiserContext } from "@/context/FundraiserContext";
import Image from "next/image";
import axios from "axios";
import { Cookies } from "react-cookie";

export default function Page() {
  const [fundraiser, setFundraiser] = useState([]);
  const fundraiserCtx = useContext(FundraiserContext);
  const cookies = new Cookies();
  const [token, setToken] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsSubmitDisabled(false); // Enable the submit button when a file is selected
  };
  useEffect(() => {
    const data = cookies.get("token");
    setToken(data);
  }, [cookies]);

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_serverAPI}/fundraiser-page/updatePage/upload/${fundraiserCtx.fundraiser_page?.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      console.log("File uploaded successfully:", response.data);
      // You can handle the response or update the UI as needed
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error (e.g., show error message to user)
    }
  };
  useEffect(() => {
    // Fetch data from context and date state
    setFundraiser(fundraiserCtx.fundraiserData);
  }, [fundraiserCtx.fundraiserData]);
  const config = {
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
    },
  };
  const handleDeleteImage = async (index, image) => {
    try {
      // Make an HTTP DELETE request to delete the image
      await axios.delete(
        `${process.env.NEXT_PUBLIC_serverAPI}/fundraiser-page/${image}`,
        config
      );

      // Update the local state or context after successful deletion
      const updatedGallery = [...fundraiserCtx.fundraiser_page.gallery];
      updatedGallery.splice(index, 1); // Remove the image at the specified index
      const updatedFundraiserPage = {
        ...fundraiserCtx.fundraiser_page,
        gallery: updatedGallery,
      };
      fundraiserCtx.updateFundraiserPage(updatedFundraiserPage);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <>
      <TopHeader link={fundraiserCtx.fundraiser_page?.id} />
      <aside className={styles.aside}>
        <AsideBar />

        <section className={styles.photowrapper}>
          <div className={styles.imgwrapper}>
            <div className={styles.imgcount}>
              <p> photos(21)</p>
            </div>
            <div className={styles.row}>
              {fundraiserCtx?.fundraiser_page?.gallery?.map((image, index) => (
                <div key={index} className={styles.galleryImage}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_serverAPI}/fundRaiser/fundraiser-page/${image}`}
                    alt={`Image ${index}`}
                    className={styles.galleryImg}
                    height="230"
                    width="300"
                  />
                  <a
                    type="button"
                    onClick={() => handleDeleteImage(index, image)}
                    className={styles.delete}
                  >
                    <i className={`fa-solid fa-trash`}></i>
                  </a>
                </div>
              ))}
            </div>
            <div className={styles.upload}>
              <input type="file" onChange={handleFileChange} />
              <button
                type="button"
                onClick={handleFileUpload}
                disabled={isSubmitDisabled}
                style={
                  isSubmitDisabled
                    ? {
                        backgroundColor: "grey",
                        color: "white",
                        borderColor: "white",
                      }
                    : {}
                }
              >
                Upload File
              </button>
            </div>
          </div>
        </section>
      </aside>
    </>
  );
}
