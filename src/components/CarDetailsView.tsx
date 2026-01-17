"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  Users,
  Settings,
  Fuel,
  DoorOpen,
  Cog,
  Gauge,
  Check,
  MapPin,
  Shield,
  Truck,
  CreditCard,
  Phone,
  MessageCircle,
  TrendingDown,
} from "lucide-react";
import styles from "../styles/frontend/carDetails.module.css";
import { CarType } from "../types/CarType";
import ImageHoverCarousel from "./ImageHoverCarousel";

interface CarDetailsViewProps {
  // Allow car to be null or undefined safely
  car: CarType | null | undefined;
}

const CarDetailsView: React.FC<CarDetailsViewProps> = ({ car }) => {
  // --- 1. SAFE CALCULATION LOGIC ---
  // Notice the ?. symbol. This prevents the crash.
  const isDiscounted = car?.applyDiscount;

  // Safely access pricing. If pricing is missing, default to 0.
  const dailyPrice = car?.pricing?.daily || 0;

  // Calculate specific prices based on the safe dailyPrice
  const currentWeekly = car?.pricing?.weekly || dailyPrice * 7 * 0.9;
  const currentMonthly = car?.pricing?.monthly || dailyPrice * 30 * 0.8;

  const originalDaily = isDiscounted
    ? car?.pricing?.originalDaily || Math.round(dailyPrice * 1.15)
    : undefined;
  const originalWeekly = isDiscounted
    ? car?.pricing?.originalWeekly || Math.round(currentWeekly * 1.15)
    : undefined;
  const originalMonthly = isDiscounted
    ? car?.pricing?.originalMonthly || Math.round(currentMonthly * 1.15)
    : undefined;

  // --- 2. LOADING/ERROR STATE ---
  // If car is totally missing, show this UI instead of crashing
  if (!car) {
    return (
      <div
        className={styles.container}
        style={{ textAlign: "center", padding: "4rem" }}
      >
        <h2 className="text-xl font-bold">Car not found</h2>
        <p className="text-gray-500 mb-4">
          We could not load the details for this vehicle.
        </p>
        <Link href="/cars" className="px-4 py-2 bg-black text-white rounded">
          Back to Fleet
        </Link>
      </div>
    );
  }

  return (
    <main className={styles.container}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>
          Home
        </Link>
        <span>/</span>
        <Link href="/cars" className={styles.breadcrumbLink}>
          Cars
        </Link>
        <span>/</span>
        {/* Safe Access */}
        <span style={{ color: "#000" }}>{car?.name}</span>
      </nav>

      {/* Header */}
      <div className={styles.headerSection}>
        <h1 className={styles.title}>
          {car?.name} {car?.year}
        </h1>
        <div className={styles.badges}>
          {isDiscounted && (
            <div
              className={styles.badge}
              style={{
                borderColor: "#f97316",
                color: "#f97316",
                background: "#f9741625",
              }}
            >
              <TrendingDown size={16} />
              <span>Special Offer</span>
            </div>
          )}
          <div className={styles.badge}>
            <Zap size={16} className="text-orange-500" fill="orange" />
            <span>{car?.type}</span>
          </div>
          <div className={styles.badge}>
            <div
              className={styles.colorDot}
              style={{ backgroundColor: car?.color?.toLowerCase() || "#ccc" }}
            />
            <span>{car?.color}</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className={styles.mainGrid}>
        {/* Image Carousel */}
        {car?.images && car.images.length > 0 ? (
          <div className={styles.imageContainer}>
            <ImageHoverCarousel
              images={car.images}
              alt={car?.name || "Car Image"}
            />
          </div>
        ) : (
          <div className={styles.imageContainer}>
            <Image
              src="/images/placeholder-car.jpg"
              alt={car?.name || "Car Image"}
              fill
              className={styles.mainImage}
              priority
            />
          </div>
        )}

        {/* Pricing Card (Mobile: after images, Desktop: sidebar) */}
        <div className={styles.pricingCard}>
          <div className={styles.pricingHeader}>
            <h3 className={styles.sectionTitle} style={{ marginBottom: 0 }}>
              Pricing
            </h3>
            <Image
              src={`/images/carLogos/${car?.brand}.webp`}
              alt={car?.brand || "Brand"}
              width={50}
              height={50}
              className={styles.brandLogo}
            />
          </div>

          <div className={styles.priceRows}>
            <PriceRow
              label="Daily"
              price={dailyPrice}
              originalPrice={originalDaily}
              currency={car?.pricing?.currency || "AED"}
            />
            <PriceRow
              label="Weekly"
              price={currentWeekly}
              originalPrice={originalWeekly}
              currency={car?.pricing?.currency || "AED"}
              save={car?.pricing?.weeklyDiscount}
            />
            <PriceRow
              label="Monthly"
              price={currentMonthly}
              originalPrice={originalMonthly}
              currency={car?.pricing?.currency || "AED"}
              save={car?.pricing?.monthlyDiscount}
            />
          </div>

          <div className={styles.detailsList}>
            <DetailRow
              label="Security Deposit"
              value={`${car?.pricing?.currency} ${car?.securityDeposit || 0}`}
            />
            <DetailRow
              label="Daily Mileage"
              value={`${car?.mileage?.dailyIncluded || 250} km included`}
            />
            <DetailRow
              label="Extra Mileage"
              value={`${car?.pricing?.currency} ${
                car?.mileage?.extraMileagePrice || 5
              }/km`}
            />
            <DetailRow
              label="Chauffeur Service"
              value={car?.chauffeurService || "Available"}
            />
          </div>
        </div>

        {/* Content sections */}
        <div className={styles.contentColumn}>
          {/* Key Features */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>Key Features</h2>
            <div className={styles.featuresGrid}>
              <FeatureBox
                icon={<Users size={20} />}
                label={`${car?.seats || 0} Seats`}
              />
              <FeatureBox
                icon={<Settings size={20} />}
                label={car?.transmission || "Auto"}
              />
              <FeatureBox
                icon={<Fuel size={20} />}
                label={car?.fuel || "Petrol"}
              />
              <FeatureBox
                icon={<DoorOpen size={20} />}
                label={`${car?.doors || 2} Doors`}
              />
              <FeatureBox
                icon={<Cog size={20} />}
                label={car?.engine || "V6"}
              />
              <FeatureBox
                icon={<Gauge size={20} />}
                label={`${car?.horsepower || "N/A"} HP`}
              />
            </div>
          </div>

          {/* Included Features */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>Included Features</h2>
            <div className={styles.includedList}>
              {/* Check if features exists before mapping */}
              {car?.features?.map((feature, idx) => (
                <div key={idx} className={styles.includedItem}>
                  <div className={styles.checkIcon}>
                    <Check size={14} />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {car?.about && (
            <div className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>About this car</h2>
              <div className={styles.descriptionText}>{car.about}</div>
            </div>
          )}

          <div
            className={styles.sectionCard}
            style={{ background: "#f8fcf9", border: "1px solid #dcfce7" }}
          >
            <h2 className={styles.sectionTitle}>Rental Information</h2>
            <div className={styles.rentalInfoGrid}>
              <RentalInfoRow
                icon={<MapPin size={20} />}
                label="Pickup Location"
                value={car?.rentalInfo?.pickupLocation || "Dubai Main Branch"}
              />
              <RentalInfoRow
                icon={<Shield size={20} />}
                label="Insurance"
                value={car?.rentalInfo?.insurance || "Basic Comprehensive"}
              />
              <RentalInfoRow
                icon={<Truck size={20} />}
                label="Free Pickup & Drop"
                value={
                  car?.rentalInfo?.freePickupAndDrop || "On Monthly Rentals"
                }
              />
              <RentalInfoRow
                icon={<CreditCard size={20} />}
                label="Payment Methods"
                value={
                  car?.rentalInfo?.paymentMethods?.join(", ") ||
                  "Card, Cash, Crypto"
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA Buttons (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4">
        <div className="flex gap-3">
          <a
            href={`https://wa.me/971523048253?text=I am interested in ${car?.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.btn} ${styles.btnWhatsapp} flex-1`}
          >
            <MessageCircle size={18} /> WhatsApp
          </a>
          <a
            href="tel:971523048253"
            className={`${styles.btn} ${styles.btnCall} flex-1`}
          >
            <Phone size={18} /> Call
          </a>
        </div>
      </div>
    </main>
  );
};

/* --- Helpers --- */

const FeatureBox = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <div className={styles.featureItem}>
    <div className={styles.featureIconBox}>{icon}</div>
    <p className={styles.featureLabel}>{label}</p>
  </div>
);

const PriceRow = ({
  label,
  price,
  originalPrice,
  currency,
  save,
}: {
  label: string;
  price: number;
  originalPrice?: number;
  currency: string;
  save?: string;
}) => (
  <div className={styles.priceRow}>
    <span className={styles.priceLabel}>{label}</span>
    <div style={{ textAlign: "right" }}>
      {originalPrice && (
        <span
          style={{
            textDecoration: "line-through",
            color: "#9ca3af",
            fontSize: "0.85rem",
            display: "block",
          }}
        >
          {currency} {originalPrice.toLocaleString()}
        </span>
      )}
      <span
        className={styles.priceValue}
        style={originalPrice ? { color: "#f97416" } : {}}
      >
        {currency} {Math.floor(price).toLocaleString()}
      </span>
      {save && <span className={styles.saveBadge}>{save}</span>}
    </div>
  </div>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className={styles.detailRow}>
    <span className={styles.detailLabel}>{label}</span>
    <span className={styles.detailValue}>{value}</span>
  </div>
);

const RentalInfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className={styles.rentalItem}>
    <div className={styles.rentalIcon}>{icon}</div>
    <div>
      <span className={styles.rentalLabel}>{label}</span>
      <span className={styles.rentalValue}>{value}</span>
    </div>
  </div>
);

export default CarDetailsView;
