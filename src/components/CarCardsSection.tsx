"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CarRentalCard from "./CarRentalCard"; // Ensure this path is correct
import styles from "../styles/frontend/carCardsSection.module.css";
import { CarType } from "../types/CarType";
type CarCardsSectionProps = {
  bgColor?: string;
  title?: string;
  category?: string;
  cars: CarType[]; // cars is now a required prop containing the data
};

export default function CarCardsSection({
  bgColor = "bg-white",
  title = "Convertible",
  category = "convertible",
  cars = [],
}: CarCardsSectionProps) {
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);

  // If no cars are passed, handle gracefully (hide section or show message)
  if (!cars || cars.length === 0) {
    return null; // Or return <div>No cars available</div>
  }

  return (
    <section className={`${styles.sectionContainer} ${bgColor}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <Link
            href={`/our-fleet?type=${category}`}
            className={styles.viewAllLink}
          >
            View all {title} →
          </Link>
        </div>

        <div className={styles.swiperWrapper}>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            slidesPerGroup={1}
            pagination={{
              clickable: true,
              el: paginationRef.current,
            }}
            breakpoints={{
              320: { slidesPerView: 1, slidesPerGroup: 1 },
              640: { slidesPerView: 2, slidesPerGroup: 2 },
              1024: { slidesPerView: 3, slidesPerGroup: 3 },
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onSwiper={(swiper) => {
              // Delay initialization slightly to ensure refs are bound
              setTimeout(() => {
                if (!prevRef.current || !nextRef.current) return;

                // Safety check for navigation
                if (swiper.params.navigation && swiper.navigation) {
                  // @ts-ignore
                  swiper.params.navigation.prevEl = prevRef.current;
                  // @ts-ignore
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.destroy();
                  swiper.navigation.init();
                  swiper.navigation.update();
                }

                // Initialize pagination
                if (paginationRef.current && swiper.params.pagination && swiper.pagination) {
                  // @ts-ignore
                  swiper.params.pagination.el = paginationRef.current;
                  swiper.pagination.destroy();
                  swiper.pagination.init();
                  swiper.pagination.render();
                  swiper.pagination.update();
                }
              });
            }}
            className={styles.swiperContainer}
          >
            {cars.map((car) => (
              <SwiperSlide key={car._id}>
                <CarRentalCard car={car} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Mobile Pagination Dots */}
          <div ref={paginationRef} className={styles.pagination}></div>

          {/* Left Arrow */}
          <div
            ref={prevRef}
            className={`${styles.navArrow} ${styles.navArrowLeft}`}
          >
            <FaArrowLeft size={14} />
          </div>

          {/* Right Arrow */}
          <div
            ref={nextRef}
            className={`${styles.navArrow} ${styles.navArrowRight}`}
          >
            <FaArrowRight size={14} />
          </div>
        </div>
      </div>
    </section>
  );
}
