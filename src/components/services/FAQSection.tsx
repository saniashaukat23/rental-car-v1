"use client";
import React from "react";
import styles from "../../styles/frontend/services.module.css";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  faqs: FAQ[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ title = "Frequently Asked Questions", faqs }) => {
  return (
    <section className={styles.faqSection}>
      <div className={styles.textCenter} style={{ marginBottom: "2rem" }}>
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>
      <div className={styles.faqContainer}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={styles.faqCard}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h3 className={styles.faqQuestion}>{faq.question}</h3>
            <p className={styles.textMuted} style={{ lineHeight: 1.6 }}>
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
