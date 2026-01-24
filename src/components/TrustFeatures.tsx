import { Shield, CreditCard, Lock } from "lucide-react";
import styles from "../styles/frontend/paymentSection.module.css";
const TrustFeatures = () => {
  const features = [
    {
      title: "Bank-Level Security",
      description: "256-bit SSL encryption protects your data",
      icon: Shield,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "PCI Compliant",
      description: "Meets highest payment security standards",
      icon: CreditCard,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Fraud Protection",
      description: "Advanced monitoring keeps you safe",
      icon: Lock,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className={styles.trustGrid}>
      <div className={`${styles.glowOrb} ${styles.h48} ${styles.w48} ${styles.leftCenter} ${styles.blur3xl}`}></div>
      {features.map((feature, index) => (
        <div key={index} className={styles.innerTrustGrid}>
          <div className={`${styles.iconWrapper} ${styles[`bg${feature.bgColor.split('-')[1].charAt(0).toUpperCase() + feature.bgColor.split('-')[1].slice(1)}${feature.bgColor.split('-')[2]}`]}`}>
            <feature.icon
              className={`${styles.trustIcons} ${styles[`text${feature.iconColor.split('-')[1].charAt(0).toUpperCase() + feature.iconColor.split('-')[1].slice(1)}${feature.iconColor.split('-')[2]}`]}`}
              aria-hidden="true"
            />
          </div>
          <h3 className={`${styles.trustTitle}`}>{feature.title}</h3>
          <p className={`${styles.trustDesc}`}>{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TrustFeatures;
