import React from "react";
import {
  Clock,
  MapPin,
  Luggage,
  Shield,
  Users,
  Wifi,
  Coffee,
  Zap,
  CheckCircle2,
} from "lucide-react";
import {
  ServiceHero,
  ProcessSteps,
  FAQSection,
  ServiceCTA,
} from "../../../../components/services";
import styles from "../../../../styles/frontend/services.module.css";

const features = [
  { icon: Clock, title: "24/7 Availability", description: "Round-the-clock service for all flight schedules" },
  { icon: MapPin, title: "Meet & Greet Service", description: "Professional chauffeur waiting at arrivals with your name board" },
  { icon: Luggage, title: "Luggage Assistance", description: "Help with your luggage from terminal to vehicle" },
  { icon: Shield, title: "Flight Monitoring", description: "We track your flight for delays and adjust pickup accordingly" },
  { icon: Users, title: "All Group Sizes", description: "From luxury sedans to spacious vans for families" },
  { icon: Wifi, title: "In-Car Amenities", description: "Complimentary WiFi, water, and phone chargers" },
];

const enhanceItems = [
  { icon: Coffee, title: "Refreshments", description: "Complimentary water and snacks" },
  { icon: Wifi, title: "Free WiFi", description: "Stay connected during your ride" },
  { icon: Users, title: "Child Seats", description: "Safe travel for young passengers" },
  { icon: Zap, title: "Fast Track", description: "Priority service for urgent transfers" },
];

const steps = [
  { icon: "MessageCircle", title: "Book Your Transfer", description: "Contact us via WhatsApp or phone with your flight details" },
  { icon: "Shield", title: "Receive Confirmation", description: "Get instant confirmation with driver and vehicle details" },
  { icon: "MapPin", title: "Meet Your Driver", description: "Your chauffeur will be waiting at arrivals with a name board" },
  { icon: "CheckCircle2", title: "Enjoy Your Ride", description: "Relax in luxury as we take you to your destination" },
];

const benefits = [
  "Professional, licensed chauffeurs",
  "Luxury fleet of latest model vehicles",
  "Real-time flight tracking",
  "Fixed rates with no hidden charges",
  "60 minutes free waiting time",
  "24/7 customer support",
  "Multi-lingual drivers",
  "Corporate accounts available",
  "Baby seats on request",
  "COVID-19 safety protocols",
];

const faqs = [
  { question: "How far in advance should I book my airport transfer?", answer: "We recommend booking at least 24 hours in advance. However, we also accept last-minute bookings subject to availability." },
  { question: "What if my flight is delayed?", answer: "We monitor all flights in real-time. If your flight is delayed, we automatically adjust your pickup time at no extra charge." },
  { question: "Is the price per person or per vehicle?", answer: "Our prices are per vehicle, not per person. The rate includes the vehicle, driver, and all passengers up to the vehicle's capacity." },
  { question: "Do you provide child seats?", answer: "Yes, we provide child seats free of charge. Please mention this requirement when booking." },
  { question: "What areas do you cover?", answer: "We provide transfers between Dubai airports and any location within the UAE, including Abu Dhabi, Sharjah, and other emirates." },
  { question: "How will I find my driver at the airport?", answer: "Your driver will be waiting at the arrivals hall with a name board showing your name. We'll also send you the driver's contact details." },
];

const AirportTransfer = () => {
  return (
    <main className={styles.mainWrapper}>
      <div className={styles.container}>
        <ServiceHero
          title="Premium Airport Transfer Service in Dubai"
          description={
            <>
              Seamless, luxurious transportation between Dubai airports and your destination.
              Experience{" "}
              <span className={`${styles.textPrimary} ${styles.fontSemibold}`}>
                comfort and convenience
              </span>{" "}
              with our professional chauffeur service.
            </>
          }
          whatsappMessage="Hi, I need an airport transfer service"
          ctaLabel={{ whatsapp: "Book via WhatsApp", call: "Call Now" }}
        />

        {/* Features Grid */}
        <section className={styles.sectionMargin}>
          <div className={styles.textCenter} style={{ marginBottom: "2rem" }}>
            <h2 className={styles.sectionTitle}>Your Gateway to Comfort & Convenience</h2>
            <p className={styles.sectionDesc}>
              Skip the taxi queues and travel in style with Luxury In Motion&apos;s premium airport transfer service.
            </p>
          </div>
          <div className={styles.gridThree}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className={styles.benefitCard} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={styles.processIconBox}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.25rem" }}>{feature.title}</h3>
                    <p className={styles.textMuted}>{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <ProcessSteps
          title="How Airport Transfer Works"
          subtitle="Simple booking process for a seamless journey"
          steps={steps}
          variant="numbered"
        />

        {/* Enhance Your Transfer */}
        <section className={styles.sectionMargin}>
          <div className={styles.textCenter} style={{ marginBottom: "2rem" }}>
            <h2 className={styles.sectionTitle}>Enhance Your Transfer</h2>
            <p className={styles.sectionDesc}>Additional services to make your journey even more comfortable</p>
          </div>
          <div className={styles.gridFour}>
            {enhanceItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className={styles.servicesCard} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={`${styles.processIconBox} ${styles.iconBoxCentered}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>{item.title}</h3>
                  <p className={styles.textMuted}>{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why Choose Section */}
        <section className={styles.whyChooseSection}>
          <div style={{ maxWidth: "56rem", margin: "0 auto", textAlign: "center" }}>
            <h2 className={styles.sectionTitle} style={{ marginBottom: "2rem" }}>
              Why Choose Luxury In Motion?
            </h2>
            <div className={styles.checklistGrid} style={{ textAlign: "left" }}>
              <div>
                {benefits.slice(0, 5).map((benefit, index) => (
                  <div key={index} className={styles.checklistItem}>
                    <CheckCircle2 className={`${styles.checkIcon} w-5 h-5`} />
                    <span style={{ fontSize: "0.875rem" }}>{benefit}</span>
                  </div>
                ))}
              </div>
              <div>
                {benefits.slice(5).map((benefit, index) => (
                  <div key={index} className={styles.checklistItem}>
                    <CheckCircle2 className={`${styles.checkIcon} w-5 h-5`} />
                    <span style={{ fontSize: "0.875rem" }}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FAQSection faqs={faqs} />

        <ServiceCTA
          title="Ready for a Seamless {highlight}?"
          highlightedWord="Airport Transfer"
          description="Book your luxury airport transfer now and travel in comfort and style."
          whatsappMessage="Hi, I need an airport transfer service"
        />
      </div>
    </main>
  );
};

export default AirportTransfer;
