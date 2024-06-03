"use client";
import React from "react";
import "./swiper.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Navigation } from "swiper/modules";

let sliderConfig = {
  navigation: true,
  slidesPerView: 3,
  allowTouchMove: true,
  loop: true,
  spaceBetween: 12,
  navigation: {
    nextEl: ".custom-arrow-next-artical",
    prevEl: ".custom-arrow-prev-artical",
  },
};
const MySwiper = ({ image }) => {
  return (
    <Swiper {...sliderConfig} modules={[Navigation]}>
      {image.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image} alt={`Slide ${index + 1}`} />
        </SwiperSlide>
      ))}

      {/* Add more SwiperSlide components as needed */}
      <div className={`custom-arrow-next-artical swiper-button-next `}></div>
      <div className={`custom-arrow-prev-artical swiper-button-prev`}></div>
    </Swiper>
  );
};

export default MySwiper;
export const MySwiperTeamMember = ({ styles, teamData }) => {
  let sliderConfig = {
    navigation: true,
    slidesPerView: 3,
    allowTouchMove: true,
    loop: true,
    spaceBetween: 12,
    navigation: {
      nextEl: ".custom-arrow-next-artical",
      prevEl: ".custom-arrow-prev-artical",
    },
  };
  return (
    <Swiper {...sliderConfig} modules={[Navigation]}>
      {teamData.map((team, index) => (
        <SwiperSlide key={index}>
          <div className={styles.teamMember}>
            <img
              // src="/images/vinod-neb.png"
              src={team.src}
              alt="vinod-neb"
              width="173"
              height="220"
            />
            <div className={styles.teamMemberDetails}>
              <h3 className={styles.memberDetails}>
                {/* Late Wg. Cdr. Vinod Nebb (Retd)<br></br> Vir Chakra & Bar (VrC) */}
                {team.name}
                <br></br>
                {team.award}
              </h3>
              <h4 className={styles.memberDetails}>(patron)</h4>
            </div>
          </div>
          {/* <img src={image} alt={`Slide ${index + 1}`} /> */}
        </SwiperSlide>
      ))}

      <div className={`custom-arrow-next-artical swiper-button-next `}></div>
      <div className={`custom-arrow-prev-artical swiper-button-prev`}></div>
    </Swiper>
  );
};
