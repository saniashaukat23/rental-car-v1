import React from "react";
import { Shield, Lock } from "lucide-react";
import styles from "../styles/frontend/paymentSection.module.css";
import Image from "next/image";
import TrustFeatures from "./TrustFeatures";
interface SecurityFeature {
  title: string;
  description: string;
  img: string;
}
const PaymentSection: React.FC = () => {
  const features: SecurityFeature[] = [
    {
      title: "Pay Safely",
      description: "Secure Payment Gateway",
      img: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769349968/pay_safely201_cmjvrr.svg",
    },
    {
      title: "Visa",
      description: "Credit and Debit Cards",
      img: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769349968/visa_icon_sog1rl.svg"
    },
    {
      title: "Mastercard",
      description: "Credit and Debit Cards",
      img: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769349968/mastercard-icon_pxd6gv.svg",
    },
    {
      title: "Google Pay",
      description: "Digital Wallet",
      img: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769349968/GooglePay_ccrive.svg",

    },
    {
      title: "Cryptocurrency",
      description: "Bitcoin and more",
      img: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769349968/cryptocurrency_scqvsk.svg",

    },
    {
      title: "Apple Pay",
      description: "Digital Wallet",
      img: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769349967/apple-pay-icon_usq75n.svg",

    },
  ];

  return (
    <section className={styles.container}>
      {/* Top Badge */}
      <div className={styles.topBadge}>
        <Shield height={24} width={24} />
        <span>100% Secure Transactions</span>
      </div>

      <h2 className={styles.mainTitle}>
        Flexible <span className={styles.blueText}>Payment Options</span>
      </h2>
      <p className={styles.subtitle}>Pay your way</p>
      <p className={styles.description}>
        We accept multiple secure payment methods to make your reservation seamless and convenient
      </p>

      {/* Payment Method Cards */}
      <div className={styles.methodGrid}>
        {features.map((item, index) => (
          <div key={index} className={styles.methodCard}>
            {/* Background Glow */}
            <div
              className={`${styles.glowOrb} ${styles.glowOrbBottom} ${styles.blur2xl} ${styles.opacity0} ${styles.h24} ${styles.w24}`}
            ></div>

            <Image
              src={item.img}
              alt={item.title}
              height={64}
              width={64}
              className={styles.methodImg}
            />

            <p className={styles.methodName}>{item.title}</p>

            {/* Container for description to keep card height stable */}
            <div className={styles.descriptionWrapper}>
              <p className={styles.methodDescription}>{item.description}</p>
            </div>

            <div className={styles.bottomBadge}></div>
          </div>
        ))}
      </div>

      <hr className={styles.divider} />

      <div className={`  ${styles.midBar}`}>
        {/* Lucide Lock Icon */}
        <Lock className={` ${styles.LockIcon}`} aria-hidden="true" />
        <p>
          Your transactions are protected with <span>industry-standard encryption</span>
        </p>
      </div>
      <TrustFeatures />
    </section>
  );
};

export default PaymentSection;