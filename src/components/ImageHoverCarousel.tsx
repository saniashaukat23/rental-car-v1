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

  // Handle empty/undefined images array
  const validImages = images?.filter(img => img && img.trim() !== '') || [];
  const fallbackImage = "/images/placeholder-car.jpg";
  const displayImages = validImages.length > 0 ? validImages : [fallbackImage];

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
            src={displayImages[0]}
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
        setActiveIndex((prev) => (prev + 1) % displayImages.length);
      } else {
        // Swiped right - go to previous image
        setActiveIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
      }
    }

    touchStartX.current = null;
  };

  return (
    // Reset to first image on mouse leave (optional UX choice)
    <div className={styles.wrapper} onMouseLeave={() => setActiveIndex(0)}>
      <div
        className={styles.imageWrapper}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          key={displayImages[activeIndex]} // Force re-render for clean switch
          src={displayImages[activeIndex]}
          alt={alt}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Pagination Dots - Only show if there is more than 1 image */}
      {displayImages.length > 1 && (
        <div className={styles.dots}>
          {displayImages.map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${
                i === activeIndex ? styles.active : ""
              }`}
              // Hover on desktop to switch
              onMouseEnter={() => setActiveIndex(i)}
              // Click to switch (useful for tablet/touch)
              onClick={(e) => {
                e.preventDefault(); // Prevent link navigation if inside <Link>
                e.stopPropagation();
                setActiveIndex(i);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}