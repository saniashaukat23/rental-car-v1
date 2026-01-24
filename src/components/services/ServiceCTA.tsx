"use client";
import React from "react";
import { MessageCircle, Phone } from "lucide-react";
import { WHATSAPP_URL, PHONE_URL } from "@/src/lib/constants";
import styles from "../../styles/frontend/services.module.css";

interface ServiceCTAProps {
  title: string;
  highlightedWord: string;
  description: string;
  subdescription?: string;
  whatsappMessage: string;
  ctaLabel?: { whatsapp?: string; call?: string };
}

const ServiceCTA: React.FC<ServiceCTAProps> = ({
  title,
  highlightedWord,
  description,
  subdescription,
  whatsappMessage,
  ctaLabel = { whatsapp: "WhatsApp Us", call: "Call Now" },
}) => {
  // Split title to insert highlighted word
  const titleParts = title.split("{highlight}");

  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaBlurBg}>
        <div className={`${styles.blurBlob} ${styles.blobLeft}`} />
        <div className={`${styles.blurBlob} ${styles.blobRight}`} />
      </div>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaHeading}>
          {titleParts[0]}
          <span className={styles.textPrimary}>{highlightedWord}</span>
          {titleParts[1] || ""}
        </h2>
        <p className={styles.ctaDesc}>{description}</p>
        {subdescription && <p className={styles.ctaSubdesc}>{subdescription}</p>}
        <div className={styles.buttonGroup}>
          <a
            href={WHATSAPP_URL(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.btn} ${styles.btnGreen} ${styles.btnLarge}`}
          >
            <MessageCircle className="w-5 h-5" />
            {ctaLabel.whatsapp}
          </a>
          <a
            href={PHONE_URL}
            className={`${styles.btn} ${styles.btnOutline} ${styles.btnLarge}`}
          >
            <Phone className="w-5 h-5" />
            {ctaLabel.call}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServiceCTA;
