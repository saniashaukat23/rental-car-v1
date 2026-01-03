import React from "react";
import {
  MessageCircle,
  Phone,
  Percent,
  Shield,
  MapPin,
  Calendar,
  Award,
  Zap,
  Truck,
  Users,
  CheckCircle2,
  Car,
  Star,
} from "lucide-react";
import styles from "../../../../styles/frontend/weeklyRental.module.css";
const WeeklyCarRental = () => {
  return (
    <main className={styles.mainWrapper}>
      <div className={styles.container}>
        {/* --- Hero Section --- */}
        <div className={styles.heroHeader}>
          <h1 className={styles.heroTitle}>WEEKLY CAR RENTAL IN DUBAI</h1>
          <p className={styles.heroDesc}>
            Save with our{" "}
            <span className={`${styles.textPrimary} ${styles.fontSemibold}`}>
              premium weekly rental service
            </span>
            . Perfect for extended stays, business trips, or exploring the UAE
            at your own pace.
          </p>
          <div className={styles.buttonGroup}>
            <a
              href="https://wa.me/971582947143?text=Hi, I need a car for weekly rental"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnGreen}`}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
            <a
              href="tel:971582947143"
              className={`${styles.btn} ${styles.btnOutline}`}
            >
              <Phone className="w-4 h-4" />
              Call Us Now
            </a>
          </div>
        </div>

        {/* --- Why Choose Section --- */}
        <div className={styles.sectionMargin}>
          <h2 className={styles.sectionTitle}>Why Choose Weekly Rental</h2>
          <div className={styles.gridSix}>
            {/* 1. Best Rates */}
            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>
                <Percent size={32} />
              </div>
              <h4 className="text-sm md:text-base font-semibold mb-1">
                Best Rates
              </h4>
              <p className={styles.textSmallMuted}>Weekly Discount</p>
            </div>
            {/* 2. Full Insurance */}
            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>
                <Shield size={32} />
              </div>
              <h4 className="text-sm md:text-base font-semibold mb-1">
                Full Insurance
              </h4>
              <p className={styles.textSmallMuted}>Comprehensive</p>
            </div>
            {/* 3. Free Delivery */}
            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>
                <MapPin size={32} />
              </div>
              <h4 className="text-sm md:text-base font-semibold mb-1">
                Free Delivery
              </h4>
              <p className={styles.textSmallMuted}>UAE Wide</p>
            </div>
            {/* 4. Flexible Terms */}
            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>
                <Calendar size={32} />
              </div>
              <h4 className="text-sm md:text-base font-semibold mb-1">
                Flexible Terms
              </h4>
              <p className={styles.textSmallMuted}>Easy Extension</p>
            </div>
            {/* 5. Premium Support */}
            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>
                <Award size={32} />
              </div>
              <h4 className="text-sm md:text-base font-semibold mb-1">
                Premium Support
              </h4>
              <p className={styles.textSmallMuted}>Dedicated Team</p>
            </div>
            {/* 6. Weekly Mileage */}
            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>
                <Zap size={32} />
              </div>
              <h4 className="text-sm md:text-base font-semibold mb-1">
                Weekly Mileage
              </h4>
              <p className={styles.textSmallMuted}>1750 km included</p>
            </div>
          </div>
        </div>

        {/* --- View All Cars Button (Skipping large car grid as per pattern) --- */}
        <div className="flex justify-center mb-12">
          <a className={`${styles.btn} ${styles.btnGreen}`} href="/cars">
            View All Cars
            <Car className="w-4 h-4 ml-2" />
          </a>
        </div>

        {/* --- Benefits & Details Section --- */}
        <div className={styles.sectionMargin}>
          <div className={styles.benefitsHeader}>
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Weekly Rental Benefits &amp; Details
              </h3>
              <p className={styles.textMuted}>
                Everything included in your weekly rental
              </p>
            </div>
          </div>
          <div className={styles.benefitsGrid}>
            {/* Benefit 1 */}
            <div className={styles.benefitCard}>
              <div className={styles.benefitContent}>
                <CheckCircle2
                  className={`${styles.benefitIcon} text-green-500`}
                />
                <div>
                  <span className="text-sm font-medium block">
                    Weekly Discounts
                  </span>
                  <span className={styles.textSmallMuted}>
                    Special rates for 7-day rentals
                  </span>
                </div>
              </div>
            </div>
            {/* Benefit 2 */}
            <div className={styles.benefitCard}>
              <div className={styles.benefitContent}>
                <Shield className={`${styles.benefitIcon} text-blue-500`} />
                <div>
                  <span className="text-sm font-medium block">
                    Security Deposit
                  </span>
                  <span className={styles.textSmallMuted}>AED 1000 - 5000</span>
                </div>
              </div>
            </div>
            {/* Benefit 3 */}
            <div className={styles.benefitCard}>
              <div className={styles.benefitContent}>
                <MapPin className={`${styles.benefitIcon} text-purple-500`} />
                <div>
                  <span className="text-sm font-medium block">
                    Weekly Mileage
                  </span>
                  <span className={styles.textSmallMuted}>
                    1750 km included
                  </span>
                </div>
              </div>
            </div>
            {/* Benefit 4 */}
            <div className={styles.benefitCard}>
              <div className={styles.benefitContent}>
                <Zap className={`${styles.benefitIcon} text-orange-500`} />
                <div>
                  <span className="text-sm font-medium block">
                    Extra Mileage
                  </span>
                  <span className={styles.textSmallMuted}>
                    AED 210/km after limit
                  </span>
                </div>
              </div>
            </div>
            {/* Benefit 5 */}
            <div className={styles.benefitCard}>
              <div className={styles.benefitContent}>
                <Users className={`${styles.benefitIcon} text-indigo-500`} />
                <div>
                  <span className="text-sm font-medium block">
                    Chauffeur Service
                  </span>
                  <span className={styles.textSmallMuted}>
                    Available on request
                  </span>
                </div>
              </div>
            </div>
            {/* Benefit 6 */}
            <div className={styles.benefitCard}>
              <div className={styles.benefitContent}>
                <Truck className={`${styles.benefitIcon} text-teal-500`} />
                <div>
                  <span className="text-sm font-medium block">
                    Free Delivery
                  </span>
                  <span className={styles.textSmallMuted}>
                    Dubai &amp; UAE wide
                  </span>
                </div>
              </div>
            </div>
            {/* Benefit 7 */}
            <div className={styles.benefitCard}>
              <div className={styles.benefitContent}>
                <CheckCircle2
                  className={`${styles.benefitIcon} text-green-500`}
                />
                <div>
                  <span className="text-sm font-medium block">
                    Full Insurance
                  </span>
                  <span className={styles.textSmallMuted}>
                    Comprehensive coverage included
                  </span>
                </div>
              </div>
            </div>
            {/* Benefit 8 */}
            <div className={styles.benefitCard}>
              <div className={styles.benefitContent}>
                <Calendar className={`${styles.benefitIcon} text-pink-500`} />
                <div>
                  <span className="text-sm font-medium block">
                    Flexible Extension
                  </span>
                  <span className={styles.textSmallMuted}>
                    Easy booking extension available
                  </span>
                </div>
              </div>
            </div>
            {/* Benefit 9 */}
            <div className={styles.benefitCard}>
              <div className={styles.benefitContent}>
                <Award className={`${styles.benefitIcon} text-yellow-500`} />
                <div>
                  <span className="text-sm font-medium block">
                    Priority Support
                  </span>
                  <span className={styles.textSmallMuted}>
                    24/7 dedicated assistance
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- How It Works --- */}
        <section className={styles.howItWorksSection}>
          <div className="relative z-10">
            <div className={`${styles.textCenter} mb-8`}>
              <h2 className={styles.sectionTitle}>How Weekly Rental Works</h2>
              <p className={`${styles.textMuted} max-w-2xl mx-auto px-4`}>
                Simple steps to get your{" "}
                <span
                  className={`${styles.textPrimary} ${styles.fontSemibold}`}
                >
                  luxury car for the week
                </span>
              </p>
            </div>
            <div className={styles.howItWorksGrid}>
              <div className={styles.stepCard}>
                <div className={styles.stepIconBox}>
                  <Car className="w-6 h-6" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  Select Your Car
                </h3>
                <p className={`${styles.textMuted} text-sm leading-relaxed`}>
                  Browse our premium fleet and choose the perfect luxury car for
                  your week
                </p>
              </div>
              <div className={styles.stepCard}>
                <div className={styles.stepIconBox}>
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  Choose Your Week
                </h3>
                <p className={`${styles.textMuted} text-sm leading-relaxed`}>
                  Pick your start date and enjoy flexible 7-day rental periods
                </p>
              </div>
              <div className={styles.stepCard}>
                <div className={styles.stepIconBox}>
                  <Percent className="w-6 h-6" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  Best Weekly Rates
                </h3>
                <p className={`${styles.textMuted} text-sm leading-relaxed`}>
                  Get special discounted rates compared to daily rentals
                </p>
              </div>
              <div className={styles.stepCard}>
                <div className={styles.stepIconBox}>
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  Free Delivery
                </h3>
                <p className={`${styles.textMuted} text-sm leading-relaxed`}>
                  We deliver to your location anywhere in Dubai or the UAE
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Special Rates Section --- */}
        <section className={styles.ratesSection}>
          <div className="relative z-10">
            <div className={`${styles.textCenter} mb-8`}>
              <h2 className={styles.sectionTitle}>Special Weekly Rates</h2>
              <p className={`${styles.textMuted} max-w-2xl mx-auto px-4`}>
                All-inclusive pricing with{" "}
                <span
                  className={`${styles.textPrimary} ${styles.fontSemibold}`}
                >
                  special weekly rates
                </span>
              </p>
            </div>
            <div className={styles.ratesGrid}>
              {/* Economy */}
              <div className={styles.rateCard}>
                <div
                  className={styles.stepIconBox}
                  style={{ margin: "0 auto 1rem auto" }}
                >
                  <Car className="w-6 h-6" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  Economy Luxury
                </h3>
                <p className={styles.priceText}>AED 1500</p>
                <p className={`${styles.textMuted} text-sm mb-2`}>per week</p>
                <p className={styles.saveText}>Save AED 250</p>
              </div>
              {/* Premium */}
              <div className={`${styles.rateCard} ${styles.rateCardHighlight}`}>
                <div className={styles.badge}>Popular</div>
                <div
                  className={styles.stepIconBox}
                  style={{ margin: "0 auto 1rem auto" }}
                >
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  Premium Sports
                </h3>
                <p className={styles.priceText}>AED 7500</p>
                <p className={`${styles.textMuted} text-sm mb-2`}>per week</p>
                <p className={styles.saveText}>Save AED 3000</p>
              </div>
              {/* Ultra */}
              <div className={styles.rateCard}>
                <div
                  className={styles.stepIconBox}
                  style={{ margin: "0 auto 1rem auto" }}
                >
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  Ultra Luxury
                </h3>
                <p className={styles.priceText}>AED 16000</p>
                <p className={`${styles.textMuted} text-sm mb-2`}>per week</p>
                <p className={styles.saveText}>Save AED 2200</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Final CTA Section --- */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaBlurBg}>
            <div className={`${styles.blurBlob} ${styles.blobLeft}`}></div>
            <div className={`${styles.blurBlob} ${styles.blobRight}`}></div>
          </div>
          <div className={styles.ctaContent}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Start Your{" "}
              <span className={styles.textPrimary}>Weekly Adventure</span> Today
            </h2>
            <p className="text-xl text-gray-600 mb-4 leading-relaxed">
              Save more with weekly rates and enjoy the freedom of having a
              luxury car for the entire week.
            </p>
            <p className="text-base text-gray-500 mb-12">
              Flexible terms, unlimited possibilities, and premium service
              guaranteed
            </p>
            <div className={styles.buttonGroup}>
              <a
                href="https://wa.me/971582947143?text=Hi, I need a car for weekly rental"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${styles.btnGreen} ${styles.btnLarge}`}
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
              <a
                href="tel:971582947143"
                className={`${styles.btn} ${styles.btnOutline} ${styles.btnLarge}`}
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

export default WeeklyCarRental;
