"use client";
import { useState, useContext, useEffect } from "react";
import AsideBar, { TopHeader } from "@/component/fundraiser/fundraiserSidebar";
import styles from "./photo.module.css";
import { FundraiserContext } from "@/context/FundraiserContext";
import Image from "next/image";
import axios from "axios";
import { Cookies } from "react-cookie";
import Swal from "sweetalert2";
import { FaRegTrashAlt } from "react-icons/fa";
import useAuth from "@/context/auth";
import Loading from "@/app/loading";

export default function Page() {
  const fundraiserCtx = useContext(FundraiserContext);
  const cookies = new Cookies();
  const [token, setToken] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { user } = useAuth("FUNDRAISER");
  const [loading, setLoading] = useState(true);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsSubmitDisabled(false);
  };

  useEffect(() => {
    const data = cookies.get("token");
    setToken(data);
  }, [cookies]);

  useEffect(() => {
    if (fundraiserCtx && fundraiserCtx.fundraiser_page) {
      setLoading(false);
    }
  }, [fundraiserCtx]);

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
          },
        }
      );

      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  useEffect(() => {
    fundraiserCtx;
  }, [fundraiserCtx]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const handleDeleteImage = async (index, image) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_serverAPI}/fundraiser-page/${image}`,
        config
      );
      Swal.fire({
        title: "Deleted Succesfully",
        text: "Done!!",
        icon: "success",
        confirmButtonText: "Close",
      });
      const updatedGallery = [...fundraiserCtx.fundraiser_page.gallery];
      updatedGallery.splice(index, 1); // Remove image at the specified index
      const updatedFundraiserPage = {
        ...fundraiserCtx.fundraiser_page,
        gallery: updatedGallery,
      };
      fundraiserCtx.updateFundraiserPage(updatedFundraiserPage);
    } catch (error) {
      Swal.fire({
        title: "Ooops!!!",
        text: "try again!!",
        icon: "error",
        confirmButtonText: "Close",
      });
      console.error("Error deleting image:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <TopHeader link={fundraiserCtx.fundraiser_page?.id} />
      <aside className={styles.aside}>
        <AsideBar />

        <section className={styles.photowrapper}>
          <div className={styles.imgwrapper}>
            <div className={styles.imgcount}>
              <p>
                {" "}
                Photos ({fundraiserCtx?.fundraiser_page?.gallery?.length || 0})
              </p>
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
                    <FaRegTrashAlt />
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
