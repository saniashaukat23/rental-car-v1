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
    <div className={`${styles.trustGrid}`}>
      <div className={`${styles.glowOrb} h-48 w-48 left-[55%] blur-3xl`}></div>
      {features.map((feature, index) => (
        <div key={index} className={` ${styles.innerTrustGrid}`}>
          <div className={`${feature.bgColor} ${styles.iconWrapper}`}>
            <feature.icon
              className={`${styles.trustIcons} ${feature.iconColor}`}
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
