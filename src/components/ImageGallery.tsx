"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "../styles/frontend/ImageGallery.module.css";

interface ImageObject {
  url: string;
  y: number;
  s: number;
}

interface ImageGalleryProps {
  images: ImageObject[];
  altTitle?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, altTitle = "Car Image" }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Extract URLs from image objects
  const imageUrls = images.map((img) => img.url);

  // Safety check if no images are provided
  if (!imageUrls || imageUrls.length === 0) {
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

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swiped left -> Next image
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> Previous image
      handlePrev();
    }

    setTouchStart(null);
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className={styles.galleryContainer}>
      {/* Main Image View */}
      <div
        className={styles.mainImageWrapper}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={imageUrls[selectedIndex]}
          alt={`${altTitle} - View ${selectedIndex + 1}`}
          fill
          priority
          className={styles.mainImage}
        />

        {/* Navigation Arrows (Only show if > 1 image) */}
        {imageUrls.length > 1 && (
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
          {selectedIndex + 1} / {imageUrls.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      {imageUrls.length > 1 && (
        <div className={styles.thumbnailStrip}>
          {imageUrls.map((imgUrl, idx) => (
            <button
              key={idx}
              onClick={() => handleThumbnailClick(idx)}
              className={`${styles.thumbnailBtn} ${idx === selectedIndex ? styles.activeThumb : styles.inactiveThumb
                }`}
              aria-label={`View image ${idx + 1}`}
            >
              <Image
                src={imgUrl}
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