import React from "react";
import { Car, CheckCircle2 } from "lucide-react";
import {
  ServiceHero,
  FeatureGrid,
  BenefitsGrid,
  ProcessSteps,
  RatesGrid,
  ServiceCTA,
} from "../../../../components/services";
import styles from "../../../../styles/frontend/services.module.css";

const features = [
  { icon: "Percent", title: "Best Value", subtitle: "Special Monthly Rates" },
  { icon: "Shield", title: "Full Coverage", subtitle: "Premium Insurance" },
  { icon: "House", title: "Long-Term", subtitle: "Ideal for Residents" },
  { icon: "Calendar", title: "Flexible Terms", subtitle: "30+ Days" },
  { icon: "Award", title: "VIP Support", subtitle: "Priority Service" },
  { icon: "Zap", title: "Monthly Mileage", subtitle: "4500 km included" },
];

const benefits = [
  { icon: "CheckCircle2", title: "Maximum Savings", description: "Special discounted monthly rates", iconColor: "#22c55e" },
  { icon: "Shield", title: "Security Deposit", description: "AED 1000 - 5000", iconColor: "#3b82f6" },
  { icon: "MapPin", title: "Monthly Mileage", description: "4500 km included", iconColor: "#a855f7" },
  { icon: "Zap", title: "Extra Mileage", description: "AED 210/km after limit", iconColor: "#f97316" },
  { icon: "Users", title: "Chauffeur Service", description: "Available on request", iconColor: "#6366f1" },
  { icon: "Truck", title: "Free Delivery", description: "Dubai & UAE wide", iconColor: "#14b8a6" },
  { icon: "FileText", title: "Simple Documentation", description: "Easy paperwork process", iconColor: "#ef4444" },
  { icon: "CreditCard", title: "Flexible Payment", description: "Multiple payment options", iconColor: "#6b7280" },
  { icon: "Award", title: "VIP Treatment", description: "Priority service for monthly clients", iconColor: "#eab308" },
  { icon: "CheckCircle2", title: "Full Insurance", description: "Comprehensive coverage included", iconColor: "#22c55e" },
  { icon: "Calendar", title: "Flexible Extension", description: "Easy contract extension", iconColor: "#ec4899" },
  { icon: "Clock", title: "24/7 Support", description: "Round-the-clock assistance", iconColor: "#06b6d4" },
];

const steps = [
  { icon: "Car", title: "Choose Your Car", description: "Select from our premium fleet for your monthly needs" },
  { icon: "Calendar", title: "Select Duration", description: "Choose 30 days or more with flexible extension options" },
  { icon: "Percent", title: "Maximum Savings", description: "Enjoy significant discounts compared to daily rates" },
  { icon: "House", title: "Hassle-Free Living", description: "Perfect solution for residents and long-term visitors" },
];

const rates = [
  { icon: "Car", title: "Economy Luxury", price: "From AED 3250", period: "per month", savings: "Save AED 4250" },
  { icon: "Zap", title: "Premium Sports", price: "From AED 11500", period: "per month", savings: "Save AED 3500", highlighted: true },
  { icon: "Star", title: "Ultra Luxury", price: "From AED 35000", period: "per month", savings: "Save AED 13000" },
];

const textBlocks = [
  {
    title: "For New Residents",
    description: "Just moved to Dubai? Our monthly rental gives you the flexibility to explore the city while you settle in. No long-term commitments, no purchase hassles.",
    points: ["No UAE credit history required", "Flexible terms while you settle", "Switch vehicles as needed"],
  },
  {
    title: "For Business Professionals",
    description: "Extended business assignment in Dubai? Enjoy the convenience of a premium car without the commitment of ownership or yearly contracts.",
    points: ["Corporate billing available", "Executive vehicle options", "Chauffeur service available"],
  },
  {
    title: "Cost-Effective Solution",
    description: "Monthly rental eliminates the hidden costs of car ownership while providing maximum flexibility and value.",
    points: ["No registration or insurance fees", "No maintenance costs", "No depreciation worries"],
  },
  {
    title: "Ultimate Flexibility",
    description: "Life changes, and so should your car. With monthly rental, adapt your vehicle choice to your current needs.",
    points: ["Upgrade or downgrade anytime", "No long-term contracts", "Easy extension or termination"],
  },
];

const MonthlyCarRental = () => {
  return (
    <main className={styles.mainWrapper}>
      <div className={styles.container}>
        <ServiceHero
          title="MONTHLY CAR RENTAL IN DUBAI"
          description={
            <>
              Maximum savings with our{" "}
              <span className={`${styles.textPrimary} ${styles.fontSemibold}`}>
                premium monthly rental service
              </span>
              . Perfect for long-term stays, relocations, or extended business assignments in the UAE.
            </>
          }
          whatsappMessage="Hi, I need a car for monthly rental"
        />

        <FeatureGrid title="Why Choose Monthly Rental" features={features} />

        {/* View All Cars Button */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "3rem" }}>
          <a className={`${styles.btn} ${styles.btnGreen}`} href="/cars">
            View All Cars
            <Car className="w-4 h-4" style={{ marginLeft: "0.5rem" }} />
          </a>
        </div>

        <BenefitsGrid
          title="Monthly Rental Benefits & Details"
          subtitle="Comprehensive benefits for long-term rentals"
          benefits={benefits}
        />

        <ProcessSteps
          title="How Monthly Rental Works"
          subtitle={
            <>
              Simple process for{" "}
              <span className={`${styles.textPrimary} ${styles.fontSemibold}`}>
                long-term luxury car rental
              </span>
            </>
          }
          steps={steps}
        />

        <RatesGrid
          title="Exclusive Monthly Rates"
          subtitle={
            <>
              Best value pricing with{" "}
              <span className={`${styles.textPrimary} ${styles.fontSemibold}`}>
                maximum monthly savings
              </span>
            </>
          }
          rates={rates}
        />

        {/* Why Choose Monthly - Text Blocks */}
        <section className={styles.sectionMargin}>
          <div className={styles.textCenter} style={{ marginBottom: "2rem" }}>
            <h2 className={styles.sectionTitle}>Why Choose Monthly Rental</h2>
            <p className={styles.textMuted} style={{ maxWidth: "42rem", margin: "0 auto" }}>
              Perfect solution for{" "}
              <span className={`${styles.textPrimary} ${styles.fontSemibold}`}>
                residents and long-term visitors
              </span>
            </p>
          </div>
          <div className={styles.textBlocksGrid}>
            {textBlocks.map((block, index) => (
              <div key={index} className={styles.textBlockCard} style={{ animationDelay: `${index * 0.1}s` }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.75rem" }}>{block.title}</h3>
                <p className={styles.textMuted} style={{ marginBottom: "1rem" }}>{block.description}</p>
                <ul className={styles.listStack}>
                  {block.points.map((point, i) => (
                    <li key={i} className={styles.listItem}>
                      <CheckCircle2 className="w-4 h-4" style={{ color: "#22c55e", marginTop: "0.125rem" }} />
                      <span style={{ fontSize: "0.875rem" }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <ServiceCTA
          title="Start Your {highlight} Journey"
          highlightedWord="Monthly Rental"
          description="Join hundreds of satisfied long-term customers enjoying the freedom of monthly car rental in Dubai."
          subdescription="Maximum savings, minimum commitment, premium experience"
          whatsappMessage="Hi, I need a car for monthly rental"
        />
      </div>
    </main>
  );
};

export default MonthlyCarRental;
