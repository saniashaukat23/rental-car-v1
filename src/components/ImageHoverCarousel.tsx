"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/frontend/ImageHoverCarousel.module.css";
type Props = {
  images: string[];
  alt: string;
  disableOnMobile?: boolean;
};

export default function ImageHoverCarousel({ images, alt, disableOnMobile = false }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // If disabled on mobile, show static first image
  if (disableOnMobile && isMobile) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper}>
          <Image
            src={images[0]}
            alt={alt}
            fill
            className={styles.image}
          />
        </div>
      </div>
    );
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Swipe threshold of 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped left - go to next image
        setActiveIndex((prev) => (prev + 1) % images.length);
      } else {
        // Swiped right - go to previous image
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    }

    touchStartX.current = null;
  };

  return (
    <div className={styles.wrapper} onMouseLeave={() => setActiveIndex(0)}>
      <div
        className={styles.imageWrapper}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          key={images[activeIndex]} // Keeps the image unmounted/remounted on change
          src={images[activeIndex]}
          alt={alt}
          fill
          className={styles.image}
        />
      </div>

      <div className={styles.dots}>
        {images.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${
              i === activeIndex ? styles.active : ""
            }`}
            onMouseEnter={() => setActiveIndex(i)}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
