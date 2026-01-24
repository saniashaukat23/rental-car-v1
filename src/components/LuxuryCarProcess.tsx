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
    title: "Explore & Choose",
    description:
      "Browse our curated collection of premium vehicles. Find your perfect match through WhatsApp or our website.",
    features: [
      "Browse 50+ luxury vehicles by brand, model, or category",
      "Detailed specs, high-resolution images, and features list",
      "Real-time availability and instant WhatsApp quotes",
      "Expert recommendations tailored to your needs",
    ],
    primaryIcon: "search",
    secondaryIcon: "car",
  },
  {
    number: 2,
    title: "Book & Confirm",
    description:
      "Choose your dates, confirm details, and secure your booking with transparent pricing.",
    features: [
      "Flexible rental periods: daily, weekly, or monthly",
      "Choose pickup/dropoff locations across Dubai",
      "Optional add-ons: GPS, additional drivers, insurance upgrades",
      "Fixed pricing—no surprises or hidden charges",
    ],
    primaryIcon: "calendar",
    secondaryIcon: "phone",
  },
  {
    number: 3,
    title: "Enjoy the Drive",
    description:
      "Get your vehicle delivered to you or pick it up at your convenience, then enjoy Dubai.",
    features: [
      "Free delivery & pickup at hotels, airport, or home",
      "Vehicle handover with full inspection & orientation",
      "Round-the-clock support throughout your rental",
      "Enjoy your luxury ride with confidence & peace of mind",
    ],
    primaryIcon: "truck",
    secondaryIcon: "clock",
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
