"use client";
import React from "react";
import * as Icons from "lucide-react";
import styles from "../../styles/frontend/services.module.css";

interface Rate {
  icon: string;
  title: string;
  price: string;
  period: string;
  savings?: string;
  highlighted?: boolean;
  badge?: string;
}

interface RatesGridProps {
  title: string;
  subtitle?: React.ReactNode;
  rates: Rate[];
}

const RatesGrid: React.FC<RatesGridProps> = ({ title, subtitle, rates }) => {
  return (
    <section className={styles.ratesSection}>
      <div style={{ position: "relative", zIndex: 10 }}>
        <div className={styles.textCenter} style={{ marginBottom: "2rem" }}>
          <h2 className={styles.sectionTitle}>{title}</h2>
          {subtitle && (
            <p className={`${styles.textMuted}`} style={{ maxWidth: "42rem", margin: "0 auto", padding: "0 1rem" }}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={styles.ratesGrid}>
          {rates.map((rate, index) => {
            const IconComponent = Icons[rate.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
            return (
              <div
                key={index}
                className={`${styles.rateCard} ${rate.highlighted ? styles.rateCardHighlight : ""}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {rate.badge && <div className={styles.badge}>{rate.badge}</div>}
                <div className={styles.processIconBox} style={{ margin: "0 auto 1rem" }}>
                  {IconComponent && <IconComponent className="w-6 h-6" />}
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                  {rate.title}
                </h3>
                <p className={styles.priceText}>{rate.price}</p>
                <p className={styles.textMuted} style={{ marginBottom: "0.5rem" }}>
                  {rate.period}
                </p>
                {rate.savings && <p className={styles.saveText}>{rate.savings}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RatesGrid;
