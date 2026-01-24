import { LucideIcon } from "lucide-react";
import styles from "../styles/frontend/about.module.css";
// 1. Define the props interface
interface FeatureCardProps {
  title: string;
  description: string;
  Icon: LucideIcon; // This ensures we pass a valid icon component
}

// 2. The Reusable Component
const FeatureCard = ({ title, description, Icon }: FeatureCardProps) => {
  return (
    <div className={styles.featureCard}>
      <div className={styles.cardContent}>
        <div className={styles.iconWrapper}>
          <Icon className={styles.icon} />
        </div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardText}>{description}</p>
      </div>
    </div>
  );
};
export default FeatureCard;
