import React from "react";
import { Car } from "lucide-react";
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
  { icon: "Percent", title: "Best Rates", subtitle: "Weekly Discount" },
  { icon: "Shield", title: "Full Insurance", subtitle: "Comprehensive" },
  { icon: "MapPin", title: "Free Delivery", subtitle: "UAE Wide" },
  { icon: "Calendar", title: "Flexible Terms", subtitle: "Easy Extension" },
  { icon: "Award", title: "Premium Support", subtitle: "Dedicated Team" },
  { icon: "Zap", title: "Weekly Mileage", subtitle: "1750 km included" },
];

const benefits = [
  { icon: "CheckCircle2", title: "Weekly Discounts", description: "Special rates for 7-day rentals", iconColor: "#22c55e" },
  { icon: "Shield", title: "Security Deposit", description: "AED 1000 - 5000", iconColor: "#3b82f6" },
  { icon: "MapPin", title: "Weekly Mileage", description: "1750 km included", iconColor: "#a855f7" },
  { icon: "Zap", title: "Extra Mileage", description: "AED 210/km after limit", iconColor: "#f97316" },
  { icon: "Users", title: "Chauffeur Service", description: "Available on request", iconColor: "#6366f1" },
  { icon: "Truck", title: "Free Delivery", description: "Dubai & UAE wide", iconColor: "#14b8a6" },
  { icon: "CheckCircle2", title: "Full Insurance", description: "Comprehensive coverage included", iconColor: "#22c55e" },
  { icon: "Calendar", title: "Flexible Extension", description: "Easy booking extension available", iconColor: "#ec4899" },
  { icon: "Award", title: "Priority Support", description: "24/7 dedicated assistance", iconColor: "#eab308" },
];

const steps = [
  { icon: "Car", title: "Select Your Car", description: "Browse our premium fleet and choose the perfect luxury car for your week" },
  { icon: "Calendar", title: "Choose Your Week", description: "Pick your start date and enjoy flexible 7-day rental periods" },
  { icon: "Percent", title: "Best Weekly Rates", description: "Get special discounted rates compared to daily rentals" },
  { icon: "Truck", title: "Free Delivery", description: "We deliver to your location anywhere in Dubai or the UAE" },
];

const rates = [
  { icon: "Car", title: "Economy Luxury", price: "AED 1500", period: "per week", savings: "Save AED 250" },
  { icon: "Zap", title: "Premium Sports", price: "AED 7500", period: "per week", savings: "Save AED 3000", highlighted: true, badge: "Popular" },
  { icon: "Star", title: "Ultra Luxury", price: "AED 16000", period: "per week", savings: "Save AED 2200" },
];

const WeeklyCarRental = () => {
  return (
    <main className={styles.mainWrapper}>
      <div className={styles.container}>
        <ServiceHero
          title="WEEKLY CAR RENTAL IN DUBAI"
          description={
            <>
              Save with our{" "}
              <span className={`${styles.textPrimary} ${styles.fontSemibold}`}>
                premium weekly rental service
              </span>
              . Perfect for extended stays, business trips, or exploring the UAE at your own pace.
            </>
          }
          whatsappMessage="Hi, I need a car for weekly rental"
        />

        <FeatureGrid title="Why Choose Weekly Rental" features={features} />

        {/* View All Cars Button */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "3rem" }}>
          <a className={`${styles.btn} ${styles.btnGreen}`} href="/cars">
            View All Cars
            <Car className="w-4 h-4" style={{ marginLeft: "0.5rem" }} />
          </a>
        </div>

        <BenefitsGrid
          title="Weekly Rental Benefits & Details"
          subtitle="Everything included in your weekly rental"
          benefits={benefits}
        />

        <ProcessSteps
          title="How Weekly Rental Works"
          subtitle={
            <>
              Simple steps to get your{" "}
              <span className={`${styles.textPrimary} ${styles.fontSemibold}`}>
                luxury car for the week
              </span>
            </>
          }
          steps={steps}
        />

        <RatesGrid
          title="Special Weekly Rates"
          subtitle={
            <>
              All-inclusive pricing with{" "}
              <span className={`${styles.textPrimary} ${styles.fontSemibold}`}>
                special weekly rates
              </span>
            </>
          }
          rates={rates}
        />

        <ServiceCTA
          title="Start Your {highlight} Today"
          highlightedWord="Weekly Adventure"
          description="Save more with weekly rates and enjoy the freedom of having a luxury car for the entire week."
          subdescription="Flexible terms, unlimited possibilities, and premium service guaranteed"
          whatsappMessage="Hi, I need a car for weekly rental"
        />
      </div>
    </main>
  );
};

export default WeeklyCarRental;
