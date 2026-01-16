"use client";
import React from "react";
import * as Icons from "lucide-react";
import styles from "../../styles/frontend/services.module.css";

interface Feature {
  icon: string;
  title: string;
  subtitle: string;
}

interface FeatureGridProps {
  title: string;
  features: Feature[];
}

const FeatureGrid: React.FC<FeatureGridProps> = ({ title, features }) => {
  return (
    <div className={styles.sectionMargin}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.gridSix}>
        {features.map((feature, index) => {
          const IconComponent = Icons[feature.icon as keyof typeof Icons] as React.ComponentType<{ size?: number }>;
          return (
            <div
              key={index}
              className={styles.featureCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.iconCircle}>
                {IconComponent && <IconComponent size={28} />}
              </div>
              <h4 className={styles.featureTitle}>{feature.title}</h4>
              <p className={styles.textSmallMuted}>{feature.subtitle}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureGrid;
