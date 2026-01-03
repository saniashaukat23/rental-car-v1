import React from "react";
import {
  MessageCircle,
  Phone,
  UserCheck,
  Clock,
  Shield,
  Globe,
  Award,
  Wifi,
  Briefcase,
  Heart,
  MapPin,
  Star,
  CheckCircle2,
  Car,
} from "lucide-react";
import styles from "../../../../styles/frontend/chauffeurService.module.css";

const ChauffeurService = () => {
  return (
    <main className={styles.mainWrapper}>
      <div className={styles.container}>
        {/* --- Hero Section --- */}
        <div className={styles.heroSection}>
          <h1 className={styles.heroTitle}>
            Premium Chauffeur Service in Dubai
          </h1>
          <p className={styles.heroDesc}>
            Experience luxury transportation with professional drivers and
            premium vehicles. Travel in{" "}
            <span className={`${styles.textPrimary} ${styles.fontSemibold}`}>
              comfort and style
            </span>{" "}
            for any occasion.
          </p>
          <div className={styles.buttonGroup}>
            <a
              href="https://wa.me/971582947143?text=Hi, I need a chauffeur service"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnGreen}`}
            >
              <MessageCircle className="w-5 h-5" />
              Book via WhatsApp
            </a>
            <a
              href="tel:971582947143"
              className={`${styles.btn} ${styles.btnOutline}`}
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </div>

        {/* --- Features Grid --- */}
        <section className={styles.sectionMargin}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Your Personal Driver, Your Schedule
            </h2>
            <p className={styles.sectionDesc}>
              Whether it's a business meeting, special event, or leisurely city
              tour, our professional chauffeurs ensure you arrive in style and
              comfort with our fleet of luxury vehicles.
            </p>
          </div>
          <div className={styles.gridThree}>
            <div className={styles.featureCard}>
              <div className={styles.featureFlex}>
                <div className={styles.iconBox}>
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Professional Chauffeurs
                  </h3>
                  <p className={styles.textMuted}>
                    Experienced, multilingual drivers with extensive local
                    knowledge
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureFlex}>
                <div className={styles.iconBox}>
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Flexible Booking
                  </h3>
                  <p className={styles.textMuted}>
                    Hourly, daily, or custom packages tailored to your needs
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureFlex}>
                <div className={styles.iconBox}>
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Safety &amp; Security
                  </h3>
                  <p className={styles.textMuted}>
                    Background-checked drivers and fully insured luxury vehicles
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureFlex}>
                <div className={styles.iconBox}>
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    International Standards
                  </h3>
                  <p className={styles.textMuted}>
                    Premium service quality meeting global luxury standards
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureFlex}>
                <div className={styles.iconBox}>
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">VIP Treatment</h3>
                  <p className={styles.textMuted}>
                    Discreet, professional service for executives and
                    celebrities
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureFlex}>
                <div className={styles.iconBox}>
                  <Wifi className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Premium Amenities
                  </h3>
                  <p className={styles.textMuted}>
                    WiFi, refreshments, phone chargers, and newspapers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- How It Works --- */}
        <section className={styles.sectionMargin}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>How Chauffeur Service Works</h2>
            <p className={styles.sectionDesc}>
              Simple booking process for premium transportation
            </p>
          </div>
          <div className={styles.gridFour}>
            <div className={styles.stepItem}>
              <div className={styles.stepNumberContainer}>
                <div className={styles.stepNumberCircle}>1</div>
                <div className={styles.stepConnector}></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Choose Your Package
              </h3>
              <p className={styles.textMuted}>
                Select hourly, daily, or event chauffeur service
              </p>
            </div>
            <div className={styles.stepItem}>
              <div className={styles.stepNumberContainer}>
                <div className={styles.stepNumberCircle}>2</div>
                <div className={styles.stepConnector}></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Select Your Vehicle
              </h3>
              <p className={styles.textMuted}>
                Pick from our fleet of luxury cars and SUVs
              </p>
            </div>
            <div className={styles.stepItem}>
              <div className={styles.stepNumberContainer}>
                <div className={styles.stepNumberCircle}>3</div>
                <div className={styles.stepConnector}></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Book Your Service</h3>
              <p className={styles.textMuted}>
                Confirm your booking via WhatsApp or phone
              </p>
            </div>
            <div className={styles.stepItem}>
              <div className={styles.stepNumberContainer}>
                <div className={styles.stepNumberCircle}>4</div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Enjoy VIP Service</h3>
              <p className={styles.textMuted}>
                Your professional chauffeur arrives on time
              </p>
            </div>
          </div>
        </section>

        {/* --- Fleet Link Section --- */}
        <section className={`${styles.sectionMargin} ${styles.textCenter}`}>
          <h3 className="text-xl md:text-2xl font-bold mb-4">
            Our Premium Fleet
          </h3>
          <p className={`${styles.sectionDesc} mb-8`}>
            Travel in luxury with our carefully selected premium vehicles
          </p>
          <a className={`${styles.btn} ${styles.btnGreen}`} href="/cars">
            View All Vehicles
            <Car className="w-4 h-4 ml-2" />
          </a>
        </section>

        {/* --- Popular Services --- */}
        <section className={styles.sectionMargin}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Popular Chauffeur Services</h2>
            <p className={styles.sectionDesc}>
              Tailored solutions for every occasion
            </p>
          </div>
          <div className={styles.gridFour}>
            <div className={styles.servicesCard}>
              <div className={`${styles.iconBox} ${styles.iconBoxCentered}`}>
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Business Travel</h3>
              <p className={styles.textMuted}>
                Professional transportation for corporate meetings
              </p>
            </div>
            <div className={styles.servicesCard}>
              <div className={`${styles.iconBox} ${styles.iconBoxCentered}`}>
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Wedding Service</h3>
              <p className={styles.textMuted}>
                Luxury vehicles for your special day
              </p>
            </div>
            <div className={styles.servicesCard}>
              <div className={`${styles.iconBox} ${styles.iconBoxCentered}`}>
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">City Tours</h3>
              <p className={styles.textMuted}>
                Explore Dubai with a knowledgeable chauffeur
              </p>
            </div>
            <div className={styles.servicesCard}>
              <div className={`${styles.iconBox} ${styles.iconBoxCentered}`}>
                <Star className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">VIP Events</h3>
              <p className={styles.textMuted}>
                Red carpet service for galas and premieres
              </p>
            </div>
          </div>
        </section>

        {/* --- Why Choose Checklist --- */}
        <section className={styles.whyChooseSection}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`${styles.sectionTitle} mb-8`}>
              Why Choose Our Chauffeur Service?
            </h2>
            <div className={`${styles.checklistGrid} text-left`}>
              <div>
                <div className={styles.checklistItem}>
                  <CheckCircle2 className={`${styles.checkIcon} w-5 h-5`} />
                  <span className="text-sm">
                    Professional, uniformed chauffeurs
                  </span>
                </div>
                <div className={styles.checklistItem}>
                  <CheckCircle2 className={`${styles.checkIcon} w-5 h-5`} />
                  <span className="text-sm">Luxury fleet of latest models</span>
                </div>
                <div className={styles.checklistItem}>
                  <CheckCircle2 className={`${styles.checkIcon} w-5 h-5`} />
                  <span className="text-sm">Punctual and reliable service</span>
                </div>
                <div className={styles.checklistItem}>
                  <CheckCircle2 className={`${styles.checkIcon} w-5 h-5`} />
                  <span className="text-sm">
                    Multilingual drivers available
                  </span>
                </div>
                <div className={styles.checklistItem}>
                  <CheckCircle2 className={`${styles.checkIcon} w-5 h-5`} />
                  <span className="text-sm">Complimentary refreshments</span>
                </div>
              </div>
              <div>
                <div className={styles.checklistItem}>
                  <CheckCircle2 className={`${styles.checkIcon} w-5 h-5`} />
                  <span className="text-sm">24/7 availability</span>
                </div>
                <div className={styles.checklistItem}>
                  <CheckCircle2 className={`${styles.checkIcon} w-5 h-5`} />
                  <span className="text-sm">Corporate accounts welcome</span>
                </div>
                <div className={styles.checklistItem}>
                  <CheckCircle2 className={`${styles.checkIcon} w-5 h-5`} />
                  <span className="text-sm">Flexible cancellation policy</span>
                </div>
                <div className={styles.checklistItem}>
                  <CheckCircle2 className={`${styles.checkIcon} w-5 h-5`} />
                  <span className="text-sm">Real-time GPS tracking</span>
                </div>
                <div className={styles.checklistItem}>
                  <CheckCircle2 className={`${styles.checkIcon} w-5 h-5`} />
                  <span className="text-sm">Competitive pricing</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQ Section --- */}
        <section className={styles.sectionMargin}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          </div>
          <div className={styles.faqContainer}>
            <div className={styles.faqCard}>
              <h3 className={styles.faqQuestion}>
                What is the minimum booking duration?
              </h3>
              <p className={styles.textMuted}>
                Our minimum booking is 3 hours for hourly chauffeur service. For
                special events or airport transfers, we offer flexible packages.
              </p>
            </div>
            <div className={styles.faqCard}>
              <h3 className={styles.faqQuestion}>
                Can I book a chauffeur for multiple days?
              </h3>
              <p className={styles.textMuted}>
                Yes, we offer daily, weekly, and monthly chauffeur packages with
                special rates for extended bookings.
              </p>
            </div>
            <div className={styles.faqCard}>
              <h3 className={styles.faqQuestion}>
                Are your chauffeurs trained professionals?
              </h3>
              <p className={styles.textMuted}>
                All our chauffeurs are professionally trained, licensed, and
                undergo regular background checks. They are experienced in
                providing discrete, high-quality service.
              </p>
            </div>
            <div className={styles.faqCard}>
              <h3 className={styles.faqQuestion}>
                Can I request a specific vehicle?
              </h3>
              <p className={styles.textMuted}>
                Yes, you can choose from our fleet of luxury vehicles including
                Mercedes, BMW, Audi, and other premium brands based on
                availability.
              </p>
            </div>
            <div className={styles.faqCard}>
              <h3 className={styles.faqQuestion}>
                Do you provide chauffeur service outside Dubai?
              </h3>
              <p className={styles.textMuted}>
                Yes, we provide chauffeur services throughout the UAE including
                Abu Dhabi, Sharjah, and other emirates.
              </p>
            </div>
            <div className={styles.faqCard}>
              <h3 className={styles.faqQuestion}>
                What is included in the chauffeur service?
              </h3>
              <p className={styles.textMuted}>
                Our service includes a professional uniformed chauffeur, luxury
                vehicle, fuel, insurance, and complimentary amenities like water
                and WiFi.
              </p>
            </div>
          </div>
        </section>

        {/* --- Final CTA Section --- */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaBlurBg}>
            <div className={`${styles.blurBlob} ${styles.blobRight}`}></div>
          </div>
          <div className={styles.ctaContent}>
            <div className="mb-8">
              <h2 className={`${styles.sectionTitle} mb-6`}>
                Ready to Experience Luxury?
              </h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
                Book your professional chauffeur today and travel in{" "}
                <span
                  className={`${styles.textPrimary} ${styles.fontSemibold}`}
                >
                  comfort and style
                </span>
                .
              </p>
            </div>
            <div className={styles.buttonGroup}>
              <a
                href="https://wa.me/971582947143?text=Hi, I need a chauffeur service"
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
                Call Now
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ChauffeurService;
