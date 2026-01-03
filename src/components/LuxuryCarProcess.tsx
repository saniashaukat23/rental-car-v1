import React from "react";
import styles from "../styles/frontend/luxuryCarProcess.module.css";
import { Search, Car, Calendar, Phone, Clock, Truck } from "lucide-react";

// Mapping icons for easy access
const iconMap = {
  car: Car,
  calendar: Calendar,
  phone: Phone,
  search: Search,
  clock: Clock,
  truck: Truck,
};

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  features: string[];
  primaryIcon: keyof typeof iconMap;
  secondaryIcon: keyof typeof iconMap;
}

const steps: ProcessStep[] = [
  {
    number: 1,
    title: "Find a Luxury Car",
    description:
      "Find your luxury car to rent in Dubai, you can call us or WhatsApp us.",
    features: [
      "Browse our premium fleet of luxury vehicles",
      "Filter by brand, category, or engine type",
      "View detailed specs and real photos",
      "Instant WhatsApp support available",
    ],
    primaryIcon: "car",
    secondaryIcon: "search",
  },
  {
    number: 2,
    title: "Select Date & Time",
    description:
      "Select location, date and time, select extra addons if required.",
    features: [
      "Choose pickup & dropoff locations",
      "Flexible rental periods (daily/weekly/monthly)",
      "Add extras: GPS, child seat, additional driver",
      "Transparent pricing with no hidden fees",
    ],
    primaryIcon: "calendar",
    secondaryIcon: "clock",
  },
  {
    number: 3,
    title: "Drive Your Luxury Car",
    description:
      "We can deliver your luxury car to your doorstep or you can pick and drive.",
    features: [
      "Free delivery to hotels & airports",
      "24/7 customer support",
      "Comprehensive insurance included",
      "Clean, sanitized & fully fueled cars",
    ],
    primaryIcon: "phone",
    secondaryIcon: "truck",
  },
];

const LuxuryCarProcess: React.FC = () => {
  return (
    <section className={styles.processcontainer}>
      <div
        className={`${styles.glowOrb} -bottom-20 left-[19%] lg:flex hidden`}
      ></div>
      <div
        className={`${styles.glowOrb} -bottom-20 right-[10%] lg:flex hidden `}
      ></div>

      <div className={styles.processgrid}>
        {steps.map((step) => {
          const PrimaryIcon = iconMap[step.primaryIcon];
          const SecondaryIcon = iconMap[step.secondaryIcon];

          return (
            <div
              key={step.number}
              className={`${styles.processcard} ${
                step.number === 2 ? styles.highlight : ""
              }`}
            >
              <div className={styles.cardcorneraccent}></div>

              <div className={styles.cardheadertop}>
                <div className={styles.cardheader}>
                  <div className={styles.iconcontainer}>
                    <PrimaryIcon size={20} />
                  </div>
                  <span className={styles.stepnumber}>{step.number}</span>
                </div>
                {/* Secondary icon is now dynamic */}
                <SecondaryIcon className={styles.secondaryicon} size={24} />
              </div>

              <h3 className={styles.cardtitle}>{step.title}</h3>
              <p className={styles.carddescription}>{step.description}</p>

              <hr className={styles.divider} />

              <ul className={styles.featurelist}>
                {step.features.map((feature, idx) => (
                  <li key={idx} className={styles.featureitem}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LuxuryCarProcess;
