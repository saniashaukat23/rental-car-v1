"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react"; // Make sure you have lucide-react installed
import styles from "../../../styles/frontend/brands.module.css"; // Adjust path to your CSS file

// --- Data Definition ---
const brandsData = [
  {
    name: "Audi",
    logo: "/images/carlogos/audi.webp",
    description: "German car brand with vehicles that combine sleek design with advanced engineering. Known for refined interiors and Quattro all-wheel-drive system.",
  },
  {
    name: "BMW",
    logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/BMW.webp",
    description: "German automotive brand designed with precise handling and driving dynamics in mind. Each model balances sportiness with everyday comfort and technology.",
  },
  {
    name: "BRABUS",
    logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Brabus.webp",
    description: "Discover our premium BRABUS vehicle collection featuring luxury cars with exceptional performance and style.",
  },
  {
    name: "Bentley",
    logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Bentley.webp",
    description: "Discover our premium Bentley vehicle collection featuring luxury cars with exceptional performance and style.",
  },
  {
    name: "Cadillac",
    logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Cadillac.webp",
    description: "GM's luxury division known for bold styling and powerful engines. The American brand's vehicles combine comfort with modern design.",
  },
  {
    name: "Chevrolet",
    logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Chevrolet.webp",
    description: "Extensive range of vehicles including sedans and trucks. A staple of American car culture with iconic models like the Camaro and Corvette.",
  },
  {
    name: "Corvette",
    logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Corvette.webp",
    description: "Discover our premium Corvette vehicle collection featuring luxury cars with exceptional performance and style.",
  },
  {
    name: "Ferrari",
    logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Ferrari.webp",
    description: "Italian car company famous for high-performance sports cars built for speed and status. Sophisticated vehicles renowned for their V8 and V12 engines.",
  },
  {
    name: "GMC",
    logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/GMC.webp",
    description: "American brand specializing in premium trucks and SUVs. Each vehicle features rugged capability with upscale features and design.",
  },
  {
    name: "Jetour",
    logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Jetour.webp",
    description: "Discover our premium Jetour vehicle collection featuring luxury cars with exceptional performance and style.",
  },
  {
    name: "Land Rover",
    logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/LandRover.webp",
    description: "Discover our premium Land Rover vehicle collection featuring luxury cars with exceptional performance and style.",
  },
  {
    name: "Lamborghini",
    logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Lamborghini.webp",
    description: "Italian brand manufacturing exotic supercars with dramatic styling and extreme performance. Every model is built to turn heads and push limits.",
  },
  {
    name: "Mansory",
    logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Mansory.webp",
    description: "Discover our premium Mansory vehicle collection featuring luxury cars with exceptional performance and style.",
  },
  {
    name: "McLaren",
    logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/McLaren.webp",
    description: "Discover our premium McLaren vehicle collection featuring luxury cars with exceptional performance and style.",
  },
  {
    name: "Mercedes",
    logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Mercedes.webp",
    description: "Discover our premium Mercedes vehicle collection featuring luxury cars with exceptional performance and style.",
  },
  {
    name: "Nissan",
    logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Nissan.webp",
    description: "Discover our premium Nissan vehicle collection featuring luxury cars with exceptional performance and style.",
  },
  {
    name: "Porsche",
    logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Porsche.webp",
    description: "German automotive brand renowned for precision-engineered sports cars. Delivers unparalleled driving experiences with every vehicle.",
  },
  {
    name: "ROX",
    logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Rox.webp",
    description: "Discover our premium ROX vehicle collection featuring luxury cars with exceptional performance and style.",
  },
  {
    name: "Rolls Royce",
    logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/RollsRoyce.webp",
    description: "Discover our premium Rolls Royce vehicle collection featuring luxury cars with exceptional performance and style.",
  },
  {
    name: "Toyota",
    logo: "/images/carlogos/toyota.webp",
    description: "Discover our premium Toyota vehicle collection featuring luxury cars with exceptional performance and style.",
  },

];

// --- Component ---
export default function BrandsPage() {
  return (
    <main className={styles.pageWrapper}>
      <div className={styles.contentSection}>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>Premium Car Brands</h1>
            <p className={styles.subtitle}>
              Experience the finest automotive engineering from the world's most
              prestigious manufacturers. Our handpicked fleet features vehicles
              that speak for themselves.
            </p>
          </div>

          {/* Grid */}
          <div className={styles.grid}>
            {brandsData.map((brand, index) => (
              <div key={index} className={styles.card}>
                {/* Decorative Blob */}
                <div className={styles.decoration}></div>

                <div className={styles.cardContent}>
                  {/* Brand Header */}
                  <div className={styles.brandHeader}>
                    <div className={styles.logoBox}>
                      <Image
                        alt={`${brand.name} logo`}
                        src={brand.logo}
                        width={48}
                        height={48}
                        className={styles.logoImage}
                        quality={80}
                      />
                    </div>
                    <h3 className={styles.brandName}>{brand.name}</h3>
                  </div>

                  {/* Description */}
                  <p className={styles.description}>{brand.description}</p>
                </div>

                {/* Link */}
                <Link
                  href={`/brands/${brand.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className={styles.link}
                >
                  View {brand.name} Cars
                  <ArrowRight className={styles.icon} />
                </Link>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className={styles.ctaWrapper}>
            <div className={styles.ctaBox}>
              <h2 className={styles.ctaTitle}>
                Find Your Perfect Luxury Vehicle
              </h2>
              <p className={styles.ctaText}>
                Browse our complete collection of premium vehicles from these
                world-renowned manufacturers.
              </p>
              <Link href="/cars" className={styles.ctaButton}>
                View All Cars
                <ArrowRight className={styles.icon} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
