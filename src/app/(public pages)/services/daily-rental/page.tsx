import React from "react";
import {
  MessageCircle,
  Phone,
  Clock,
  Shield,
  MapPin,
  Truck,
  Users,
  Zap,
  CheckCircle2, // Matches the thin check circle style
  Car,
  Star,
} from "lucide-react";
import styles from "../../../../styles/frontend/dailyRentals.module.css";

const DailyCarRental = () => {
  return (
    <main className={styles.mainWrapper}>
      <div className={styles.container}>
        {/* --- Hero Section --- */}
        <div className={styles.heroSection}>
          <h1 className={styles.heroTitle}>DAILY CAR RENTAL IN DUBAI</h1>
          <p className={styles.heroDescription}>
            Experience the freedom of luxury with our{" "}
            <span className={`${styles.textPrimary} ${styles.fontSemibold}`}>
              premium daily rental service
            </span>
            . Perfect for business trips, special occasions, or exploring Dubai
            in style.
          </p>
          <div className={styles.buttonGroup}>
            <a
              href="https://wa.me/971582947143?text=Hi, I need a car for daily rental"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnGreen}`}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
            <a
              href="tel:971582947143"
              className={`${styles.btn} ${styles.btnOrangeOutline}`}
            >
              <Phone className="w-4 h-4" />
              Call Us Now
            </a>
          </div>
        </div>

        {/* --- Why Choose Grid --- */}
        <div className={styles.sectionMargin}>
          <h2 className={styles.sectionTitle}>Why Choose Daily Rental</h2>
          <div className={styles.gridSix}>
            {/* Item 1 */}
            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>
                <Clock size={32} />
              </div>
              <h4 className="text-sm md:text-base font-semibold mb-1">
                24/7 Service
              </h4>
              <p className="text-xs text-gray-500">Always Available</p>
            </div>
            {/* Item 2 */}
            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>
                <Shield size={32} />
              </div>
              <h4 className="text-sm md:text-base font-semibold mb-1">
                Full Insurance
              </h4>
              <p className="text-xs text-gray-500">Fully Covered</p>
            </div>
            {/* Item 3 */}
            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>
                <MapPin size={32} />
              </div>
              <h4 className="text-sm md:text-base font-semibold mb-1">
                Free Delivery
              </h4>
              <p className="text-xs text-gray-500">Dubai Wide</p>
            </div>
            {/* Item 4 */}
            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>
                <Truck size={32} />
              </div>
              <h4 className="text-sm md:text-base font-semibold mb-1">
                Instant Booking
              </h4>
              <p className="text-xs text-gray-500">Quick Process</p>
            </div>
            {/* Item 5 */}
            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>
                <Users size={32} />
              </div>
              <h4 className="text-sm md:text-base font-semibold mb-1">
                Expert Support
              </h4>
              <p className="text-xs text-gray-500">Professional Team</p>
            </div>
            {/* Item 6 */}
            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>
                <Zap size={32} />
              </div>
              <h4 className="text-sm md:text-base font-semibold mb-1">
                Premium Fleet
              </h4>
              <p className="text-xs text-gray-500">50+ Cars</p>
            </div>
          </div>
        </div>

        {/* --- Skipped "Popular Daily Rentals" Section --- */}

        {/* --- Benefits Section --- */}
        <div className={styles.sectionMargin}>
          <div className={styles.benefitsHeader}>
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Daily Rental Benefits
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Everything you need for the perfect day
              </p>
            </div>
          </div>
          <div className={styles.benefitsGrid}>
            {[
              "No hidden charges or fees",
              "Flexible pickup times",
              "Sanitized vehicles",
              "Child seats available",
              "24/7 roadside assistance",
              "Chauffeur Service",
              "250 km included",
              "Easy cancellation",
              "Instant confirmation",
            ].map((benefit, index) => (
              <div key={index} className={styles.benefitCard}>
                <CheckCircle2 className={`${styles.benefitIcon} w-5 h-5`} />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- How It Works Section --- */}
        <section className={styles.howItWorksSection}>
          <div className="relative z-10">
            <div className={`${styles.textCenter} mb-8`}>
              <h2 className={styles.sectionTitle}>How Daily Rental Works</h2>
              <p className={`${styles.textMuted} max-w-2xl mx-auto px-4`}>
                Simple steps to get your{" "}
                <span
                  className={`${styles.textPrimary} ${styles.fontSemibold}`}
                >
                  luxury car delivered
                </span>{" "}
                today
              </p>
            </div>
            <div className={styles.howItWorksGrid}>
              <div className={styles.processCard}>
                <div className={styles.processIconBox}>
                  <Car className="w-6 h-6" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  Choose Your Car
                </h3>
                <p className={`${styles.textMuted} text-sm leading-relaxed`}>
                  Browse our premium fleet and select the perfect luxury car for
                  your day
                </p>
              </div>
              <div className={styles.processCard}>
                <div className={styles.processIconBox}>
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  Select Duration
                </h3>
                <p className={`${styles.textMuted} text-sm leading-relaxed`}>
                  Pick your rental time from 24 hours onwards with flexible
                  extensions
                </p>
              </div>
              <div className={styles.processCard}>
                <div className={styles.processIconBox}>
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  Book Instantly
                </h3>
                <p className={`${styles.textMuted} text-sm leading-relaxed`}>
                  Complete booking via WhatsApp or phone with instant
                  confirmation
                </p>
              </div>
              <div className={styles.processCard}>
                <div className={styles.processIconBox}>
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  Free Delivery
                </h3>
                <p className={`${styles.textMuted} text-sm leading-relaxed`}>
                  We deliver to your location anywhere in Dubai within 2 hours
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Rates Section --- */}
        <section className={styles.ratesSection}>
          <div className="relative z-10">
            <div className={`${styles.textCenter} mb-8`}>
              <h2 className={styles.sectionTitle}>Transparent Daily Rates</h2>
              <p className={`${styles.textMuted} max-w-2xl mx-auto px-4`}>
                All-inclusive pricing with{" "}
                <span
                  className={`${styles.textPrimary} ${styles.fontSemibold}`}
                >
                  no hidden fees
                </span>
              </p>
            </div>
            <div className={styles.ratesGrid}>
              {/* Economy */}
              <div className={styles.rateCard}>
                <div
                  className={styles.processIconBox}
                  style={{ margin: "0 auto 1rem auto" }}
                >
                  <Car className="w-6 h-6" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  Economy Luxury
                </h3>
                <p className={styles.priceText}>From AED 400</p>
                <p className={`${styles.textMuted} text-sm`}>per day</p>
              </div>
              {/* Premium */}
              <div className={`${styles.rateCard} ${styles.rateCardHighlight}`}>
                <div
                  className={styles.processIconBox}
                  style={{ margin: "0 auto 1rem auto" }}
                >
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  Premium Sports
                </h3>
                <p className={styles.priceText}>From AED 900</p>
                <p className={`${styles.textMuted} text-sm`}>per day</p>
              </div>
              {/* Ultra */}
              <div className={styles.rateCard}>
                <div
                  className={styles.processIconBox}
                  style={{ margin: "0 auto 1rem auto" }}
                >
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  Ultra Luxury
                </h3>
                <p className={styles.priceText}>From AED 2000</p>
                <p className={`${styles.textMuted} text-sm`}>per day</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Final CTA Section --- */}
        <section className={styles.finalCtaSection}>
          <div className={styles.ctaBlurBg}>
            <div className={styles.blurBlob1}></div>
            <div className={styles.blurBlob2}></div>
          </div>
          <div className={styles.ctaContent}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Ready for Your{" "}
              <span className={styles.textPrimary}>Daily Adventure</span> Today
            </h2>
            <p className="text-xl text-gray-600 mb-4 leading-relaxed">
              Book your daily rental now and experience Dubai in luxury. Its
              that simple.
            </p>
            <p className="text-base text-gray-500 mb-12">
              Were available 24/7 with instant confirmation for your convenience
            </p>
            <div className={styles.buttonGroup}>
              <a
                href="https://wa.me/971582947143?text=Hi, I need a car for daily rental"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${styles.btnGreen} ${styles.btnLarge}`}
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
              <a
                href="tel:971582947143"
                className={`${styles.btn} ${styles.btnOrangeOutline} ${styles.btnLarge}`}
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default DailyCarRental;
