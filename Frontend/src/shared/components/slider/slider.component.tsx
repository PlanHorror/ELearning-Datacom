"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { images } from "../../../../libs/images";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import styles from "./slider.module.scss";

const SliderComponent = () => {
  return (
    <Swiper
      navigation
      pagination={{ type: "bullets" }}
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      className={styles.swiper_container}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} className={styles.swiper_slide_wrapper}>
          <div>
            <Image
              src={image.src}
              alt={image.alt}
              layout="fill"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SliderComponent;
