"use client";

import { useEffect, useState, use, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Car, MessageCircle, Truck, Sparkles, Shield, Zap } from "lucide-react";
import { FaCar, FaArrowRight } from "react-icons/fa";
import CarRentalCard from "@/src/components/CarRentalCard";
import styles from "../../../../styles/frontend/brandpage.module.css";
import { BrandDescription } from "@/src/components/BrandDescription";
import { CarType } from "@/src/types/CarType";
import CTAButtons from "@/src/components/CTAButtons";
import { useCars } from "@/src/hooks/useCars";

type PageProps = {
  params: Promise<{ brand: string }>;
};

export default function BrandCarsPage({ params }: PageProps) {
  const { brand } = use(params);

  // Normalize brand name for API query
  // Convert URL slug (e.g., "rolls-royce") to proper brand name (e.g., "Rolls Royce")
  const brandDisplayName = brand
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Fetch cars by brand using the display name (API uses case-insensitive regex)
  const { data: cars = [], isLoading: loading } = useCars({ brand: brandDisplayName });

  // --- ANIMATION ON SCROLL ---
  const underlineRef = useRef<HTMLDivElement>(null);
  const [underlineInView, setUnderlineInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setUnderlineInView(true);
          observer.disconnect(); // Trigger once
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (underlineRef.current) {
      observer.observe(underlineRef.current);
    }

    return () => observer.disconnect();
  }, []);


  const safeCars = Array.isArray(cars) ? cars : [];

  // --- HERO IMAGE LOGIC (UPDATED) ---
  const DISPLAY_COUNT = 3;

  // 1. Get all available first images from the cars found
  const availableImages = safeCars.map((c) => c.images[0]).filter(Boolean);

  let heroImages: string[] = [];

  if (availableImages.length === 0) {
    // If absolutely no cars, use placeholders
    heroImages = Array(DISPLAY_COUNT).fill("/images/placeholder.webp");
  } else {
    // If we have 1 or 2 cars, repeat them to fill 3 slots
    // i % availableImages.length ensures we cycle 0, 1, 0... etc.
    heroImages = Array.from({ length: DISPLAY_COUNT }, (_, i) => {
      return availableImages[i % availableImages.length];
    });
  }

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>
          Locating {brandDisplayName} Fleet...
        </p>
      </div>
    );
  }

  // --- EMPTY STATE (Show ONLY the card) ---
  if (!loading && safeCars.length === 0) {
    return (
      <div className={styles.emptyPageWrapper}>
        <div className={styles.emptyCard}>
          <div className={styles.emptyIconWrapper}>
            <FaCar className={styles.emptyIcon} />
          </div>
          <h1 className={styles.emptyTitle}>No {brandDisplayName} Available</h1>
          <p className={styles.emptyText}>
            We are currently out of stock for this brand. Please check back
            later or explore our other luxury options.
          </p>

          <Link href="/cars" className={styles.searchButton}>
            Search Other Cars
            <FaArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className={styles.pageWrapper}>
      {/* --- HERO SECTION --- */}
      <section className={styles.heroSection}>
        {/* Overlay: Logo */}
        <div className={`${styles.badgeGlass} ${styles.logoBadge}`}>
          <Image
            src={`/images/carlogos/${brand.toLowerCase().replace(/[-\s]/g, "")}.webp`}
            width={60}
            height={60}
            alt={`${brandDisplayName} Logo`}
            className={styles.logoImageSize}
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>

        {/* Overlay: Count */}
        <div className={`${styles.badgeGlass} ${styles.countBadge}`}>
          <div className={styles.countNumber}>{safeCars.length}</div>
          <div className={styles.countLabel}>Vehicles Available</div>
        </div>

        {/* Scroll Indicator (Desktop) */}
        <div className={styles.scrollIndicator}>
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className={styles.scrollMouse}>
            <div className={styles.scrollDot}></div>
          </div>
        </div>

        {/* Scrollable/Grid Images */}
        <div className={styles.heroContent}>
          {heroImages.map((imgSrc, index) => (
            <div key={index} className={styles.heroImageWrapper}>
              <Image
                src={imgSrc}
                alt={`${brandDisplayName} Hero ${index + 1}`}
                fill
                className={styles.heroImage}
                priority={index === 0}
                draggable={false}
              />
              <div className={styles.heroOverlay} />
            </div>
          ))}
        </div>
      </section>

      <div className={styles.container}>
        {/* --- CAR LISTING SECTION --- */}
        <section className={styles.listingHeader}>
          <h1 className={styles.listingTitle}>
            Rent {brandDisplayName} in Dubai
          </h1>
          <div
            ref={underlineRef}
            className={`${styles.listingUnderline} ${underlineInView ? styles.isVisible : ""}`}
          ></div>
        </section>

        <div className={styles.carGrid}>
          {safeCars.map((car) => (
            <CarRentalCard key={car._id} car={car} />
          ))}
        </div>

        {/* --- SEO TEXT SECTION --- */}
        <section className={styles.py16}>
          <div className={`${styles.textCenter} ${styles.mb12}`}>
            <div className={styles.textBlock}>
              <p className={styles.mb4}>
                Rent a{" "}
                <span className={styles.highlight}>{brandDisplayName}</span> in
                Dubai to experience the effortless fusion of groundbreaking
                technology and sophistication on the city&apos;s grandest stage.
              </p>
              <p>
                Top-tier selections instantly elevate your Dubai travel. At
                Luxury In Motion, we guarantee seamless booking and stress-free
                logistics. Get your
                <span className={styles.highlight}>
                  {" "}
                  {brandDisplayName} rentals
                </span>{" "}
                delivered to your doorstep.
              </p>
            </div>
          </div>
        </section>

        {/* --- BENEFITS GRID --- */}
        <section className={styles.mb16}>
          <h2 className={styles.sectionTitle}>
            Why Rent a {brandDisplayName}?
          </h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>
                <Sparkles size={24} />
              </div>
              <h3 className={styles.featureCardTitle}>Unmatched Versatility</h3>
              <p className={styles.featureCardText}>
                From executive sedans to SUVs and sports cars,{" "}
                {brandDisplayName} offers a vehicle for every requirement.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>
                <Shield size={24} />
              </div>
              <h3 className={styles.featureCardTitle}>Exceptional Value</h3>
              <p className={styles.featureCardText}>
                A compelling balance of high-end luxury and advanced technology.
                {brandDisplayName} guarantees exceptional value.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>
                <Zap size={24} />
              </div>
              <h3 className={styles.featureCardTitle}>Executive Elegance</h3>
              <p className={styles.featureCardText}>
                Clean, timeless sophistication. A powerful statement of success
                for Dubai&apos;s roads.
              </p>
            </div>
          </div>
        </section>

        {/* --- PRICING TABLE --- */}
        <section className={styles.mb16}>
          <h2 className={styles.sectionTitle}>
            {brandDisplayName} Rental Prices
          </h2>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr>
                  <th>Model</th>
                  <th>Daily</th>
                  <th>Weekly</th>
                  <th>Monthly</th>
                </tr>
              </thead>
              <tbody>
                {safeCars.slice(0, 5).map((car) => (
                  <tr key={car._id}>
                    <td>{car.name}</td>
                    <td>
                      {car.pricing.currency}{" "}
                      {car.pricing.daily.toLocaleString()}
                    </td>
                    <td>
                      {car.pricing.currency}{" "}
                      {car.pricing.weekly?.toLocaleString() || "-"}
                    </td>
                    <td>
                      {car.pricing.currency}{" "}
                      {car.pricing.monthly?.toLocaleString() || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.noteBox}>
            <p className={styles.noteText}>
              <span className="font-bold">Note:</span> Prices subject to change
              based on season and availability.
            </p>
          </div>
        </section>

        {/* --- HOW TO RENT --- */}
        <section className={styles.mb16}>
          <h2 className={styles.sectionTitle}>Rent in 3 Easy Steps</h2>
          <div className={styles.stepsContainer}>
            <div className={styles.stepItem}>
              <div className={styles.stepIconBox}>
                <Car className={styles.stepIcon} />
              </div>
              <div className={styles.textLeft}>
                <p className={styles.stepNumber}>Step 1</p>
                <p className={styles.stepTitle}>Select Your Masterpiece</p>
                <p className={styles.stepText}>
                  Browse our fleet to find your perfect {brandDisplayName}.
                </p>
              </div>
            </div>
            <div className={styles.stepItem}>
              <div className={styles.stepIconBox}>
                <MessageCircle className={styles.stepIcon} />
              </div>
              <div className={styles.textLeft}>
                <p className={styles.stepNumber}>Step 2</p>
                <p className={styles.stepTitle}>Contact Us</p>
                <p className={styles.stepText}>
                  WhatsApp or call with your preferred dates.
                </p>
              </div>
            </div>
            <div className={styles.stepItem}>
              <div className={styles.stepIconBox}>
                <Truck className={styles.stepIcon} />
              </div>
              <div className={styles.textLeft}>
                <p className={styles.stepNumber}>Step 3</p>
                <p className={styles.stepTitle}>Receive & Drive</p>
                <p className={styles.stepText}>
                  We deliver to your hotel or airport terminal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready To Command Dubai?</h2>
          <p className={styles.ctaText}>
            Your executive {brandDisplayName} awaits. Contact us now for instant booking.
          </p>
          <CTAButtons
            whatsappMessage={`Hi, I want to rent a ${brandDisplayName} in Dubai`}
            whatsappLabel="WhatsApp Us"
            callLabel="Call Us Now"
          />
        </section>

        {/* --- FAQ SECTION --- */}
        <section className={`${styles.maxW4xl} ${styles.mxAuto}`}>
          <h2 className={styles.sectionTitle}>FAQs</h2>
          <div className={styles.spaceY4}>
            <div className={styles.faqItem}>
              <h3 className={`${styles.fontBold} ${styles.mb2}`}>
                Requirements to rent a {brandDisplayName}?
              </h3>
              <p className={`${styles.textSm} ${styles.textGray600}`}>
                Valid Passport, Visa Copy, Home Country License, and IDP (if
                applicable). Residents need Emirates ID and UAE License.
              </p>
            </div>
            <div className={styles.faqItem}>
              <h3 className="font-bold mb-2">Is insurance included?</h3>
              <p className={`${styles.textSm} ${styles.textGray600}`}>
                Yes, basic comprehensive insurance is included.
              </p>
            </div>
            <div className={styles.faqItem}>
              <h3 className={`${styles.fontBold} ${styles.mb2}`}>Mileage limits?</h3>
              <p className={`${styles.textSm} ${styles.textGray600}`}>
                Standard limit is 250km/day. Excess mileage is charged per km.
              </p>
            </div>
          </div>
        </section>
      </div>
      <BrandDescription brandName={brandDisplayName} />
    </main>
  );
}
