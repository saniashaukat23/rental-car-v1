"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
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

  // If no cars are passed, handle gracefully (hide section or show message)
  if (!cars || cars.length === 0) {
    return null; // Or return <div>No cars available</div>
  }

  return (
    <section className={`${styles.sectionContainer} ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <Link
            href={`/our-fleet?type=${category}`}
            className={styles.viewAllLink}
          >
            View all {title} →
          </Link>
        </div>

        <div className="relative group">
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onSwiper={(swiper) => {
              // Delay initialization slightly to ensure refs are bound
              setTimeout(() => {
                if (!prevRef.current || !nextRef.current) return;
                // @ts-ignore
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
            className="pb-8"
          >
            {cars.map((car) => (
              <SwiperSlide key={car._id}>
                <CarRentalCard car={car} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Left Arrow */}
          <div
            ref={prevRef}
            className="absolute z-10 top-1/2 -left-13 hidden lg:flex border-[#E4E4E7] border-2
                       -translate-y-1/2 w-8 h-8  text-black bg-[#ffffffe6] rounded-full
                       shadow-md items-center justify-center cursor-pointer
                        transition-all group-hover:opacity-100"
          >
            <FaArrowLeft size={14} />
          </div>

          {/* Right Arrow */}
          <div
            ref={nextRef}
            className="absolute z-10 top-1/2 -right-13 hidden lg:flex border-[#E4E4E7] border-2
                       -translate-y-1/2 w-8 h-8  text-black bg-[#ffffffe6] rounded-full
                       shadow-md items-center justify-center cursor-pointer
                        transition-all group-hover:opacity-100"
          >
            <FaArrowRight size={14} />
          </div>
        </div>
      </div>
    </section>
  );
}
