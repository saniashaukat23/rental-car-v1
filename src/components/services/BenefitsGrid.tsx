"use client";
import React from "react";
import * as Icons from "lucide-react";
import styles from "../../styles/frontend/services.module.css";

interface Benefit {
  icon: string;
  title: string;
  description?: string;
  iconColor?: string;
}

interface BenefitsGridProps {
  title: string;
  subtitle?: string;
  benefits: Benefit[];
  variant?: "detailed" | "simple";
}

const BenefitsGrid: React.FC<BenefitsGridProps> = ({
  title,
  subtitle,
  benefits,
  variant = "detailed",
}) => {
  return (
    <div className={styles.sectionMargin}>
      <div className={styles.benefitsHeader}>
        <div>
          <h3 className={styles.sectionTitle} style={{ textAlign: "left", marginBottom: "0.25rem" }}>
            {title}
          </h3>
          {subtitle && <p className={styles.textMuted}>{subtitle}</p>}
        </div>
      </div>
      <div className={styles.benefitsGrid}>
        {benefits.map((benefit, index) => {
          const IconComponent = Icons[benefit.icon as keyof typeof Icons] as React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
          return (
            <div
              key={index}
              className={styles.benefitCard}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {IconComponent && (
                <IconComponent
                  className={styles.benefitIcon}
                  style={{ color: benefit.iconColor || "#22c55e" }}
                />
              )}
              <div>
                <span style={{ fontSize: "0.875rem", fontWeight: 500, display: "block" }}>
                  {benefit.title}
                </span>
                {variant === "detailed" && benefit.description && (
                  <span className={styles.textSmallMuted}>{benefit.description}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BenefitsGrid;
