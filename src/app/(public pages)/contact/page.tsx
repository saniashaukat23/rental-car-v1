"use client";
import React from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import styles from "../../../styles/frontend/contactus.module.css";
import CTAButtons from "../../../components/CTAButtons";

// Data for the contact list (Left Column)
const contactDetails = [
  {
    icon: Phone,
    title: "Phone",
    content: "+97 152 304 8253",
    href: "tel:+97152304253",
    colorClass: styles.iconPrimary,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    content: "+97 152 304 8253",
    href: "https://wa.me/971523048253",
    colorClass: styles.iconGreen, // Special color for WhatsApp
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@hirecarnowdubai.com",
    href: "mailto:info@hirecarnowdubai.com",
    colorClass: styles.iconPrimary,
  },
  {
    icon: MapPin,
    title: "Location",
    content: "AutoMarket Ras Al Khor Ind. Third-Dubai - United Arab Emirates",
    href: "https://maps.google.com/?q=AutoMarket+Ras+Al+Khor+Ind.+Third+Dubai+UAE", // Fixed link structure
    colorClass: styles.iconPrimary,
  },
  {
    icon: Clock,
    title: "Working Hours",
    content: "24/7 Available",
    href: null, // No link for hours
    colorClass: styles.iconPrimary,
  },
];

export default function ContactPage() {
  return (
    <main className={styles.mainContainer}>
      <div className={styles.wrapper}>
        {/* Page Title */}
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>Contact Us</h1>
        </div>

        {/* Main Content Grid */}
        <div className={styles.contentGrid}>
          {/* Left Column: Contact Info List */}
          <div className={styles.infoColumn}>
            <p className={styles.introText}>
              We're passionate about helping you find the perfect luxury vehicle for your Dubai experience. Reach out through any channel—we respond quickly and provide expert guidance every step of the way.
            </p>

            <div className={styles.contactList}>
              {contactDetails.map((item, index) => (
                <div key={index} className={styles.contactItem}>
                  <item.icon
                    className={`${styles.iconBase} ${item.colorClass}`}
                  />
                  <div>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        className={styles.itemLink}
                        target={
                          item.title === "Location" || item.title === "WhatsApp"
                            ? "_blank"
                            : undefined
                        }
                        rel="noopener noreferrer"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className={styles.itemText}>{item.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Action Cards */}
          <div className={styles.actionColumn}>
            {/* Quick Contact Card */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Get Instant Help</h3>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardText}>
                  Questions about our fleet? Need a last-minute booking? Our team responds immediately to get you the perfect luxury car.
                </p>
                <CTAButtons 
                  whatsappMessage="Hello, I need help with car rental"
                  whatsappLabel="WhatsApp Us Now"
                  callLabel="Call Us Directly"
                />
              </div>
            </div>

            {/* Why Choose Us Card */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Why Reach Out?</h3>
              </div>
              <div className={styles.cardBody}>
                <ul className={styles.benefitList}>
                  <li className={styles.benefitItem}>
                    <span className={styles.checkMark}>✓</span>
                    <span>Fast, personalized responses from our consultants</span>
                  </li>
                  <li className={styles.benefitItem}>
                    <span className={styles.checkMark}>✓</span>
                    <span>Competitive rates with full transparency upfront</span>
                  </li>
                  <li className={styles.benefitItem}>
                    <span className={styles.checkMark}>✓</span>
                    <span>Flexible terms designed around your schedule</span>
                  </li>
                  <li className={styles.benefitItem}>
                    <span className={styles.checkMark}>✓</span>
                    <span>Expert advice on vehicle selection and Dubai routes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className={styles.mapSection}>
          <h2 className={styles.mapTitle}>Find Our Location</h2>
          <div className={styles.mapWrapper}>
            <a
              href="https://maps.google.com/?q=AutoMarket+Ras+Al+Khor+Ind.+Third+Dubai+UAE"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapOverlayLink}
              aria-label="Open in Google Maps"
            >
              <div className={styles.mapOverlayContent}>
                <div className={styles.mapBtn}>
                  <MapPin className="h-4 w-4" />
                  Open Directions
                </div>
              </div>
            </a>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178523351984!2d55.2721877!3d25.1871969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682829c85c07%3A0xa3cfc9c1c02862a8!2sBusiness%20Bay%20-%20Dubai!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
              width="100%"
              height="100%"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={styles.iframe}
              title="Car Hire Now Dubai Location"
            ></iframe>
          </div>
          <p className={styles.mapCaption}>
            Tap the map to navigate directly to our location using Google Maps
          </p>
        </div>
      </div>
    </main>
  );
}
