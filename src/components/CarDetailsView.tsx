"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import CTAButtons from "./CTAButtons";
import {
  Car, Check, CreditCard, DoorOpen, Fuel, Gauge, MapPin,
  MessageCircle, Phone, Settings, Shield, Truck, Users, Cog,
} from "lucide-react";
import { PHONE_URL, WHATSAPP_URL } from "../lib/constants";
import { CarType } from "../types/CarType";

// --- 1. Import the new Gallery Component ---
import ImageGallery from "./ImageGallery";

// --- 2. Import Page Styles ---
import styles from "../styles/frontend/carDetails.module.css"
import svcStyles from "../styles/frontend/services.module.css";

interface CarDetailsViewProps {
  car: CarType | null | undefined;
}

const CarDetailsView: React.FC<CarDetailsViewProps> = ({ car }) => {
  // Safe calculation logic
  const isDiscounted = car?.applyDiscount;
  const dailyPrice = car?.pricing?.daily || 0;
  const currentWeekly = car?.pricing?.weekly || dailyPrice * 7 * 0.9;
  const currentMonthly = car?.pricing?.monthly || dailyPrice * 30 * 0.8;

  const originalDaily = isDiscounted
    ? car?.pricing?.originalDaily || Math.round(dailyPrice * 1.15)
    : undefined;

  const calculateSaving = (current: number, original?: number) => {
    if (!original) return null;
    const saving = Math.round(((original - current) / original) * 100);
    return saving > 0 ? `Save ${saving}%` : null;
  };

  if (!car) {
    return (
      <div className={`${styles.container} ${styles.errorContainer}`}>
        <h2 className={styles.errorTitle}>Car not found</h2>
        <Link href="/cars" className={styles.errorLink}>
          Back to Fleet
        </Link>
      </div>
    );
  }

  return (
    <main
      className={styles.pageWrapper}
    >
      <div className={styles.container}>

        {/* Breadcrumb */}
        <nav className={styles.breadcrumbNav}>
          <ol className={styles.breadcrumbList}>
            <li><Link href="/" className={styles.breadcrumbLink}>Home</Link></li>
            <li>/</li>
            <li><Link href="/cars" className={styles.breadcrumbLink}>Cars</Link></li>
            <li>/</li>
            <li className={styles.breadcrumbCurrent}>{car.name}</li>
          </ol>
        </nav>

        {/* Header Section */}
        <div className={styles.headerSection}>
          <h1 className={styles.headerTitle}>{car.name} {car.year}</h1>
          <div className={styles.badgesWrapper}>
            <div className={styles.badge}>
              <Car size={16} className={styles.iconBlue} />
              <span className={styles.badgeText}>{car.type}</span>
            </div>
            <div className={styles.badge}>
              <div className={styles.colorDot} style={{ backgroundColor: car.color?.toLowerCase() || "#ccc" }} />
              <span className={styles.badgeText}>{car.color}</span>
            </div>
          </div>
        </div>

        {/* TOP GRID: Gallery + Pricing */}
        <div className={styles.topGrid}>

          {/* Image Gallery Section */}
          <div
            className={styles.imageSection}
            style={{ viewTransitionName: `car-image-${car._id}` } as React.CSSProperties}
          >
            <ImageGallery
              images={car.images || []}
              altTitle={car.name}
            />
          </div>

          {/* Pricing Card */}
          <div className={styles.pricingSection}>
            <div className={styles.pricingCard}>
              <div className={styles.pricingHeader}>
                <h3 className={styles.pricingTitle}>Pricing</h3>
                <div className={styles.brandLogoBox}>
                  {car.brand && (
                    <Image src={`https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/${car.brand}.webp`} alt={car.brand} fill className={styles.brandLogoImage} />
                  )}
                </div>
              </div>
              <div className={styles.priceRowContainer}>
                <PriceRow label="Daily" price={dailyPrice} original={originalDaily} currency={car.pricing?.currency} />
                <PriceRow label="Weekly" price={currentWeekly} currency={car.pricing?.currency} discountTag={car.pricing?.weeklyDiscount || calculateSaving(currentWeekly, car.pricing?.originalWeekly)} />
                <PriceRow label="Monthly" price={currentMonthly} currency={car.pricing?.currency} discountTag={car.pricing?.monthlyDiscount || calculateSaving(currentMonthly, car.pricing?.originalMonthly)} />
              </div>
              <div className={styles.detailsList}>
                <DetailLine label="Security Deposit" value={`${car.pricing?.currency || "AED"} ${car.securityDeposit || 0}`} />
                <DetailLine label="Daily Mileage" value={`${car.mileage?.dailyIncluded || 250} km included`} />
              </div>


              <CTAButtons
                whatsappMessage={`Hello, I'm interested in ${car.name}`}
                whatsappLabel="WhatsApp"
                callLabel="Call Us"
                className={styles.pricingButtons}
              />
            </div>
          </div>
        </div>

        {/* BOTTOM GRID: Features + FAQ */}
        <div className={styles.bottomGrid}>

          {/* Left Content Column */}
          <div className={styles.contentColumn}>

            {/* Key Features */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Key Features</h2>
              <div className={styles.titleDivider}></div>
              <div className={styles.featureGrid}>
                <FeatureItem icon={<Users />} label={`${car.seats || 0} Seats`} />
                <FeatureItem icon={<Settings />} label={car.transmission || "Automatic"} />
                <FeatureItem icon={<Fuel />} label={car.fuel || "Gasoline"} />
                <FeatureItem icon={<DoorOpen />} label={`${car.doors || 2} Doors`} />
                <FeatureItem icon={<Cog />} label={car.engine || "V6"} />
                <FeatureItem icon={<Gauge />} label={`${car.horsepower || "-"} HP`} />
              </div>
            </div>

            {/* Included Features */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Included Features</h2>
              <div className={styles.titleDivider}></div>
              <div className={styles.includedGrid}>
                {car.features?.map((feature, idx) => (
                  <div key={idx} className={styles.includedItem}>
                    <div className={styles.checkCircle}>
                      <Check size={14} />
                    </div>
                    <span className={styles.includedText}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About Section */}
            {car.about && (
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>About this car</h2>
                <div className={styles.titleDivider}></div>
                <p className={styles.aboutText}>{car.about}</p>
              </div>
            )}

            {/* Rental Information */}
            <div className={styles.rentalCard}>
              <h2 className={`${styles.cardTitle} ${styles.rentalTitleSpacing}`}>Rental Information</h2>
              <div className={styles.rentalGrid}>
                <RentalItem
                  icon={<MapPin />}
                  title="Pickup Location"
                  desc={car.rentalInfo?.pickupLocation || "Marina, Dubai"}
                />
                <RentalItem
                  icon={<Shield />}
                  title="Insurance"
                  desc={car.rentalInfo?.insurance || "Full coverage included"}
                />
                <RentalItem
                  icon={<Truck />}
                  title="Free Pickup & Drop-off"
                  desc={car.rentalInfo?.freePickupAndDrop || "Complimentary delivery service"}
                />
                <RentalItem
                  icon={<CreditCard />}
                  title="Payment Methods"
                  desc={car.rentalInfo?.paymentMethods?.join(", ") || "Card, Crypto, Cash"}
                />
              </div>
            </div>
          </div>

          {/* Right Column: FAQ (Sticky) */}
          <div className={styles.faqSection}>
            <div className={styles.stickyWrapper}>
              <h2 className={`${styles.cardTitle} ${styles.faqTitleFlex}`}>
                <MessageCircle size={20} className={styles.iconBlue} />
                FAQ
              </h2>
              <div className={styles.faqContainer}>
                <FAQItem question="What type of car is this?" answer={`This is a ${car.year} ${car.name}, categorized as a ${car.type}.`} />
                <FAQItem question="How many people can it seat?" answer={`This vehicle comfortably seats ${car.seats || 5} passengers with ${car.doors || 4} doors.`} />
                <FAQItem question="Is insurance included?" answer={car.rentalInfo?.insurance || "Basic insurance is included in the rental price."} />
                <FAQItem question="What is the daily mileage limit?" answer={`${car.mileage?.dailyIncluded || 250} km per day is included.`} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* MOBILE STICKY ACTIONS: Hidden on Desktop via CSS */}
      <div className={styles.mobileActions}>
        <a
          href={PHONE_URL}
          className={`${svcStyles.btn} ${svcStyles.btnOutline} ${svcStyles.btnLarge}`}
          aria-label="Call us"
        >
          <Phone size={18} />
          <span>Call Us</span>
        </a>

        <a
          href={WHATSAPP_URL(`I'm interested in ${car.name}`)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${svcStyles.btn} ${svcStyles.btnGreen} ${svcStyles.btnLarge}`}
          aria-label="WhatsApp us"
        >
          <MessageCircle size={18} />
          <span>WhatsApp</span>
        </a>
      </div>
    </main>
  );
};

/* --- Helper Components --- */

const PriceRow = ({ label, price, original, currency = "AED", discountTag }: any) => (
  <div className={styles.priceRow}>
    <div className={styles.priceFlex}>
      <span className={styles.priceLabel}>{label}</span>
      <div className={styles.textRight}>
        {original && <span className={styles.strikethrough}>{currency} {original.toLocaleString()}</span>}
        <span className={styles.priceAmount}>{currency} {Math.floor(price).toLocaleString()}</span>
        {discountTag && <span className={styles.discountTag}>{discountTag}</span>}
      </div>
    </div>
  </div>
);

const DetailLine = ({ label, value }: any) => (
  <div className={styles.detailItem}>
    <span className={styles.detailLabel}>{label}</span>
    <span className={styles.detailValue}>{value}</span>
  </div>
);

const FeatureItem = ({ icon, label }: any) => (
  <div className={styles.featureBox}>
    <div className={styles.iconCircle}>{React.isValidElement(icon) && React.cloneElement(icon, { size: 20 } as any)}</div>
    <p className={styles.featureText}>{label}</p>
  </div>
);

const RentalItem = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className={styles.rentalItemWrapper}>
    <div className={styles.rentalItemIcon}>
      {React.isValidElement(icon) && React.cloneElement(icon, { size: 20 } as any)}
    </div>
    <div className={styles.rentalItemContent}>
      <p className={styles.rentalItemTitle}>{title}</p>
      <p className={styles.rentalItemDesc}>{desc}</p>
    </div>
  </div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => (
  <div className={styles.faqItem}>
    <h3 className={styles.faqQuestion}>{question}</h3>
    <p className={styles.faqAnswer}>{answer}</p>
  </div>
);

export default CarDetailsView;