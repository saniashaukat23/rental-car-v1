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
    title: "Emirates & UAE Residents",
    description: "Local rental requirements",
    primaryIcon: "IdCard",
    secondaryIcon: "Search",
    footerNote: "* Residential Visa may be acceptable",
    requirements: [
      {
        title: "Emirates ID",
        subtitle: "A valid identification card as proof of your identity",
      },
      {
        title: "UAE Driving License",
        subtitle: "You must have a valid driver's license",
      },
      {
        title: "Debit Card & Cash",
        subtitle: "For payment and security deposit",
      },
    ],
  },
  {
    number: 2,
    title: "Foreign Tourist",
    description: "International visitor requirements",
    primaryIcon: "Globe",
    secondaryIcon: "Clock",
    requirements: [
      {
        title: "Visit Visa with Entry Stamp",
        subtitle: "Required for tourists",
      },
      {
        title: "Passport",
        subtitle: "You will need to provide a copy of your passport",
      },
      {
        title: "Home Country Driving License",
        subtitle: "Your valid license from your home country",
      },
      {
        title: "IDP (International Driving Permit)",
        subtitle: "Required for international visitors",
      },
      {
        title: "Debit Card & Cash",
        subtitle: "For reservation and deposit payments",
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
