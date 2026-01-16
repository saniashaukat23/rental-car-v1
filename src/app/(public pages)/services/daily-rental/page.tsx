import React from "react";
import {
  CheckCircle2,
  Car,
} from "lucide-react";
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
  { icon: "Clock", title: "24/7 Service", subtitle: "Always Available" },
  { icon: "Shield", title: "Full Insurance", subtitle: "Fully Covered" },
  { icon: "MapPin", title: "Free Delivery", subtitle: "Dubai Wide" },
  { icon: "Truck", title: "Instant Booking", subtitle: "Quick Process" },
  { icon: "Users", title: "Expert Support", subtitle: "Professional Team" },
  { icon: "Zap", title: "Premium Fleet", subtitle: "50+ Cars" },
];

const benefits = [
  { icon: "CheckCircle2", title: "No hidden charges or fees", iconColor: "#22c55e" },
  { icon: "CheckCircle2", title: "Flexible pickup times", iconColor: "#22c55e" },
  { icon: "CheckCircle2", title: "Sanitized vehicles", iconColor: "#22c55e" },
  { icon: "CheckCircle2", title: "Child seats available", iconColor: "#22c55e" },
  { icon: "CheckCircle2", title: "24/7 roadside assistance", iconColor: "#22c55e" },
  { icon: "CheckCircle2", title: "Chauffeur Service", iconColor: "#22c55e" },
  { icon: "CheckCircle2", title: "250 km included", iconColor: "#22c55e" },
  { icon: "CheckCircle2", title: "Easy cancellation", iconColor: "#22c55e" },
  { icon: "CheckCircle2", title: "Instant confirmation", iconColor: "#22c55e" },
];

const steps = [
  { icon: "Car", title: "Choose Your Car", description: "Browse our premium fleet and select the perfect luxury car for your day" },
  { icon: "Clock", title: "Select Duration", description: "Pick your rental time from 24 hours onwards with flexible extensions" },
  { icon: "MessageCircle", title: "Book Instantly", description: "Complete booking via WhatsApp or phone with instant confirmation" },
  { icon: "MapPin", title: "Free Delivery", description: "We deliver to your location anywhere in Dubai within 2 hours" },
];

const rates = [
  { icon: "Car", title: "Economy Luxury", price: "From AED 400", period: "per day" },
  { icon: "Zap", title: "Premium Sports", price: "From AED 900", period: "per day", highlighted: true },
  { icon: "Star", title: "Ultra Luxury", price: "From AED 2000", period: "per day" },
];

const DailyCarRental = () => {
  return (
    <main className={styles.mainWrapper}>
      <div className={styles.container}>
        <ServiceHero
          title="DAILY CAR RENTAL IN DUBAI"
          description={
            <>
              Experience the freedom of luxury with our{" "}
              <span className={`${styles.textPrimary} ${styles.fontSemibold}`}>
                premium daily rental service
              </span>
              . Perfect for business trips, special occasions, or exploring Dubai in style.
            </>
          }
          whatsappMessage="Hi, I need a car for daily rental"
        />

        <FeatureGrid title="Why Choose Daily Rental" features={features} />

        <BenefitsGrid
          title="Daily Rental Benefits"
          subtitle="Everything you need for the perfect day"
          benefits={benefits}
          variant="simple"
        />

        <ProcessSteps
          title="How Daily Rental Works"
          subtitle={
            <>
              Simple steps to get your{" "}
              <span className={`${styles.textPrimary} ${styles.fontSemibold}`}>
                luxury car delivered
              </span>{" "}
              today
            </>
          }
          steps={steps}
        />

        <RatesGrid
          title="Transparent Daily Rates"
          subtitle={
            <>
              All-inclusive pricing with{" "}
              <span className={`${styles.textPrimary} ${styles.fontSemibold}`}>
                no hidden fees
              </span>
            </>
          }
          rates={rates}
        />

        <ServiceCTA
          title="Ready for Your {highlight} Today"
          highlightedWord="Daily Adventure"
          description="Book your daily rental now and experience Dubai in luxury. It's that simple."
          subdescription="We're available 24/7 with instant confirmation for your convenience"
          whatsappMessage="Hi, I need a car for daily rental"
        />
      </div>
    </main>
  );
};

export default DailyCarRental;
