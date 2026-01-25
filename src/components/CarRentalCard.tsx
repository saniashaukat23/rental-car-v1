"use client";
import React from "react";
import { FaUsers, FaCog, FaGasPump, FaPhoneAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { TrendingDown } from "lucide-react"; // Import Lucide icon for badge
import Image from "next/image";
import { useRouter } from "next/navigation";
import { WHATSAPP_URL, PHONE_URL } from "@/src/lib/constants";
import styles from "../styles/frontend/carRentalCard.module.css";
import ImageHoverCarousel from "./ImageHoverCarousel";
import { CarType } from "../types/CarType";

interface CarRentalCardProps {
  car: CarType;
}

const CarRentalCard: React.FC<CarRentalCardProps> = ({ car }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/car/${car._id}`);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const message = `Hi, I am interested in renting the ${car.name}`;
    window.open(WHATSAPP_URL(message), "_blank");
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = PHONE_URL;
  };

  const displayName = car.name
    .replace(new RegExp(`${car.brand}`, "i"), " ")
    .replace(new RegExp(`-`, "i"), "")
    .trim();

  // --- Discount Logic ---
  // Use STORED original price if available, otherwise fallback to estimation
  const isDiscounted = car.applyDiscount || false;
  const oldPrice = isDiscounted
    ? (car.pricing.originalDaily || Math.round(car.pricing.daily * 1.15))
    : null;

  return (
    <div
      className={`${styles.card} ${styles.cursorPointer}`}
      onClick={handleCardClick}
    >
      <div className={styles.imageContainer}>
        {/* Discount Badge */}
        {isDiscounted && (
          <div className={styles.discountBadge}>
            <TrendingDown size={14} />
            <span>Special Offer</span>
          </div>
        )}

        <ImageHoverCarousel images={car.images} alt={car.name} disableOnMobile />
      </div>

      <div className={styles.details}>
        <div className={styles.header}>
          <div className={styles.textGroup}>
            <p className={styles.carName}>{displayName || car.name}</p>
            <p className={styles.category}>
              {car.type} • {car.brand}
            </p>
          </div>
          <div className={styles.logoBox}>
            <Image
              src={`/images/carlogos/${car.brand.toLowerCase().replace(/\s+/g, "")}.webp`}
              className={styles.logoImage}
              height={40}
              width={40}
              alt={car.brand}
            />
          </div>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureItem}>
            <FaUsers className={styles.featureIcon} />
            <span className={styles.featureText}>{car.seats} Seats</span>
          </div>
          <div className={styles.featureItem}>
            <FaCog className={styles.featureIcon} />
            <span className={styles.featureText}>
              {car.transmission?.split(" ")[0] || "Auto"}
            </span>
          </div>
          <div className={styles.featureItem}>
            <FaGasPump className={styles.featureIcon} />
            <span className={styles.featureText}>
              {car.fuel?.split(" ")[0] || "Petrol"}
            </span>
          </div>
        </div>

        <div className={styles.priceActionsContainer}>
          <div className={styles.priceWrapper}>
            {/* Show Old Price if discounted */}
            {isDiscounted && oldPrice && (
              <span className={styles.oldPrice}>
                {car.pricing.currency} {oldPrice.toLocaleString()}
              </span>
            )}

            <div className={styles.newPriceRow}>
              <span className={styles.priceText}>
                {car.pricing.currency} {car.pricing.daily.toLocaleString()}
              </span>
              <span className={styles.priceSub}>/day</span>
            </div>
          </div>

          <div className={styles.actions}>
            <button onClick={handleCall} className={styles.callButton}>
              <FaPhoneAlt className={styles.iconSmall} />
              <span className={styles.buttonTextHidden}>Call</span>
            </button>

            <a
              onClick={handleWhatsApp}
              className={`${styles.whatsappButton} ${styles.noTextDecoration}`}
            >
              <IoLogoWhatsapp className={styles.iconMedium} />
              <span className={styles.buttonTextHidden}>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarRentalCard;
