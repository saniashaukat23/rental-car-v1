"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/frontend/ImageHoverCarousel.module.css";
type Props = {
  images: string[];
  alt: string;
};

export default function ImageHoverCarousel({ images, alt }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.wrapper} onMouseLeave={() => setActiveIndex(0)}>
      <div className={styles.imageWrapper}>
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
          />
        ))}
      </div>
    </div>
  );
}
