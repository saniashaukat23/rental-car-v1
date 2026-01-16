"use client";
import React from "react";
import * as Icons from "lucide-react";
import styles from "../../styles/frontend/services.module.css";

interface Step {
  icon: string;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  title: string;
  subtitle?: React.ReactNode;
  steps: Step[];
  variant?: "icon" | "numbered";
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({
  title,
  subtitle,
  steps,
  variant = "icon",
}) => {
  return (
    <section className={styles.processSection}>
      <div style={{ position: "relative", zIndex: 10 }}>
        <div className={styles.textCenter} style={{ marginBottom: "2rem" }}>
          <h2 className={styles.sectionTitle}>{title}</h2>
          {subtitle && (
            <p className={`${styles.textMuted}`} style={{ maxWidth: "42rem", margin: "0 auto", padding: "0 1rem" }}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={styles.processGrid}>
          {steps.map((step, index) => {
            const IconComponent = Icons[step.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
            return (
              <div
                key={index}
                className={styles.processCard}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {variant === "numbered" ? (
                  <div className={styles.stepNumber}>{index + 1}</div>
                ) : (
                  <div className={styles.processIconBox}>
                    {IconComponent && <IconComponent className="w-6 h-6" />}
                  </div>
                )}
                <h3 className={styles.processTitle}>{step.title}</h3>
                <p className={styles.textMuted} style={{ lineHeight: 1.6 }}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
