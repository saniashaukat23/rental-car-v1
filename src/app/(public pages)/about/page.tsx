"use client";
import Image from "next/image";
import styles from "../../../styles/frontend/about.module.css";
import { Car, Users, Shield, Award, MessageCircle, Phone } from "lucide-react";
import FeatureCard from "@/src/components/Cards";
const featureData = [
  {
    Icon: Car,
    title: "Premium Fleet",
    description:
      "Our collection features the latest models from world-renowned manufacturers, maintained to the highest standards for your comfort and safety.",
  },
  {
    Icon: Users,
    title: "Personalized Service",
    description:
      "Our dedicated team provides personalized attention to every customer, ensuring your rental experience exceeds expectations.",
  },
  {
    Icon: Shield,
    title: "Trust & Reliability",
    description:
      "With years of experience in Dubai's luxury car rental market, we've built a reputation for reliability and trustworthiness.",
  },
  {
    Icon: Award,
    title: "Excellence Guaranteed",
    description:
      "We're committed to excellence in every aspect of our service, from vehicle quality to customer support.",
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
              Your premier destination for luxury car rentals in the heart of
              Dubai
            </p>
          </div>

          {/* Hero Image */}
          <div className={styles.imageWrapper}>
            <div className={styles.imageContainer}>
              <Image
                src="/images/about.webp"
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
              We specialize in providing an exceptional driving experience with
              our carefully curated fleet of premium vehicles. From sports cars
              to luxury SUVs, we have the perfect vehicle for every occasion.
            </p>
          </div>

          {/* Top Stats Grid (P, 24/7, 5*) */}
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statIconCircle}>
                <h3 className={styles.statValue}>P</h3>
              </div>
              <p className={styles.statLabel}>Premium</p>
              <p className={styles.statSubLabel}>Fleet Selection</p>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statIconCircle}>
                <h3 className={styles.statValue}>24/7</h3>
              </div>
              <p className={styles.statLabel}>Customer</p>
              <p className={styles.statSubLabel}>Support</p>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statIconCircle}>
                <h3 className={styles.statValue}>5★</h3>
              </div>
              <p className={styles.statLabel}>Average</p>
              <p className={styles.statSubLabel}>Rating</p>
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
            <h2 className={styles.sectionTitle}>Why Choose Us?</h2>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitItem}>
                <div className={styles.benefitCircle}>
                  <div className={styles.benefitValue}>100%</div>
                </div>
                <h4 className={styles.benefitTitle}>Transparent Pricing</h4>
                <p className={styles.benefitText}>
                  No hidden fees or surprises
                </p>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitCircle}>
                  <div className={styles.benefitValue}>24/7</div>
                </div>
                <h4 className={styles.benefitTitle}>Customer Support</h4>
                <p className={styles.benefitText}>
                  Always here when you need us
                </p>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitCircle}>
                  <div className={styles.benefitValue}>Free</div>
                </div>
                <h4 className={styles.benefitTitle}>Delivery & Pickup</h4>
                <p className={styles.benefitText}>Within Dubai city limits</p>
              </div>
            </div>
          </div>

          {/* Call To Action Box */}
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>Ready to Experience Luxury?</h2>
            <p className={styles.ctaText}>
              Contact us today to find the perfect vehicle for your needs. Our
              team is ready to assist you with your luxury car rental.
            </p>
            <div className={styles.ctaButtons}>
              <a
                href="https://wa.me/+971501234567"
                className={`${styles.btn} ${styles.btnWhatsapp}`}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Us
              </a>
              <a
                href="tel:+97141234567"
                className={`${styles.btn} ${styles.btnCall}`}
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
