"use client";
import { useState, useContext, useEffect, useRef } from "react";
import AsideBar, { TopHeader } from "@/component/fundraiser/fundraiserSidebar";
import styles from "./photo.module.css";
import { FundraiserContext } from "@/context/FundraiserContext";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";
import { FaRegTrashAlt } from "react-icons/fa";
import useAuth from "@/context/auth";
import Loading from "@/app/loading";
import Modal from "react-modal";
import { showSwal } from "@/validation";
import Swal from "sweetalert2";

export default function Page() {
  const fundraiserCtx = useContext(FundraiserContext);
  const [token, setToken] = useState();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { user } = useAuth("FUNDRAISER");
  const [previewURLs, setPreviewURLs] = useState([]);
  const fileInputRef = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    setIsSubmitDisabled(files.length === 0);

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewURLs(urls);
    setModalIsOpen(true);
  };

  useEffect(() => {
    const data = Cookies.get("token");
    setToken(data);
  }, []);

  useEffect(() => {
    if (
      fundraiserCtx?.fundraiser &&
      fundraiserCtx?.fundraiser?.fundraiser?.fundraiser_page
    ) {
      setLoading(false);
    }
  }, [fundraiserCtx.fundraiser]);

  // useEffect(() => {
  //   fundraiserCtx.fetchData();
  // }, [currentPage, fundraiserCtx.fundraiser]);

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });
      showSwal("info", "Uploading images", "Please wait...");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_serverAPI}/fundraiser-page/updatePage/upload/${fundraiserCtx.fundraiser.fundraiser.fundraiser_page?.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedFiles([]);
      setPreviewURLs([]);
      setIsSubmitDisabled(true);
      showSwal("success", "Uploaded", "Images Uploaded Successfully");
      fundraiserCtx.fetchData();

      // fetchGalleryImages(currentPage);
    } catch (error) {
      console.error("Error uploading files:", error);
      showSwal(
        "error",
        "File type Can't be accepted",
        "Only .png, .jpeg and .jpg files are allowed"
      );
    } finally {
      setModalIsOpen(false);
    }
  };

  const handleDeleteImage = async (index, image) => {
    try {
      showSwal("info", "Deleting image", "Please wait...", null, false);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_serverAPI}/fundraiser-page/${image}`,
        config
      );
      if (response.status == 200 || response.status == 201) {
        showSwal("success", "Deleted", "Image Deleted Successfully");
        fundraiserCtx.fetchData();

        // fetchGalleryImages(currentPage);
      }
    } catch (error) {
      showSwal("error", "error!", "Try Again");

      console.error("Error deleting image:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const openModal = (image) => {
    setModalImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return !user && loading ? (
    <Loading />
  ) : (
    <>
      <TopHeader
        link={fundraiserCtx.fundraiser?.fundraiser?.fundraiser_page?.id}
      />
      <aside className={styles.aside}>
        <AsideBar />
        {!loading ? (
          <section className={styles.photowrapper}>
            <div className={styles.imgwrapper}>
              <div className={styles.imgcount}>
                <div className={styles.uploadAndText}>
                  <p>
                    {" "}
                    Photos ({fundraiserCtx?.fundraiser?.gallery?.length || 0})
                  </p>
                  <div className={styles.upload}>
                    <input
                      accept="image/jpg,image/jpeg,image/png"
                      type="file"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      ref={fileInputRef}
                      multiple
                    />
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className={styles.previewPhoto}
                    >
                      <img src="/images/uploadPreview.png" />
                      <span>Upload Photos</span>{" "}
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                {fundraiserCtx.fundraiser?.gallery?.map((image, index) => (
                  <div key={index} className={styles.galleryImage}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_serverAPI}/fundRaiser/fundraiser-page/${image.image_url}`}
                      alt={`Image ${index}`}
                      className={styles.galleryImg}
                      height="230"
                      width="300"
                      unoptimized={false}
                      onClick={() => {
                        Swal.fire({
                          imageUrl:
                            `${process.env.NEXT_PUBLIC_serverAPI}/fundRaiser/fundraiser-page/${image.image_url}` ? (
                              `${process.env.NEXT_PUBLIC_serverAPI}/fundRaiser/fundraiser-page/${image.image_url}`
                            ) : (
                              <Loading />
                            ),
                          imageHeight: 1000,
                          imageWidth: 2000,
                          imageAlt: "A tall image",
                          showCloseButton: true,
                        });
                      }}
                      // onClick={() => openModal(image)}
                    />
                    <a
                      type="button"
                      onClick={() => handleDeleteImage(index, image.image_url)}
                      className={styles.delete}
                    >
                      <FaRegTrashAlt />
                    </a>
                  </div>
                ))}
              </div>
              <div className={styles.pagination}>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`${styles.paginationButton} ${
                      currentPage === i + 1 ? styles.active : ""
                    }`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <Loading />
        )}
      </aside>{" "}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div className={styles.modalContent}>
          {previewURLs.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Selected image ${index}`}
              className={styles.modalImage}
            />
          ))}
          <button
            onClick={handleFileUpload}
            className={styles.uploadButton}
            disabled={isSubmitDisabled}
          >
            Upload All
          </button>
          <button onClick={closeModal} className={styles.closeModal}>
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}
