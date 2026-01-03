import React from "react";
import {
  MessageCircle,
  Phone,
  Clock,
  MapPin,
  Luggage,
  Shield,
  Users,
  Wifi,
  Coffee,
  Zap,
  CheckCircle2, // Using CheckCircle2 as it matches 'circle-check-big' better
} from "lucide-react";
import styles from "../../../../styles/frontend/airportTransfer.module.css";
const AirportTransfer = () => {
  return (
    <main className={styles.mainWrapper}>
      {/* --- Hero Section --- */}
      <div className={styles.container}>
        <div className={styles.heroHeader}>
          <h1 className={styles.heroTitle}>
            Premium Airport Transfer Service in Dubai
          </h1>
          <p className={styles.heroDescription}>
            Seamless, luxurious transportation between Dubai airports and your
            destination. Experience{" "}
            <span className={`${styles.textPrimary} ${styles.fontSemibold}`}>
              comfort and convenience
            </span>{" "}
            with our professional chauffeur service.
          </p>
          <div className={styles.heroButtons}>
            <a
              href="https://wa.me/971582947143?text=Hi, I need an airport transfer service"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.buttonBase} ${styles.buttonGreen}`}
            >
              <MessageCircle className="w-5 h-5" />
              Book via WhatsApp
            </a>
            <a
              href="tel:971582947143"
              className={`${styles.buttonBase} ${styles.buttonOrangeOutline}`}
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </div>

        {/* --- Features Grid --- */}
        <section className={styles.sectionContainer}>
          <div className={`${styles.textCenter} mb-8`}>
            <h2 className={styles.sectionHeading}>
              Your Gateway to Comfort &amp; Convenience
            </h2>
            <p className={styles.sectionSubheading}>
              Skip the taxi queues and travel in style with Luxury In Motions
              premium airport transfer service. We provide door-to-door
              transportation with professional chauffeurs and luxury vehicles.
            </p>
          </div>
          <div className={styles.cardsGrid}>
            {/* Feature 1 */}
            <div className={styles.card}>
              <div className={styles.cardContentFlex}>
                <div className={styles.iconWrapperCircle}>
                  <Clock />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>24/7 Availability</h3>
                  <p className={styles.cardText}>
                    Round-the-clock service for all flight schedules
                  </p>
                </div>
              </div>
            </div>
            {/* Feature 2 */}
            <div className={styles.card}>
              <div className={styles.cardContentFlex}>
                <div className={styles.iconWrapperCircle}>
                  <MapPin />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>Meet &amp; Greet Service</h3>
                  <p className={styles.cardText}>
                    Professional chauffeur waiting at arrivals with your name
                    board
                  </p>
                </div>
              </div>
            </div>
            {/* Feature 3 */}
            <div className={styles.card}>
              <div className={styles.cardContentFlex}>
                <div className={styles.iconWrapperCircle}>
                  <Luggage />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>Luggage Assistance</h3>
                  <p className={styles.cardText}>
                    Help with your luggage from terminal to vehicle
                  </p>
                </div>
              </div>
            </div>
            {/* Feature 4 */}
            <div className={styles.card}>
              <div className={styles.cardContentFlex}>
                <div className={styles.iconWrapperCircle}>
                  <Shield />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>Flight Monitoring</h3>
                  <p className={styles.cardText}>
                    We track your flight for delays and adjust pickup
                    accordingly
                  </p>
                </div>
              </div>
            </div>
            {/* Feature 5 */}
            <div className={styles.card}>
              <div className={styles.cardContentFlex}>
                <div className={styles.iconWrapperCircle}>
                  <Users />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>All Group Sizes</h3>
                  <p className={styles.cardText}>
                    From luxury sedans to spacious vans for families
                  </p>
                </div>
              </div>
            </div>
            {/* Feature 6 */}
            <div className={styles.card}>
              <div className={styles.cardContentFlex}>
                <div className={styles.iconWrapperCircle}>
                  <Wifi />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>In-Car Amenities</h3>
                  <p className={styles.cardText}>
                    Complimentary WiFi, water, and phone chargers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- How It Works Section --- */}
        <section className={styles.howItWorksSection}>
          <div className={styles.container}>
            <div className={`${styles.textCenter} mb-12`}>
              <h2 className={styles.sectionHeading}>
                How Airport Transfer Works
              </h2>
              <p className={styles.sectionSubheading}>
                Simple booking process for a seamless journey
              </p>
            </div>
            <div className={styles.stepsGrid}>
              {/* Step 1 */}
              <div className={styles.stepItem}>
                <div className={styles.stepNumberContainer}>
                  <div className={styles.stepNumberCircle}>1</div>
                  <div className={styles.stepConnector}></div>
                </div>
                <h3 className={styles.cardTitle}>Book Your Transfer</h3>
                <p className={styles.cardText}>
                  Contact us via WhatsApp or phone with your flight details
                </p>
              </div>
              {/* Step 2 */}
              <div className={styles.stepItem}>
                <div className={styles.stepNumberContainer}>
                  <div className={styles.stepNumberCircle}>2</div>
                  <div className={styles.stepConnector}></div>
                </div>
                <h3 className={styles.cardTitle}>Receive Confirmation</h3>
                <p className={styles.cardText}>
                  Get instant confirmation with driver and vehicle details
                </p>
              </div>
              {/* Step 3 */}
              <div className={styles.stepItem}>
                <div className={styles.stepNumberContainer}>
                  <div className={styles.stepNumberCircle}>3</div>
                  <div className={styles.stepConnector}></div>
                </div>
                <h3 className={styles.cardTitle}>Meet Your Driver</h3>
                <p className={styles.cardText}>
                  Your chauffeur will be waiting at arrivals with a name board
                </p>
              </div>
              {/* Step 4 */}
              <div className={styles.stepItem}>
                <div className={styles.stepNumberContainer}>
                  <div className={styles.stepNumberCircle}>4</div>
                </div>
                <h3 className={styles.cardTitle}>Enjoy Your Ride</h3>
                <p className={styles.cardText}>
                  Relax in luxury as we take you to your destination
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Enhance Your Transfer Section --- */}
        <section className={styles.sectionContainer}>
          <div className={`${styles.textCenter} mb-8`}>
            <h2 className={styles.sectionHeading}>Enhance Your Transfer</h2>
            <p className={styles.sectionSubheading}>
              Additional services to make your journey even more comfortable
            </p>
          </div>
          <div className={styles.cardsGridFour}>
            <div
              className={`${styles.card} ${styles.cardCentered} ${styles.textCenter}`}
            >
              <div className={styles.iconWrapperCircle}>
                <Coffee />
              </div>
              <h3 className={styles.fontSemibold + " mb-2"}>Refreshments</h3>
              <p className={styles.cardText}>Complimentary water and snacks</p>
            </div>
            <div
              className={`${styles.card} ${styles.cardCentered} ${styles.textCenter}`}
            >
              <div className={styles.iconWrapperCircle}>
                <Wifi />
              </div>
              <h3 className={styles.fontSemibold + " mb-2"}>Free WiFi</h3>
              <p className={styles.cardText}>Stay connected during your ride</p>
            </div>
            <div
              className={`${styles.card} ${styles.cardCentered} ${styles.textCenter}`}
            >
              <div className={styles.iconWrapperCircle}>
                <Users />
              </div>
              <h3 className={styles.fontSemibold + " mb-2"}>Child Seats</h3>
              <p className={styles.cardText}>
                Safe travel for young passengers
              </p>
            </div>
            <div
              className={`${styles.card} ${styles.cardCentered} ${styles.textCenter}`}
            >
              <div className={styles.iconWrapperCircle}>
                <Zap />
              </div>
              <h3 className={styles.fontSemibold + " mb-2"}>Fast Track</h3>
              <p className={styles.cardText}>
                Priority service for urgent transfers
              </p>
            </div>
          </div>
        </section>

        {/* --- Why Choose Us Section --- */}
        <section className={styles.whyChooseSection}>
          <div className={styles.whyChooseContainer}>
            <h2 className={styles.sectionHeading + " mb-8"}>
              Why Choose Luxury In Motion?
            </h2>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitsList}>
                <div className={styles.benefitItem}>
                  <CheckCircle2 />
                  <span>Professional, licensed chauffeurs</span>
                </div>
                <div className={styles.benefitItem}>
                  <CheckCircle2 />
                  <span>Luxury fleet of latest model vehicles</span>
                </div>
                <div className={styles.benefitItem}>
                  <CheckCircle2 />
                  <span>Real-time flight tracking</span>
                </div>
                <div className={styles.benefitItem}>
                  <CheckCircle2 />
                  <span>Fixed rates with no hidden charges</span>
                </div>
                <div className={styles.benefitItem}>
                  <CheckCircle2 />
                  <span>60 minutes free waiting time</span>
                </div>
              </div>
              <div className={styles.benefitsList}>
                <div className={styles.benefitItem}>
                  <CheckCircle2 />
                  <span>24/7 customer support</span>
                </div>
                <div className={styles.benefitItem}>
                  <CheckCircle2 />
                  <span>Multi-lingual drivers</span>
                </div>
                <div className={styles.benefitItem}>
                  <CheckCircle2 />
                  <span>Corporate accounts available</span>
                </div>
                <div className={styles.benefitItem}>
                  <CheckCircle2 />
                  <span>Baby seats on request</span>
                </div>
                <div className={styles.benefitItem}>
                  <CheckCircle2 />
                  <span>COVID-19 safety protocols</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQ Section --- */}
        <section className={styles.faqSection}>
          <div className={`${styles.textCenter} mb-8`}>
            <h2 className={styles.sectionHeading}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className={styles.faqContainer}>
            <div className={styles.faqStack}>
              <div className={styles.card}>
                <h3 className={styles.faqQuestion}>
                  How far in advance should I book my airport transfer?
                </h3>
                <p className={styles.cardText}>
                  We recommend booking at least 24 hours in advance. However, we
                  also accept last-minute bookings subject to availability.
                </p>
              </div>
              <div className={styles.card}>
                <h3 className={styles.faqQuestion}>
                  What if my flight is delayed?
                </h3>
                <p className={styles.cardText}>
                  We monitor all flights in real-time. If your flight is
                  delayed, we automatically adjust your pickup time at no extra
                  charge.
                </p>
              </div>
              <div className={styles.card}>
                <h3 className={styles.faqQuestion}>
                  Is the price per person or per vehicle?
                </h3>
                <p className={styles.cardText}>
                  Our prices are per vehicle, not per person. The rate includes
                  the vehicle, driver, and all passengers up to the vehicles
                  capacity.
                </p>
              </div>
              <div className={styles.card}>
                <h3 className={styles.faqQuestion}>
                  Do you provide child seats?
                </h3>
                <p className={styles.cardText}>
                  Yes, we provide child seats free of charge. Please mention
                  this requirement when booking.
                </p>
              </div>
              <div className={styles.card}>
                <h3 className={styles.faqQuestion}>What areas do you cover?</h3>
                <p className={styles.cardText}>
                  We provide transfers between Dubai airports and any location
                  within the UAE, including Abu Dhabi, Sharjah, and other
                  emirates.
                </p>
              </div>
              <div className={styles.card}>
                <h3 className={styles.faqQuestion}>
                  How will I find my driver at the airport?
                </h3>
                <p className={styles.cardText}>
                  Your driver will be waiting at the arrivals hall with a name
                  board showing your name. Well also send you the drivers
                  contact details.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Final CTA Section --- */}
        <section className={styles.finalCtaSection}>
          <div className={styles.finalCtaBackground}></div>
          <div className={styles.finalCtaContent}>
            <div className="mb-8">
              <h2 className={styles.finalCtaHeading}>
                Ready for a Seamless Airport Transfer?
              </h2>
              <p className={styles.finalCtaText}>
                Book your luxury airport transfer now and travel in{" "}
                <span
                  className={`${styles.textPrimary} ${styles.fontSemibold}`}
                >
                  comfort and style
                </span>
                .
              </p>
            </div>
            <div className={styles.finalCtaButtons}>
              <a
                href="https://wa.me/971582947143?text=Hi, I need an airport transfer service"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.buttonBase} ${styles.buttonGreen} ${styles.buttonLarge}`}
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
              <a
                href="tel:971582947143"
                className={`${styles.buttonBase} ${styles.buttonOrangeOutline} ${styles.buttonLarge}`}
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
            </div>
          </div>
          <div
            className={`${styles.glowOrb} hidden lg:flex`}
            style={{ bottom: "-15rem", left: "60%" }}
          ></div>
        </section>
      </div>
    </main>
  );
};

export default AirportTransfer;
