"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "../styles/frontend/ImageGallery.module.css";

interface ImageGalleryProps {
  images: string[];
  altTitle?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, altTitle = "Car Image" }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Safety check if no images are provided
  if (!images || images.length === 0) {
    return (
      <div className={styles.mainImageWrapper}>
        <Image
          src="/images/placeholder-car.jpg"
          alt="Placeholder"
          fill
          className={styles.mainImage}
        />
      </div>
    );
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className={styles.galleryContainer}>
      {/* Main Image View */}
      <div className={styles.mainImageWrapper}>
        <Image
          src={images[selectedIndex]}
          alt={`${altTitle} - View ${selectedIndex + 1}`}
          fill
          priority
          className={styles.mainImage}
        />

        {/* Navigation Arrows (Only show if > 1 image) */}
        {images.length > 1 && (
          <>
            <button 
              className={`${styles.navButton} ${styles.prevButton}`} 
              onClick={handlePrev}
              aria-label="Previous Image"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className={`${styles.navButton} ${styles.nextButton}`} 
              onClick={handleNext}
              aria-label="Next Image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Counter Badge */}
        <div className={styles.counterBadge}>
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className={styles.thumbnailStrip}>
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => handleThumbnailClick(idx)}
              className={`${styles.thumbnailBtn} ${
                idx === selectedIndex ? styles.activeThumb : styles.inactiveThumb
              }`}
              aria-label={`View image ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className={styles.thumbImage}
                sizes="100px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;