"use client";
import { useState, useContext, useEffect } from "react";
import AsideBar, { TopHeader } from "@/component/fundraiser/fundraiserSidebar";
import "./photo.css";
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
        `https://allowing-shiner-needlessly.ngrok-free.app/fundraiser-page/updatePage/upload/${fundraiserCtx.fundraiser_page?.id}`,
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
        `https://allowing-shiner-needlessly.ngrok-free.app/fundraiser-page/${image}`,
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
      <aside>
        <AsideBar />
        <section className="photowrapper">
          <div className="imgwrapper">
            <div className="imgcount">
              <input type="file" onChange={handleFileChange} />
              <button
                type="button"
                onClick={handleFileUpload}
                disabled={isSubmitDisabled}
              >
                Upload File
              </button>
            </div>
            <div className="row">
              {fundraiserCtx?.fundraiser_page?.gallery?.map((image, index) => (
                <div key={index} className="galleryImage">
                  <Image
                    src={`https://allowing-shiner-needlessly.ngrok-free.app/fundRaiser/fundraiser-page/${image}`}
                    alt={`Image ${index}`}
                    className="galleryImg"
                    height="200"
                    width="200"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(index, image)}
                    className="delete"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </aside>
    </>
  );
}
