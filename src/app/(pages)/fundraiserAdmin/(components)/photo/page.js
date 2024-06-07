// "use client";
// import { useState, useContext, useEffect, useRef } from "react";
// import AsideBar, { TopHeader } from "@/component/fundraiser/fundraiserSidebar";
// import styles from "./photo.module.css";
// import { FundraiserContext } from "@/context/FundraiserContext";
// import Image from "next/image";
// import axios from "axios";
// import Cookies from "js-cookie";
// import Swal from "sweetalert2";
// import { FaRegTrashAlt } from "react-icons/fa";
// import useAuth from "@/context/auth";
// import Loading from "@/app/loading";

// export default function Page() {
//   const fundraiserCtx = useContext(FundraiserContext);
//   const [token, setToken] = useState();
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//   const { user } = useAuth("FUNDRAISER");
//   const [previewURL, setPreviewURL] = useState("");
//   const fileInputRef = useRef(null);

//   const [loading, setLoading] = useState(true);
//    const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedFile(file);
//     setIsSubmitDisabled(false);

//      const reader = new FileReader();
//     reader.onloadend = () => {
//       Swal.fire({
//         html: "<img src='" + reader.result + "' style='width:150px;'>",
//         showCancelButton: true,
//         confirmButtonColor: "#000080",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Upload",
//       }).then((result) => {
//         if (result.isConfirmed) {
//           handleFileUpload(file);
//         }
//       });
//       setPreviewURL(reader.result);
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   useEffect(() => {
//     const data = Cookies.get("token");
//     setToken(data);
//   }, []);

//   useEffect(() => {
//     if (fundraiserCtx.fundraiser && fundraiserCtx.fundraiser.fundraiser_page) {
//       setLoading(false);
//     }
//   }, [fundraiserCtx.fundraiser]);

//   const handleFileUpload = async (file) => {
//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       Swal.fire({
//         title: "Uploading",
//         text: "Please wait...",
//         icon: "info",
//         showConfirmButton: false,
//       });

//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_serverAPI}/fundraiser-page/updatePage/upload/${fundraiserCtx.fundraiser.fundraiser_page?.id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // Reset selected file and preview after successful upload
//       setSelectedFile(null);
//       setPreviewURL("");
//       setIsSubmitDisabled(true);
//       Swal.close();

//       Swal.fire({
//         title: "Done!!",
//         text: "File uploaded Successfully",
//         icon: "success",
//         confirmButtonText: "Close",
//       });
//       fundraiserCtx.fetchData();
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       Swal.fire({
//         title: "Error",
//         text: `Only .png, .jpeg and .jpg files are allowed`,
//         icon: "error",
//         confirmButtonText: "Close",
//       });
//     }
//   };
//   useEffect(() => {
//     fundraiserCtx.fundraiser;
//   }, [fundraiserCtx.fundraiser]);

//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const handleDeleteImage = async (index, image) => {
//     try {
//       Swal.fire({
//         title: "Deleting",
//         text: "Please wait...",
//         icon: "info",
//         showConfirmButton: false,
//       });

//       const response = await axios.delete(
//         `${process.env.NEXT_PUBLIC_serverAPI}/fundraiser-page/${image}`,
//         config
//       );
//        if (response.status == 200 || response.status == 201) {
//         Swal.fire({
//           title: "Deleted Succesfully",
//           text: "Done!!",
//           icon: "success",
//           confirmButtonText: "Close",
//         });
//         fundraiserCtx.fetchData();
//       }
//     } catch (error) {
//       Swal.fire({
//         title: "Ooops!!!",
//         text: "try again!!",
//         icon: "error",
//         confirmButtonText: "Close",
//       });
//       console.error("Error deleting image:", error);
//     }
//   };

//   return !user && loading ? (
//     <Loading />
//   ) : (
//     <>
//       <TopHeader link={fundraiserCtx.fundraiser.fundraiser_page?.id} />
//       <aside className={styles.aside}>
//         <AsideBar />
//         {!loading ? (
//           <section className={styles.photowrapper}>
//             <div className={styles.imgwrapper}>
//               <div className={styles.imgcount}>
//                 <div className={styles.uploadAndText}>
//                   <p>
//                     {" "}
//                     Photos (
//                     {fundraiserCtx?.fundraiser?.fundraiser_page?.gallery
//                       ?.length || 0}
//                     )
//                   </p>
//                   <div className={styles.upload}>
//                     <input
//                       accept="image/jpg,image/jpeg,image/png"
//                       type="file"
//                       onChange={handleFileChange}
//                       style={{ display: "none" }}
//                       ref={fileInputRef}
//                     />
//                     <button
//                       onClick={() => fileInputRef.current.click()}
//                       className={styles.previewPhoto}
//                     >
//                       <img src="/images/uploadPreview.png" />
//                       <span>Upload Photo</span>{" "}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <div className={styles.row}>
//                 {fundraiserCtx.fundraiser?.fundraiser_page?.gallery?.map(
//                   (image, index) => (
//                     <div key={index} className={styles.galleryImage}>
//                       <Image
//                         src={`${process.env.NEXT_PUBLIC_serverAPI}/fundRaiser/fundraiser-page/${image}`}
//                         alt={`Image ${index}`}
//                         className={styles.galleryImg}
//                         height="230"
//                         width="300"
//                       />
//                       <a
//                         type="button"
//                         onClick={() => handleDeleteImage(index, image)}
//                         className={styles.delete}
//                       >
//                         <FaRegTrashAlt />
//                       </a>
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>
//           </section>
//         ) : (
//           <Loading />
//         )}
//       </aside>
//     </>
//   );
// }
"use client";
import { useState, useContext, useEffect, useRef } from "react";
import AsideBar, { TopHeader } from "@/component/fundraiser/fundraiserSidebar";
import styles from "./photo.module.css";
import { FundraiserContext } from "@/context/FundraiserContext";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { FaRegTrashAlt } from "react-icons/fa";
import useAuth from "@/context/auth";
import Loading from "@/app/loading";
import { showSwal } from "@/validation";

export default function Page() {
  const fundraiserCtx = useContext(FundraiserContext);
  const [token, setToken] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { user } = useAuth("FUNDRAISER");
  const [previewURL, setPreviewURL] = useState("");
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setIsSubmitDisabled(false);

    const reader = new FileReader();
    reader.onloadend = () => {
      Swal.fire({
        html: "<img src='" + reader.result + "' style='width:150px;'>",
        showCancelButton: true,
        confirmButtonColor: "#000080",
        cancelButtonColor: "#d33",
        confirmButtonText: "Upload",
      }).then((result) => {
        if (result.isConfirmed) {
          handleFileUpload(file);
        }
      });
      setPreviewURL(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const data = Cookies.get("token");
    setToken(data);
  }, []);

  useEffect(() => {
    if (fundraiserCtx.fundraiser && fundraiserCtx.fundraiser.fundraiser_page) {
      setLoading(false);
    }
  }, [fundraiserCtx.fundraiser]);

  useEffect(() => {
    fetchGalleryImages(currentPage);
  }, [currentPage, fundraiserCtx.fundraiser]);

  const fetchGalleryImages = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_serverAPI}/fundraiser-page/gallery/${fundraiserCtx.fundraiser.fundraiser_page?.id}?page=${page}&limit=${imagesPerPage}`
      );
      fundraiserCtx.setGalleryImages(response.data.images);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      showSwal("info", "Uploading image", "Please wait...", null, false);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_serverAPI}/fundraiser-page/updatePage/upload/${fundraiserCtx.fundraiser.fundraiser_page?.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedFile(null);
      setPreviewURL("");
      setIsSubmitDisabled(true);
      showSwal("success", "uploaded", "Image Uploaded Succesfully");

      fetchGalleryImages(currentPage);
    } catch (error) {
      console.error("Error uploading file:", error);
      showSwal(
        "error",
        "File type Can't be accepted",
        "Only .png, .jpeg and .jpg files are allowed"
      );
    }
  };
  const handleDeleteImage = async (index, image) => {
    try {
      showSwal("info", "Deleting image", "Please wait...", null, false);

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_serverAPI}/fundraiser-page/${image}`,
        config
      );
      if (response.status == 200 || response.status == 201) {
        showSwal("success", "Deleted", "Image Deleted Successfully");

        fetchGalleryImages(currentPage);
      }
    } catch (error) {
      showSwal("error", "error!", "Try Again");

      console.error("Error deleting image:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return !user && loading ? (
    <Loading />
  ) : (
    <>
      <TopHeader link={fundraiserCtx.fundraiser.fundraiser_page?.id} />
      <aside className={styles.aside}>
        <AsideBar />
        {!loading ? (
          <section className={styles.photowrapper}>
            <div className={styles.imgwrapper}>
              <div className={styles.imgcount}>
                <div className={styles.uploadAndText}>
                  <p>
                    {" "}
                    Photos (
                    {fundraiserCtx?.fundraiser?.fundraiser_page?.gallery
                      ?.length || 0}
                    )
                  </p>
                  <div className={styles.upload}>
                    <input
                      accept="image/jpg,image/jpeg,image/png"
                      type="file"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      ref={fileInputRef}
                    />
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className={styles.previewPhoto}
                    >
                      <img src="/images/uploadPreview.png" />
                      <span>Upload Photo</span>{" "}
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                {fundraiserCtx.fundraiser?.fundraiser_page?.gallery?.map(
                  (image, index) => (
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
                  )
                )}
              </div>
              <div className={styles.pagination}>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`${styles.pageButton} ${
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
      </aside>
    </>
  );
}
