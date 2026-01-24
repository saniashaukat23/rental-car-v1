"use client";
import React from "react";
import { MessageCircle, Phone } from "lucide-react";
import { WHATSAPP_URL, PHONE_URL } from "@/src/lib/constants";
import styles from "../../styles/frontend/services.module.css";

interface ServiceHeroProps {
  title: string;
  description: React.ReactNode;
  whatsappMessage: string;
  ctaLabel?: { whatsapp?: string; call?: string };
}

const ServiceHero: React.FC<ServiceHeroProps> = ({
  title,
  description,
  whatsappMessage,
  ctaLabel = { whatsapp: "WhatsApp Us", call: "Call Now" },
}) => {
  return (
    <div className={styles.heroSection}>
      <h1 className={styles.heroTitle}>{title}</h1>
      <p className={styles.heroDesc}>{description}</p>
      <div className={styles.buttonGroup}>
        <a
          href={WHATSAPP_URL(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.btn} ${styles.btnGreen}`}
        >
          <MessageCircle className="w-4 h-4" />
          {ctaLabel.whatsapp}
        </a>
        <a
          href={PHONE_URL}
          className={`${styles.btn} ${styles.btnOutline}`}
        >
          <Phone className="w-4 h-4" />
          {ctaLabel.call}
        </a>
      </div>
    </div>
  );
};

export default ServiceHero;
