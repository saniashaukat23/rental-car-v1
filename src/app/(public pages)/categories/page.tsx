"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Car } from "lucide-react"; // Ensure lucide-react is installed
import styles from "../../../styles/frontend/categories.module.css";

// --- Data Configuration ---
const categories = [
  {
    title: "Convertible",
    slug: "rent-convertible-car-dubai",
    image: "/images/cartypelogos/1759741436173-r7utj.webp",
    description:
      "This type of vehicle gives you the thrill of open-air driving, perfect for scenic drives or enjoying the pleasant weather. It's the ideal vehicle that offers a fun yet stylish ride.",
    features: [
      "Open-air driving",
      "Scenic drives",
      "Weather enjoyment",
      "Stylish ride",
    ],
  },
  {
    title: "Economy",
    slug: "rent-economy-car-dubai",
    image: "/images/cartypelogos/1761836668299-9dn7n.webp",
    description:
      "Discover our premium Economy collection featuring luxury vehicles with exceptional performance and style.",
    features: [
      "Premium quality",
      "Exceptional performance",
      "Luxury features",
      "Professional service",
    ],
  },
  {
    title: "Luxury",
    slug: "rent-luxury-car-dubai",
    image: "/images/cartypelogos/1759827099550-kjwjapm.webp",
    description:
      "Discover our premium Luxury collection featuring luxury vehicles with exceptional performance and style.",
    features: [
      "Premium quality",
      "Exceptional performance",
      "Luxury features",
      "Professional service",
    ],
  },
  {
    title: "SUV",
    slug: "rent-suv-car-dubai",
    image: "/images/cartypelogos/1759827106843-q31jyq.webp",
    description:
      "Sports utility vehicles provide ample space, strong performance, and versatility, making them the best cars for road trips and off-road adventures. They are great for families.",
    features: [
      "Ample space",
      "Strong performance",
      "Versatility",
      "Extra cargo space",
    ],
  },
  {
    title: "Sedan",
    slug: "rent-sedan-car-dubai",
    image: "/images/cartypelogos/1759756904178-6g7kni.webp",
    description:
      "Sedans are reliable and fuel-efficient, offering a good balance between performance and practicality. They are an excellent choice for daily drives and business trips.",
    features: [
      "Reliable",
      "Fuel-efficient",
      "Performance balance",
      "Business suitable",
    ],
  },
  {
    title: "Sport",
    slug: "rent-sports-car-dubai",
    image: "/images/cartypelogos/1759741479677-50cvhn.webp",
    description:
      "Discover our premium Sports collection featuring luxury vehicles with exceptional performance and style.",
    features: [
      "Premium quality",
      "Exceptional performance",
      "Luxury features",
      "Professional service",
    ],
  },
];

const roadTripTips = [
  {
    title: "SUVs for Adventures",
    desc: "Perfect for off-road exploration and carrying all your travel essentials",
  },
  {
    title: "Convertibles for Scenery",
    desc: "Enjoy the open air and stunning views along Dubai's coastal routes",
  },
  {
    title: "Luxury for Comfort",
    desc: "Premium comfort and advanced features for long-distance travel",
  },
];

// --- Component ---
export default function VehicleCategories() {
  return (
    <main className={styles.pageWrapper}>
      <div className={styles.sectionBackground}>
        <div className={styles.container}>
          {/* Main Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>Vehicle Categories</h1>
            <p className={styles.subtitle}>
              Find your perfect ride from our diverse collection. Whether you
              need a spacious SUV for family trips, a sleek sports car for
              excitement, or a reliable sedan for business, we have the ideal
              vehicle for every occasion.
            </p>
          </div>

          {/* Categories Grid */}
          <div className={styles.grid}>
            {categories.map((cat, index) => (
              <div key={index} className={styles.card}>
                {/* Decorative Blob */}
                <div className={styles.blob}></div>

                <div className="mb-4">
                  {/* Image */}
                  <div className={styles.imageWrapper}>
                    <Image
                      alt={`${cat.title} category`}
                      src={cat.image}
                      fill
                      className={styles.carImage}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Text Content */}
                  <h3 className={styles.cardTitle}>{cat.title}</h3>
                  <p className={styles.cardDesc}>{cat.description}</p>

                  {/* Feature List */}
                  <div className={styles.featureList}>
                    {cat.features.map((feature, i) => (
                      <div key={i} className={styles.featureItem}>
                        <div className={styles.dot}></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Link */}
                <Link
                  href={`/our-fleet?type=${cat.title}`}
                  className={styles.link}
                >
                  View {cat.title}s
                  <ArrowRight className={styles.smallArrow} />
                </Link>
              </div>
            ))}
          </div>

          {/* Road Trip Section */}
          <div className={styles.roadTripSection}>
            <div className={styles.roadTripHeader}>
              <h2 className={styles.roadTripTitle}>Best Cars for Road Trips</h2>
              <p className={styles.subtitle}>
                Planning a road trip across Dubai and the UAE? Choose from our
                specially curated selection of vehicles perfect for long
                journeys, scenic drives, and unforgettable adventures.
              </p>
            </div>

            <div className={styles.roadTripGrid}>
              {roadTripTips.map((tip, index) => (
                <div key={index} className={styles.infoItem}>
                  <div className={styles.iconCircle}>
                    <Car className={styles.icon} />
                  </div>
                  <h3 className={styles.cardTitle}>{tip.title}</h3>
                  <p className={styles.cardDesc}>{tip.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center" }}>
              <Link href={`/our-fleet`} className={styles.ctaButton}>
                Explore All Vehicles
                <ArrowRight className={styles.mediumArrow} />
              </Link>
            </div>
          </div>

          {/* Flexible Rental Terms */}
          <div className={styles.termsSection}>
            <div className={styles.gradientBox}>
              <h2 className={styles.termsTitle}>Flexible Rental Terms</h2>
              <p className={styles.subtitle} style={{ marginBottom: "1.5rem" }}>
                You can rent these vehicles on a daily, weekly, or monthly
                basis. Choose the rental period that best suits your needs and
                budget.
              </p>
              <div className={styles.termsBadges}>
                <span className={styles.badge}>Daily Rentals</span>
                <span className={styles.badge}>Weekly Packages</span>
                <span className={styles.badge}>Monthly Deals</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
