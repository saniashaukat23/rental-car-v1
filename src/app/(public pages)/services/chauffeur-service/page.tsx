import React from "react";
import {
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
import {
  ServiceHero,
  ProcessSteps,
  FAQSection,
  ServiceCTA,
} from "../../../../components/services";
import styles from "../../../../styles/frontend/services.module.css";

const features = [
  { icon: UserCheck, title: "Professional Chauffeurs", description: "Experienced, multilingual drivers with extensive local knowledge" },
  { icon: Clock, title: "Flexible Booking", description: "Hourly, daily, or custom packages tailored to your needs" },
  { icon: Shield, title: "Safety & Security", description: "Background-checked drivers and fully insured luxury vehicles" },
  { icon: Globe, title: "International Standards", description: "Premium service quality meeting global luxury standards" },
  { icon: Award, title: "VIP Treatment", description: "Discreet, professional service for executives and celebrities" },
  { icon: Wifi, title: "Premium Amenities", description: "WiFi, refreshments, phone chargers, and newspapers" },
];

const steps = [
  { icon: "Clock", title: "Choose Your Package", description: "Select hourly, daily, or event chauffeur service" },
  { icon: "Car", title: "Select Your Vehicle", description: "Pick from our fleet of luxury cars and SUVs" },
  { icon: "MessageCircle", title: "Book Your Service", description: "Confirm your booking via WhatsApp or phone" },
  { icon: "Award", title: "Enjoy VIP Service", description: "Your professional chauffeur arrives on time" },
];

const popularServices = [
  { icon: Briefcase, title: "Business Travel", description: "Professional transportation for corporate meetings" },
  { icon: Heart, title: "Wedding Service", description: "Luxury vehicles for your special day" },
  { icon: MapPin, title: "City Tours", description: "Explore Dubai with a knowledgeable chauffeur" },
  { icon: Star, title: "VIP Events", description: "Red carpet service for galas and premieres" },
];

const benefits = [
  "Professional, uniformed chauffeurs",
  "Luxury fleet of latest models",
  "Punctual and reliable service",
  "Multilingual drivers available",
  "Complimentary refreshments",
  "24/7 availability",
  "Corporate accounts welcome",
  "Flexible cancellation policy",
  "Real-time GPS tracking",
  "Competitive pricing",
];

const faqs = [
  { question: "What is the minimum booking duration?", answer: "Our minimum booking is 3 hours for hourly chauffeur service. For special events or airport transfers, we offer flexible packages." },
  { question: "Can I book a chauffeur for multiple days?", answer: "Yes, we offer daily, weekly, and monthly chauffeur packages with special rates for extended bookings." },
  { question: "Are your chauffeurs trained professionals?", answer: "All our chauffeurs are professionally trained, licensed, and undergo regular background checks. They are experienced in providing discrete, high-quality service." },
  { question: "Can I request a specific vehicle?", answer: "Yes, you can choose from our fleet of luxury vehicles including Mercedes, BMW, Audi, and other premium brands based on availability." },
  { question: "Do you provide chauffeur service outside Dubai?", answer: "Yes, we provide chauffeur services throughout the UAE including Abu Dhabi, Sharjah, and other emirates." },
  { question: "What is included in the chauffeur service?", answer: "Our service includes a professional uniformed chauffeur, luxury vehicle, fuel, insurance, and complimentary amenities like water and WiFi." },
];

const ChauffeurService = () => {
  return (
    <main className={styles.mainWrapper}>
      <div className={styles.container}>
        <ServiceHero
          title="Premium Chauffeur Service in Dubai"
          description={
            <>
              Experience luxury transportation with professional drivers and premium vehicles.
              Travel in{" "}
              <span className={`${styles.textPrimary} ${styles.fontSemibold}`}>
                comfort and style
              </span>{" "}
              for any occasion.
            </>
          }
          whatsappMessage="Hi, I need a chauffeur service"
          ctaLabel={{ whatsapp: "Book via WhatsApp", call: "Call Now" }}
        />

        {/* Features Grid */}
        <section className={styles.sectionMargin}>
          <div className={styles.textCenter} style={{ marginBottom: "2rem" }}>
            <h2 className={styles.sectionTitle}>Your Personal Driver, Your Schedule</h2>
            <p className={styles.sectionDesc}>
              Whether it&apos;s a business meeting, special event, or leisurely city tour, our professional chauffeurs ensure you arrive in style.
            </p>
          </div>
          <div className={styles.gridThree}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className={styles.benefitCard}>
                  <div className={styles.processIconBox}>
                    <Icon className={styles.iconMedium} />
                  </div>
                  <div>
                    <h3 className={`${styles.fontSize1rem} ${styles.fontWeight600} ${styles.mb0_25rem}`}>{feature.title}</h3>
                    <p className={styles.textMuted}>{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <ProcessSteps
          title="How Chauffeur Service Works"
          subtitle="Simple booking process for premium transportation"
          steps={steps}
          variant="numbered"
        />

        {/* Fleet Link */}
        <section className={`${styles.sectionMargin} ${styles.textCenter}`}>
          <h3 className={`${styles.fontSize1_5rem} ${styles.fontWeight700} ${styles.mb1rem}`}>Our Premium Fleet</h3>
          <p className={`${styles.sectionDesc} ${styles.mb2rem}`}>
            Travel in luxury with our carefully selected premium vehicles
          </p>
          <a className={`${styles.btn} ${styles.btnGreen}`} href="/cars">
            View All Vehicles
            <Car className={`${styles.iconSize} ${styles.ml0_5rem}`} />
          </a>
        </section>

        {/* Popular Services */}
        <section className={styles.sectionMargin}>
          <div className={styles.textCenter} style={{ marginBottom: "2rem" }}>
            <h2 className={styles.sectionTitle}>Popular Chauffeur Services</h2>
            <p className={styles.sectionDesc}>Tailored solutions for every occasion</p>
          </div>
          <div className={styles.gridFour}>
            {popularServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className={styles.servicesCard}>
                  <div className={`${styles.processIconBox} ${styles.iconBoxCentered}`}>
                    <Icon className={styles.iconMedium} />
                  </div>
                  <h3 className={`${styles.fontWeight600} ${styles.mb0_5rem}`}>{service.title}</h3>
                  <p className={styles.textMuted}>{service.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why Choose Section */}
        <section className={styles.whyChooseSection}>
          <div className={`${styles.maxW56rem} ${styles.mxAuto} ${styles.textCenter}`}>
            <h2 className={`${styles.sectionTitle} ${styles.mb2rem}`}>
              Why Choose Our Chauffeur Service?
            </h2>
            <div className={`${styles.checklistGrid} ${styles.textLeft}`}>
              <div>
                {benefits.slice(0, 5).map((benefit, index) => (
                  <div key={index} className={styles.checklistItem}>
                    <CheckCircle2 className={`${styles.checkIcon} ${styles.iconSmall}`} />
                    <span className={styles.fontSize0_875rem}>{benefit}</span>
                  </div>
                ))}
              </div>
              <div>
                {benefits.slice(5).map((benefit, index) => (
                  <div key={index} className={styles.checklistItem}>
                    <CheckCircle2 className={`${styles.checkIcon} ${styles.iconSmall}`} />
                    <span className={styles.fontSize0_875rem}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FAQSection faqs={faqs} />

        <ServiceCTA
          title="Ready to Experience {highlight}?"
          highlightedWord="Luxury"
          description="Book your professional chauffeur today and travel in comfort and style."
          whatsappMessage="Hi, I need a chauffeur service"
        />
      </div>
    </main>
  );
};

export default ChauffeurService;
