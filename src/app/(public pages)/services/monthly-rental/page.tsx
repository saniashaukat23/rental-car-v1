import React from "react";
import {
  MessageCircle,
  Phone,
  Percent,
  Shield,
  House,
  Calendar,
  Award,
  Zap,
  CheckCircle2,
  MapPin,
  Users,
  Truck,
  FileText,
  CreditCard,
  Clock,
  Car,
  Star,
} from "lucide-react";
import styles from "../../../../styles/frontend/monthlyRental.module.css";
const MonthlyCarRental = () => {
  return (
    <main className={styles.mainWrapper}>
      <div className={styles.container}>
        {/* --- Hero Section --- */}
        <div className={styles.heroHeader}>
          <h1 className={styles.heroTitle}>MONTHLY CAR RENTAL IN DUBAI</h1>
          <p className={styles.heroDesc}>
            Maximum savings with our{" "}
            <span className={`${styles.textPrimary} ${styles.fontSemibold}`}>
              premium monthly rental service
            </span>
            . Perfect for long-term stays, relocations, or extended business
            assignments in the UAE.
          </p>
          <div className={styles.buttonGroup}>
            <a
              href="https://wa.me/971582947143?text=Hi, I need a car for monthly rental"
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

        {/* --- Features Grid (Small) --- */}
        <div className={styles.sectionMargin}>
          <h2 className={styles.sectionTitle}>Why Choose Monthly Rental</h2>
          <div className={styles.gridSix}>
            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>
                <Percent size={32} />
              </div>
              <h4 className="text-sm md:text-base font-semibold mb-1">
                Best Value
              </h4>
              <p className={styles.textSmallMuted}>Special Monthly Rates</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>
                <Shield size={32} />
              </div>
              <h4 className="text-sm md:text-base font-semibold mb-1">
                Full Coverage
              </h4>
              <p className={styles.textSmallMuted}>Premium Insurance</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>
                <House size={32} />
              </div>
              <h4 className="text-sm md:text-base font-semibold mb-1">
                Long-Term
              </h4>
              <p className={styles.textSmallMuted}>Ideal for Residents</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>
                <Calendar size={32} />
              </div>
              <h4 className="text-sm md:text-base font-semibold mb-1">
                Flexible Terms
              </h4>
              <p className={styles.textSmallMuted}>30+ Days</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>
                <Award size={32} />
              </div>
              <h4 className="text-sm md:text-base font-semibold mb-1">
                VIP Support
              </h4>
              <p className={styles.textSmallMuted}>Priority Service</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>
                <Zap size={32} />
              </div>
              <h4 className="text-sm md:text-base font-semibold mb-1">
                Monthly Mileage
              </h4>
              <p className={styles.textSmallMuted}>4500 km included</p>
            </div>
          </div>
        </div>

        {/* --- View All Button --- */}
        <div className="flex justify-center mb-12">
          <a className={`${styles.btn} ${styles.btnGreen}`} href="/cars">
            View All Cars
            <Car className="w-4 h-4 ml-2" />
          </a>
        </div>

        {/* --- Benefits & Details Section (Grid of 12) --- */}
        <div className={styles.sectionMargin}>
          <div className={styles.benefitsHeader}>
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Monthly Rental Benefits &amp; Details
              </h3>
              <p className={styles.textMuted}>
                Comprehensive benefits for long-term rentals
              </p>
            </div>
          </div>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitContent}>
                <CheckCircle2
                  className={`${styles.benefitIcon} text-green-500`}
                />
                <div>
                  <span className="text-sm font-medium block">
                    Maximum Savings
                  </span>
                  <span className={styles.textSmallMuted}>
                    Special discounted monthly rates
                  </span>
                </div>
              </div>
            </div>
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
            <div className={styles.benefitCard}>
              <div className={styles.benefitContent}>
                <MapPin className={`${styles.benefitIcon} text-purple-500`} />
                <div>
                  <span className="text-sm font-medium block">
                    Monthly Mileage
                  </span>
                  <span className={styles.textSmallMuted}>
                    4500 km included
                  </span>
                </div>
              </div>
            </div>
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
            <div className={styles.benefitCard}>
              <div className={styles.benefitContent}>
                <FileText className={`${styles.benefitIcon} text-red-500`} />
                <div>
                  <span className="text-sm font-medium block">
                    Simple Documentation
                  </span>
                  <span className={styles.textSmallMuted}>
                    Easy paperwork process
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitContent}>
                <CreditCard className={`${styles.benefitIcon} text-gray-500`} />
                <div>
                  <span className="text-sm font-medium block">
                    Flexible Payment
                  </span>
                  <span className={styles.textSmallMuted}>
                    Multiple payment options
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitContent}>
                <Award className={`${styles.benefitIcon} text-yellow-500`} />
                <div>
                  <span className="text-sm font-medium block">
                    VIP Treatment
                  </span>
                  <span className={styles.textSmallMuted}>
                    Priority service for monthly clients
                  </span>
                </div>
              </div>
            </div>
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
            <div className={styles.benefitCard}>
              <div className={styles.benefitContent}>
                <Calendar className={`${styles.benefitIcon} text-pink-500`} />
                <div>
                  <span className="text-sm font-medium block">
                    Flexible Extension
                  </span>
                  <span className={styles.textSmallMuted}>
                    Easy contract extension
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitContent}>
                <Clock className={`${styles.benefitIcon} text-cyan-500`} />
                <div>
                  <span className="text-sm font-medium block">
                    24/7 Support
                  </span>
                  <span className={styles.textSmallMuted}>
                    Round-the-clock assistance
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
              <h2 className={styles.sectionTitle}>How Monthly Rental Works</h2>
              <p className={`${styles.textMuted} max-w-2xl mx-auto px-4`}>
                Simple process for{" "}
                <span
                  className={`${styles.textPrimary} ${styles.fontSemibold}`}
                >
                  long-term luxury car rental
                </span>
              </p>
            </div>
            <div className={styles.howItWorksGrid}>
              <div className={styles.stepCard}>
                <div className={styles.stepIconBox}>
                  <Car className="w-6 h-6" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  Choose Your Car
                </h3>
                <p className={`${styles.textMuted} text-sm leading-relaxed`}>
                  Select from our premium fleet for your monthly needs
                </p>
              </div>
              <div className={styles.stepCard}>
                <div className={styles.stepIconBox}>
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  Select Duration
                </h3>
                <p className={`${styles.textMuted} text-sm leading-relaxed`}>
                  Choose 30 days or more with flexible extension options
                </p>
              </div>
              <div className={styles.stepCard}>
                <div className={styles.stepIconBox}>
                  <Percent className="w-6 h-6" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  Maximum Savings
                </h3>
                <p className={`${styles.textMuted} text-sm leading-relaxed`}>
                  Enjoy significant discounts compared to daily rates
                </p>
              </div>
              <div className={styles.stepCard}>
                <div className={styles.stepIconBox}>
                  <House className="w-6 h-6" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  Hassle-Free Living
                </h3>
                <p className={`${styles.textMuted} text-sm leading-relaxed`}>
                  Perfect solution for residents and long-term visitors
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Rates Section --- */}
        <section className={styles.ratesSection}>
          <div className="relative z-10">
            <div className={`${styles.textCenter} mb-8`}>
              <h2 className={styles.sectionTitle}>Exclusive Monthly Rates</h2>
              <p className={`${styles.textMuted} max-w-2xl mx-auto px-4`}>
                Best value pricing with{" "}
                <span
                  className={`${styles.textPrimary} ${styles.fontSemibold}`}
                >
                  maximum monthly savings
                </span>
              </p>
            </div>
            <div className={styles.ratesGrid}>
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
                <p className={styles.priceText}>From AED 3250</p>
                <p className={`${styles.textMuted} text-sm mb-2`}>per month</p>
                <p className={styles.saveText}>Save AED 4250</p>
              </div>
              <div className={`${styles.rateCard} ${styles.rateCardHighlight}`}>
                <div
                  className={styles.stepIconBox}
                  style={{ margin: "0 auto 1rem auto" }}
                >
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  Premium Sports
                </h3>
                <p className={styles.priceText}>From AED 11500</p>
                <p className={`${styles.textMuted} text-sm mb-2`}>per month</p>
                <p className={styles.saveText}>Save AED 3500</p>
              </div>
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
                <p className={styles.priceText}>From AED 35000</p>
                <p className={`${styles.textMuted} text-sm mb-2`}>per month</p>
                <p className={styles.saveText}>Save AED 13000</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Why Choose (Detailed Text Blocks) --- */}
        <section className={styles.sectionMargin}>
          <div className={`${styles.textCenter} mb-8`}>
            <h2 className={styles.sectionTitle}>Why Choose Monthly Rental</h2>
            <p className={`${styles.textMuted} max-w-2xl mx-auto px-4`}>
              Perfect solution for{" "}
              <span className={`${styles.textPrimary} ${styles.fontSemibold}`}>
                residents and long-term visitors
              </span>
            </p>
          </div>
          <div className={styles.textBlocksGrid}>
            {/* Block 1 */}
            <div className={styles.textBlockCard}>
              <h3 className="text-lg font-semibold mb-3">For New Residents</h3>
              <p className={`${styles.textMuted} text-sm mb-4`}>
                Just moved to Dubai? Our monthly rental gives you the
                flexibility to explore the city while you settle in. No
                long-term commitments, no purchase hassles.
              </p>
              <ul className={styles.listStack}>
                <li className={styles.listItem}>
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">
                    No UAE credit history required
                  </span>
                </li>
                <li className={styles.listItem}>
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">
                    Flexible terms while you settle
                  </span>
                </li>
                <li className={styles.listItem}>
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Switch vehicles as needed</span>
                </li>
              </ul>
            </div>
            {/* Block 2 */}
            <div className={styles.textBlockCard}>
              <h3 className="text-lg font-semibold mb-3">
                For Business Professionals
              </h3>
              <p className={`${styles.textMuted} text-sm mb-4`}>
                Extended business assignment in Dubai? Enjoy the convenience of
                a premium car without the commitment of ownership or yearly
                contracts.
              </p>
              <ul className={styles.listStack}>
                <li className={styles.listItem}>
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Corporate billing available</span>
                </li>
                <li className={styles.listItem}>
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Executive vehicle options</span>
                </li>
                <li className={styles.listItem}>
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Chauffeur service available</span>
                </li>
              </ul>
            </div>
            {/* Block 3 */}
            <div className={styles.textBlockCard}>
              <h3 className="text-lg font-semibold mb-3">
                Cost-Effective Solution
              </h3>
              <p className={`${styles.textMuted} text-sm mb-4`}>
                Monthly rental eliminates the hidden costs of car ownership
                while providing maximum flexibility and value.
              </p>
              <ul className={styles.listStack}>
                <li className={styles.listItem}>
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">
                    No registration or insurance fees
                  </span>
                </li>
                <li className={styles.listItem}>
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">No maintenance costs</span>
                </li>
                <li className={styles.listItem}>
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">No depreciation worries</span>
                </li>
              </ul>
            </div>
            {/* Block 4 */}
            <div className={styles.textBlockCard}>
              <h3 className="text-lg font-semibold mb-3">
                Ultimate Flexibility
              </h3>
              <p className={`${styles.textMuted} text-sm mb-4`}>
                Life changes, and so should your car. With monthly rental, adapt
                your vehicle choice to your current needs.
              </p>
              <ul className={styles.listStack}>
                <li className={styles.listItem}>
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Upgrade or downgrade anytime</span>
                </li>
                <li className={styles.listItem}>
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">No long-term contracts</span>
                </li>
                <li className={styles.listItem}>
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Easy extension or termination</span>
                </li>
              </ul>
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
              <span className={styles.textPrimary}>Monthly Rental</span> Journey
            </h2>
            <p className="text-xl text-gray-600 mb-4 leading-relaxed">
              Join hundreds of satisfied long-term customers enjoying the
              freedom of monthly car rental in Dubai.
            </p>
            <p className="text-base text-gray-500 mb-12">
              Maximum savings, minimum commitment, premium experience
            </p>
            <div className={styles.buttonGroup}>
              <a
                href="https://wa.me/971582947143?text=Hi, I need a car for monthly rental"
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

export default MonthlyCarRental;
