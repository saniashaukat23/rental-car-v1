import React from "react";
import styles from "../styles/frontend/requirements.module.css";
import { IdCard, Globe, CircleCheck, Search, Clock, Truck } from "lucide-react";

const iconMap = {
  IdCard: IdCard,
  Globe: Globe,
  Search: Search,
  Clock: Clock,
  Truck: Truck,
};

interface RequirementItem {
  title: string;
  subtitle: string;
}

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  requirements: RequirementItem[];
  primaryIcon: keyof typeof iconMap;
  secondaryIcon?: keyof typeof iconMap;
  footerNote?: string;
}

const steps: ProcessStep[] = [
  {
    number: 1,
    title: "UAE Residents & Expats",
    description: "What you need to bring for pickup",
    primaryIcon: "IdCard",
    secondaryIcon: "Search",
    footerNote: "* Acceptable for residents with valid visa sponsorship",
    requirements: [
      {
        title: "Emirates ID",
        subtitle: "Valid, government-issued identification card",
      },
      {
        title: "UAE Driving License",
        subtitle: "Must be valid and not suspended or expired",
      },
      {
        title: "Payment Method",
        subtitle: "Debit/credit card or cash for deposit and rental fees",
      },
    ],
  },
  {
    number: 2,
    title: "International Visitors",
    description: "Requirements for tourists renting in Dubai",
    primaryIcon: "Globe",
    secondaryIcon: "Clock",
    requirements: [
      {
        title: "Valid Passport",
        subtitle: "Original document required for verification",
      },
      {
        title: "Visa Entry Stamp",
        subtitle: "Proof of entry into the UAE with valid visit visa",
      },
      {
        title: "Driving License",
        subtitle: "Valid from your home country or International Driving Permit",
      },
      {
        title: "International Driving Permit",
        subtitle: "Required if your home license is not in English",
      },
      {
        title: "Payment Card",
        subtitle: "Debit or credit card for security deposit and charges",
      },
    ],
  },
];

const Requirements: React.FC = () => {
  return (
    <section className={styles.processcontainer}>
      {/* Background Orbs */}
      <div
        className={`${styles.glowOrb} hidden lg:flex`}
        style={{ bottom: "-15rem", left: "60%" }}
      ></div>

      <div className={styles.processgrid}>
        {steps.map((step) => {
          const PrimaryIcon = iconMap[step.primaryIcon];
          return (
            <div key={step.number} className={styles.processcard}>
              <div className={styles.cardcorneraccent}></div>
              <div className={styles.cardheadertop}>
                <div className={styles.cardheader}>
                  <div className={styles.iconcontainer}>
                    <PrimaryIcon size={28} />
                  </div>
                </div>
                <div className={styles.titleWrapper}>
                  <h3 className={styles.cardtitle}>{step.title}</h3>
                  <p className={styles.carddescription}>{step.description}</p>
                </div>
              </div>

              <ul className={styles.featurelist}>
                {step.requirements.map((req, idx) => (
                  <li key={idx} className={styles.featureitem}>
                    <CircleCheck className={styles.checkIcon} size={18} />
                    <div className={styles.featureText}>
                      <span className={styles.reqTitle}>{req.title}</span>
                      <span className={styles.reqSubtitle}>{req.subtitle}</span>
                    </div>
                  </li>
                ))}
              </ul>

              {step.footerNote && (
                <>
                  <hr className={styles.divider} />
                  <p className={styles.footerNote}>{step.footerNote}</p>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Requirements;
