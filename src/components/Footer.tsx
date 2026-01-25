import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

// Import the CSS Module
import styles from "../styles/frontend/footr.module.css";
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.mainGrid}>
          {/* --- Column 1: Brand & Socials --- */}
          <div className={styles.brandCol}>
            <div className={styles.flexStart}>
              <Link href="/" className={styles.logoWrapper}>
                <Image
                  src="https://res.cloudinary.com/dfck2j3nx/image/upload/v1769349404/Logo_ngjhge.jpg"
                  alt="Luxury In Motion"
                  fill
                  className={styles.logoImage}
                  priority
                />
              </Link>
            </div>
            <p className={styles.brandDescription}>
              Your premier destination for luxury car rentals in Dubai.
              Experience excellence with our premium fleet and exceptional
              service.
            </p>

            {/* Social Icons */}
            <div className={styles.socialWrapper}>
              <SocialLink
                href="#"
                icon={<Facebook size={20} />}
                label="Facebook"
              />
              <SocialLink
                href="#"
                icon={<Instagram size={20} />}
                label="Instagram"
              />
              <SocialLink
                href="#"
                icon={<Twitter size={20} />}
                label="Twitter"
              />
              <SocialLink
                href="#"
                icon={<Linkedin size={20} />}
                label="LinkedIn"
              />
              <SocialLink
                href="#"
                icon={<Youtube size={20} />}
                label="YouTube"
              />

              {/* Custom SVG for TikTok */}
              <a href="#" className={styles.socialIcon} aria-label="TikTok">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={styles.svgIcon}
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path>
                </svg>
              </a>

              {/* Custom SVG for Snapchat */}
              <a
                href="#"
                className={`${styles.socialIcon} ${styles.socialIconSnapchat}`}
                aria-label="Snapchat"
              >
                <svg
                  viewBox="0 0 468.339 468.339"
                  fill="currentColor"
                  className={styles.svgIcon}
                >
                  <path d="M233.962,33.724c62.857,0.021,115.216,52.351,115.292,115.36c0.018,14.758,0.473,28.348,1.306,40.867c0.514,7.724,6.938,13.448,14.305,13.448c1.085,0,2.19-0.124,3.3-0.384l19.691-4.616c0.838-0.197,1.679-0.291,2.51-0.291c5.001,0,9.606,3.417,10.729,8.478c1.587,7.152-2.42,14.378-9.35,16.808l-29.89,12.066c-7.546,3.046-11.599,11.259-9.474,19.115c23.98,88.654,90.959,79.434,90.959,90.984c0,14.504-50.485,16.552-55.046,21.114s-0.198,26.701-10.389,30.987c-1.921,0.808-4.65,1.089-7.979,1.089c-7.676,0-18.532-1.498-29.974-1.498c-9.925,0-20.291,1.127-29.404,5.337c-24.176,11.168-47.484,32.028-76.378,32.028s-52.202-20.86-76.378-32.028c-9.115-4.211-19.478-5.337-29.404-5.337c-11.441,0-22.299,1.498-29.974,1.498c-3.327,0-6.059-0.282-7.979-1.089c-10.191-4.286-5.828-26.425-10.389-30.987S25,360.062,25,345.558c0-11.551,66.979-2.331,90.959-90.984c2.125-7.855-1.928-16.068-9.475-19.115l-29.89-12.066c-6.931-2.43-10.938-9.656-9.35-16.808c1.123-5.062,5.728-8.479,10.729-8.478c0.83,0,1.672,0.094,2.51,0.291l19.691,4.616c1.11,0.26,2.215,0.384,3.3,0.384c7.366,0,13.791-5.725,14.305-13.448c0.833-12.519,1.289-26.109,1.307-40.867C119.162,86.075,171.104,33.746,233.962,33.724 M233.97,8.724h-0.009h-0.009C215.19,8.73,196.913,12.5,179.631,19.93c-16.589,7.131-31.519,17.299-44.375,30.222c-12.839,12.906-22.943,27.889-30.031,44.533c-7.37,17.307-11.118,35.599-11.141,54.368c-0.011,9.215-0.202,18.158-0.57,26.722l-7.326-1.718c-2.688-0.63-5.452-0.95-8.213-0.951c-7.973-0.001-15.838,2.694-22.146,7.588c-6.581,5.106-11.196,12.377-12.993,20.474c-4.277,19.273,6.365,38.73,24.807,45.572l21.937,8.855c-14.526,44.586-41.311,53.13-59.348,58.885c-4.786,1.527-8.92,2.846-12.856,4.799C1.693,327.063,0,340.25,0,345.558c0,10.167,4.812,19.445,13.551,26.124c4.351,3.326,9.741,6.07,16.477,8.389c9.181,3.161,19.824,5.167,28.474,6.775c0.418,3.205,1.031,6.648,2.064,10.118c4.289,14.411,13.34,20.864,20.178,23.739c6.488,2.729,13.192,3.044,17.67,3.044c4.38,0,9.01-0.343,13.912-0.706c5.259-0.39,10.697-0.792,16.062-0.792c8.314,0,14.503,0.992,18.92,3.032c6.065,2.802,12.497,6.58,19.307,10.579c18.958,11.134,40.445,23.754,67.555,23.754s48.596-12.62,67.554-23.754c6.81-4,13.242-7.777,19.308-10.579c4.417-2.041,10.606-3.032,18.92-3.032c5.365,0,10.803,0.403,16.061,0.792c4.902,0.363,9.532,0.706,13.912,0.706c4.478,0,11.181-0.315,17.67-3.044c6.838-2.875,15.889-9.328,20.178-23.739c1.033-3.47,1.647-6.913,2.064-10.118c8.65-1.609,19.294-3.614,28.474-6.775c6.737-2.319,12.126-5.063,16.477-8.389c8.738-6.679,13.551-15.957,13.551-26.124c0-5.308-1.693-18.495-17.378-26.278c-3.936-1.953-8.07-3.272-12.856-4.799c-18.037-5.754-44.822-14.299-59.348-58.885l21.936-8.855c18.442-6.842,29.085-26.3,24.808-45.573c-1.797-8.097-6.412-15.368-12.993-20.474c-6.308-4.893-14.171-7.588-22.142-7.588c-2.761,0-5.525,0.32-8.215,0.95l-7.327,1.718c-0.368-8.563-0.559-17.506-0.57-26.722c-0.023-18.784-3.801-37.094-11.23-54.424c-7.131-16.636-17.29-31.615-30.194-44.522c-12.903-12.906-27.875-23.063-44.498-30.188C271.017,12.497,252.727,8.731,233.97,8.724L233.97,8.724z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* --- Column 2 & 3: Mobile Combined / Desktop Split --- */}
          {/* Mobile Only View */}
          <div className={styles.mobileLinksGrid}>
            <div>
              <h4 className={styles.columnTitle}>Quick Links</h4>
              <ul className={styles.linkList}>
                <FooterLinks links={quickLinks} />
              </ul>
            </div>
            <div>
              <h4 className={styles.columnTitle}>Services</h4>
              <ul className={styles.linkList}>
                <FooterLinks links={serviceLinks} />
              </ul>
            </div>
          </div>

          {/* Desktop Only View */}
          <div className={styles.desktopLinksCol}>
            <h4 className={styles.columnTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              <FooterLinks links={quickLinks} />
            </ul>
          </div>
          <div className={styles.desktopLinksCol}>
            <h4 className={styles.columnTitle}>Our Services</h4>
            <ul className={styles.linkList}>
              <FooterLinks links={serviceLinks} />
            </ul>
          </div>

          {/* --- Column 4: Contact --- */}
          <div className={styles.contactCol}>
            <h4 className={styles.columnTitle}>Contact Us</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <MapPin className={styles.contactIcon} />
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  className={styles.contactLink}
                >
                  AutoMarket Ras Al Khor Ind. Third-Dubai - United Arab Emirates
                </a>
              </li>
              <li className={styles.contactItem}>
                <Phone className={styles.contactIcon} />
                <a href="tel:+97152304253" className={styles.contactLink}>
                  +97 152 304 8253
                </a>
              </li>
              <li className={styles.contactItem}>
                <Mail className={styles.contactIcon} />
                <a
                  href="mailto:info@hirecarnowdubai.com"
                  className={`${styles.contactLink} ${styles.wordBreakAll}`}
                >
                  info@hirecarnowdubai.com
                </a>
              </li>
              <li className={styles.contactItem}>
                <MessageCircle className={styles.contactIcon} />
                <a
                  href="https://wa.me/971523048253"
                  target="_blank"
                  className={styles.contactLink}
                >
                  WhatsApp: +97 152 304 8253
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Payment & Trustpilot Section --- */}
        <div className={styles.paymentSection}>
          <div className={styles.textCenter}>
            <h4 className={styles.paymentTitle}>Secure Payments</h4>
            <p className={styles.paymentSubtitle}>
              We accept multiple payment methods
            </p>

            {/* Payment Icons Grid */}
            <div className={styles.paymentGrid}>
              {[
                "visa_icon",
                "mastercard-icon",
                "apple-pay-icon",
                "googlepay",
                "cryptocurrency",
                "pay_safely201",
              ].map((payment, i) => (
                <div key={i} className={styles.paymentCard}>
                  <div className={styles.glowOrb}></div>
                  <div className={styles.relativeContainer}>
                    <Image
                      src={`/paymentLogos/${payment}.svg`}
                      alt={payment}
                      fill
                      className={styles.paymentImage}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.secureBadge}>
              <CheckCircle2 size={16} color="#16a34a" />
              <span>SSL Encrypted & Secure Transactions</span>
            </div>
          </div>
        </div>

        {/* --- Bottom Footer --- */}
        <div className={styles.bottomFooter}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              © {currentYear} Car Hire Now RENT A CAR L.L.C. All rights
              reserved.
            </p>
            <div className={styles.legalLinks}>
              <Link href="/privacy" className={styles.legalLink}>
                Privacy Policy
              </Link>
              <Link href="/terms" className={styles.legalLink}>
                Terms of Service
              </Link>
              <Link href="/sitemap.xml" className={styles.legalLink}>
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Sub-Components & Data ---

const SocialLink = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={styles.socialIcon}
  >
    {icon}
  </a>
);

const FooterLinks = ({
  links,
}: {
  links: { name: string; href: string }[];
}) => (
  <>
    {links.map((link) => (
      <li key={link.name} className={styles.linkItem}>
        <Link href={link.href} className={styles.link}>
          {link.name}
        </Link>
      </li>
    ))}
  </>
);

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Our Fleet", href: "/our-fleet" },
  { name: "About Us", href: "/about" },
  { name: "Brands", href: "/cars" },
  { name: "Categories", href: "/categories" },
  { name: "Contact", href: "/contact" },
];

const serviceLinks = [
  { name: "Daily Car Rental", href: "/services/daily-rental" },
  { name: "Weekly Car Rental", href: "/services/weekly-rental" },
  { name: "Monthly Car Rental", href: "/services/monthly-rental" },
  { name: "Airport Transfer", href: "/services/airport-transfer" },
  { name: "Chauffeur Service", href: "/services/chauffeur-service" },
];
