"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import styles from "../styles/frontend/brandSwiper.module.css";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
type BrandLogo = {
  name: string;
  imagePath: string;
};

const brandLogos: BrandLogo[] = [
  { name: "Audi", imagePath: "/images/carLogos/audi.webp" },
  { name: "BMW", imagePath: "/images/carlogos/bmw.webp" },
  { name: "BRABUS", imagePath: "/images/carlogos/brabus.webp" },
  { name: "Bentley", imagePath: "/images/carlogos/bentley.webp" },
  { name: "Cadillac", imagePath: "/images/carlogos/cadillac.webp" },
  { name: "Chevrolet", imagePath: "/images/carlogos/chevrolet.webp" },
  { name: "Corvette", imagePath: "/images/carlogos/corvette.webp" },
  { name: "Ferrari", imagePath: "/images/carlogos/ferrari.webp" },
  { name: "Lamborghini", imagePath: "/images/carlogos/lamborghini.webp" },
  { name: "Mercedes", imagePath: "/images/carlogos/mercedes.webp" },
  { name: "Porsche", imagePath: "/images/carlogos/porsche.webp" },
  { name: "GMC", imagePath: "/images/carlogos/GMC.webp" },
  { name: "Mansory", imagePath: "/images/carlogos/Mansory.webp" },
  { name: "McLaren", imagePath: "/images/carlogos/Mclaren.webp" },
  { name: "Nissan", imagePath: "/images/carlogos/Nissan.webp" },
  { name: "Rolls Royce", imagePath: "/images/carLogos/rollsroyce.webp" },
  { name: "Rox", imagePath: "/images/carlogos/rox.webp" },
  { name: "Jetour", imagePath: "/images/carlogos/Jetour.webp" },
  { name: "Land Rover", imagePath: "/images/carLogos/landrover.webp" },
];

export default function BrandSwiper() {
  const toBrandSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  const handleSwiperInit = (swiper: SwiperType) => {
    // Delay to ensure refs are available
    setTimeout(() => {
      if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean' && swiper.navigation) {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.navigation.destroy();
        swiper.navigation.init();
        swiper.navigation.update();
      }
      if (paginationRef.current && swiper.params.pagination && typeof swiper.params.pagination !== 'boolean' && swiper.pagination) {
        swiper.params.pagination.el = paginationRef.current;
        swiper.pagination.destroy();
        swiper.pagination.init();
        swiper.pagination.render();
        swiper.pagination.update();
      }
    }, 0);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Swiper
          modules={[Navigation, Pagination]}
          loop={true}
          spaceBetween={20}
          slidesPerGroup={3}
          pagination={{
            clickable: true,
            el: paginationRef.current,
          }}
          navigation={{
            nextEl: nextRef.current,
            prevEl: prevRef.current,
          }}
          onSwiper={handleSwiperInit}
          breakpoints={{
            320: { slidesPerView: 3 },
            640: { slidesPerView: 4 },
            768: { slidesPerView: 6 },
            1024: { slidesPerView: 8 },
          }}
        >
          {brandLogos.map((brand, index) => (
            <SwiperSlide key={index}>
              <Link href={`/brands/${toBrandSlug(brand.name)}`}>
                <div className={styles.logoItem}>
                  <div className={styles.logoBox}>
                    <Image
                      src={brand.imagePath}
                      alt={brand.name}
                      className={styles.logoImage}
                      height={100}
                      width={100}
                    />
                  </div>

                  <span
                    className={`${styles.brandName} ${brand.name === "Lamborghini" || brand.name === "Bentley"
                      ? styles.highlightName
                      : ""
                      }`}
                  >
                    {brand.name}
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination dots - visible on mobile */}
        <div ref={paginationRef} className={styles.pagination}></div>

        {/* Custom navigation buttons using SVGs for cleaner look */}
        <button ref={prevRef} className={styles.navBtn}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button ref={nextRef} className={styles.navBtn}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}