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
  const validImages = Array.isArray(images)
    ? images.filter(img => typeof img === 'string' && img.length > 5)
    : [];

  const fallbackImage = "/images/placeholder-car.jpg";
  const displayImages = validImages.length > 0 ? validImages : [fallbackImage];
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

    if (Math.abs(diff) > 50) {
      if (diff > 0) {

        setActiveIndex((prev) => (prev + 1) % displayImages.length);
      } else {

        setActiveIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
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
          key={displayImages[activeIndex]}
          src={displayImages[activeIndex]}
          alt={alt}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      {displayImages.length > 1 && (
        <div className={styles.dots}>
          {displayImages.map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${i === activeIndex ? styles.active : ""
                }`}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={(e) => {
                e.preventDefault();
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