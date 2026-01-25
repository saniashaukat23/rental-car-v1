"use client";
import Image from "next/image";
import styles from "../../../styles/frontend/about.module.css";
import { Car, Users, Shield, Award } from "lucide-react";
import FeatureCard from "@/src/components/Cards";
import CTAButtons from "../../../components/CTAButtons";

const featureData = [
  {
    Icon: Car,
    title: "Premium Automotive Collection",
    description:
      "Handpicked vehicles representing the pinnacle of engineering excellence. Each car is selected for performance, comfort, and prestige to ensure an unforgettable driving experience.",
  },
  {
    Icon: Users,
    title: "Client-Centric Approach",
    description:
      "We treat each rental as a unique journey. Our consultants understand your preferences and match you with the perfect vehicle that suits your style and requirements.",
  },
  {
    Icon: Shield,
    title: "Safety & Integrity",
    description:
      "Rigorous maintenance protocols, comprehensive insurance coverage, and thorough vehicle inspections guarantee your peace of mind throughout your rental period.",
  },
  {
    Icon: Award,
    title: "Uncompromising Standards",
    description:
      "Excellence isn't a goal—it's our foundation. From vehicle condition to customer service, we maintain the highest standards across every touchpoint.",
  },
];
export default function AboutSection() {
  return (
    <>
      <section className={styles.section}>
        {/* Decorative Background Blobs */}
        <div className={styles.backgroundEffects}>
          <div className={`${styles.blob} ${styles.blobRight}`}></div>
          <div className={`${styles.blob} ${styles.blobLeft}`}></div>
        </div>

        <div className={styles.container}>
          {/* Text Content */}
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              About <span className={styles.highlight}>Car Hire Now Dubai</span>
            </h1>
            <p className={styles.subtitle}>
              Redefining luxury automotive experiences through impeccable service and sophisticated choice
            </p>
          </div>

          {/* Hero Image */}
          <div className={styles.imageWrapper}>
            <div className={styles.imageContainer}>
              <Image
                src="https://res.cloudinary.com/dfck2j3nx/image/upload/v1769349571/about_fff1fg.png"
                alt="Luxury In Motion Dubai - Premium Car Rental Experience"
                fill
                className={styles.image}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              />
              {/* Dark gradient overlay at the bottom of the image */}
              <div className={styles.imageOverlay}></div>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.sectionContainer}>
        {/* Background Blobs */}
        <div className={styles.backgroundEffects}>
          <div className={`${styles.blob} ${styles.blobTopRight}`}></div>
          <div className={`${styles.blob} ${styles.blobBottomLeft}`}></div>
        </div>

        <div className={styles.contentWrapper}>
          {/* Intro Text */}
          <div className={styles.introHeader}>
            <p className={styles.introText}>
              Car Hire Now represents a commitment to automotive excellence in Dubai. We've curated an exclusive collection of premium and luxury vehicles to cater to discerning travelers who demand more than just transportation—they seek an experience.
            </p>
          </div>

          {/* Top Stats Grid (P, 24/7, 5*) */}
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statIconCircle}>
                <h3 className={styles.statValue}>50+</h3>
              </div>
              <p className={styles.statLabel}>Premium</p>
              <p className={styles.statSubLabel}>Vehicles</p>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statIconCircle}>
                <h3 className={styles.statValue}>24/7</h3>
              </div>
              <p className={styles.statLabel}>Expert</p>
              <p className={styles.statSubLabel}>Support</p>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statIconCircle}>
                <h3 className={styles.statValue}>10K+</h3>
              </div>
              <p className={styles.statLabel}>Happy</p>
              <p className={styles.statSubLabel}>Clients</p>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className={styles.featuresGrid}>
            {featureData.map((feature, index) => (
              <FeatureCard
                key={index}
                Icon={feature.Icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
          {/* "Why Choose Us" Section */}
          <div className={styles.whyChooseSection}>
            <h2 className={styles.sectionTitle}>The Car Hire Now Difference</h2>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitItem}>
                <div className={styles.benefitCircle}>
                  <div className={styles.benefitValue}>✓</div>
                </div>
                <h4 className={styles.benefitTitle}>Honest Pricing</h4>
                <p className={styles.benefitText}>
                  No surprises, no hidden costs—just fair, transparent rates
                </p>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitCircle}>
                  <div className={styles.benefitValue}>✓</div>
                </div>
                <h4 className={styles.benefitTitle}>Real Support</h4>
                <p className={styles.benefitText}>
                  Responsive team available whenever you need assistance
                </p>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitCircle}>
                  <div className={styles.benefitValue}>✓</div>
                </div>
                <h4 className={styles.benefitTitle}>Convenient Access</h4>
                <p className={styles.benefitText}>Free delivery & pickup across Dubai</p>
              </div>
            </div>
          </div>

          {/* Call To Action Box */}
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>Begin Your Luxury Journey</h2>
            <p className={styles.ctaText}>
              Discover why discerning travelers choose Car Hire Now. Let us match you with the perfect vehicle and create an unforgettable moment in Dubai.
            </p>
            <CTAButtons
              whatsappMessage="Hi, I'm interested in renting a luxury car"
              whatsappLabel="WhatsApp Us"
              callLabel="Call Us Now"
            />
          </div>
        </div>
      </div>
    </>
  );
}
