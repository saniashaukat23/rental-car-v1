"use client";
import React from "react";
import { MessageCircle, Phone } from "lucide-react";
import { WHATSAPP_URL, PHONE_URL, DEFAULT_WHATSAPP_MESSAGE } from "@/src/lib/constants";
import styles from "../styles/frontend/services.module.css";

interface CTAButtonsProps {
  whatsappMessage?: string;
  whatsappLabel?: string;
  callLabel?: string;
  size?: "default" | "large";
  className?: string;
}

const CTAButtons: React.FC<CTAButtonsProps> = ({
  whatsappMessage = DEFAULT_WHATSAPP_MESSAGE,
  whatsappLabel = "WhatsApp Us",
  callLabel = "Call Now",
  size = "default",
  className = "",
}) => {
  const sizeClass = size === "large" ? styles.btnLarge : "";

  return (
    <div className={`${styles.buttonGroup} ${className}`}>
      <a
        href={WHATSAPP_URL(whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.btn} ${styles.btnGreen} ${sizeClass}`}
      >
        <MessageCircle className={styles.iconSize} />
        {whatsappLabel}
      </a>
      <a
        href={PHONE_URL}
        className={`${styles.btn} ${styles.btnOutline} ${sizeClass}`}
      >
        <Phone className={styles.iconSize} />
        {callLabel}
      </a>
    </div>
  );
};

export default CTAButtons;
