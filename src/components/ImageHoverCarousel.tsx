"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/frontend/ImageHoverCarousel.module.css";

interface ImageObject {
  url: string;
  y: number;
  s: number;
}

type Props = {
  images: ImageObject[];
  alt: string;
  disableOnMobile?: boolean;
};

export default function ImageHoverCarousel({ images, alt, disableOnMobile = false }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Filter valid images
  const displayImages = (images || []).filter(img => img.url && img.url.length > 5);

  if (displayImages.length === 0) {
    displayImages.push({ url: "/images/placeholder-car.jpg", y: 50, s: 100 });
  }

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show first image during SSR and before mount to prevent flash
  if (!isMounted) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper}>
          <Image
            src={displayImages[0].url}
            alt={alt}
            fill
            className={styles.image}
            style={{
              objectPosition: `center ${displayImages[0].y}%`,
              transform: `scale(${displayImages[0].s / 100})`
            }}
            priority
            unoptimized
          />
        </div>
      </div>
    );
  }

  if (disableOnMobile && isMobile) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper}>
          <Image
            src={displayImages[0].url}
            alt={alt}
            fill
            className={styles.image}
            style={{
              objectPosition: `center ${displayImages[0].y}%`,
              transform: `scale(${displayImages[0].s / 100})`
            }}
            unoptimized
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
          key={displayImages[activeIndex].url}
          src={displayImages[activeIndex].url}
          alt={alt}
          fill
          className={styles.image}
          style={{
            objectPosition: `center ${displayImages[activeIndex].y}%`,
            transform: `scale(${displayImages[activeIndex].s / 100})`
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
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