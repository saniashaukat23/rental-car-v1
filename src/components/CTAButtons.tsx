"use client";
import React from "react";
import { MessageCircle, Phone } from "lucide-react";
import styles from "../styles/frontend/services.module.css";

interface CTAButtonsProps {
  whatsappMessage?: string;
  whatsappLabel?: string;
  callLabel?: string;
  size?: "default" | "large";
  className?: string;
}

const CTAButtons: React.FC<CTAButtonsProps> = ({
  whatsappMessage = "Hi, I'm interested in renting a car",
  whatsappLabel = "WhatsApp Us",
  callLabel = "Call Now",
  size = "default",
  className = "",
}) => {
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const sizeClass = size === "large" ? styles.btnLarge : "";

  return (
    <div className={`${styles.buttonGroup} ${className}`}>
      <a
        href={`https://wa.me/971523048253?text=${encodedMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.btn} ${styles.btnGreen} ${sizeClass}`}
      >
        <MessageCircle className="w-4 h-4" />
        {whatsappLabel}
      </a>
      <a
        href="tel:971523048253"
        className={`${styles.btn} ${styles.btnOutline} ${sizeClass}`}
      >
        <Phone className="w-4 h-4" />
        {callLabel}
      </a>
    </div>
  );
};

export default CTAButtons;
