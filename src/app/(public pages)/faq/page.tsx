"use client";
import React from "react";
import Link from "next/link";
import {
  FileText,
  CreditCard,
  Car,
  Shield,
  MessageCircle,
  Phone,
} from "lucide-react";
import styles from "../../../styles/frontend/faq.module.css";
const faqData = [
  {
    category: "Documents & Requirements",
    Icon: FileText,
    items: [
      {
        q: "What documents do I need to rent a car?",
        a: "UAE residents need a valid UAE driving license and Emirates ID. Tourists need a passport, visit visa, and an international driving permit or license from eligible countries.",
      },
      {
        q: "What is the minimum age requirement?",
        a: "The minimum age is 21 years for most vehicles. For luxury and sports cars, the minimum age is 25 years. You must have held a valid driving license for at least 1 year.",
      },
      {
        q: "I'm a first-time renter. Is that okay?",
        a: "Absolutely! We welcome first-time renters. Our team will guide you through the entire process via WhatsApp, making it simple and stress-free.",
      },
      {
        q: "Do I need original documents or are copies acceptable?",
        a: "You must bring original documents for verification. We'll take copies for our records, but original documents (Emirates ID, passport, driving license) are required at pickup for identity verification.",
      },
      {
        q: "Can tourists drive with their home country license in Dubai?",
        a: "Tourists can drive with their home country license ONLY if it's from an eligible country (US, UK, Canada, Australia, EU countries, etc.) OR with an International Driving Permit (IDP). Check with us to confirm if your license is accepted.",
      },
    ],
  },
  {
    category: "Pricing & Payment",
    Icon: CreditCard,
    items: [
      {
        q: "What's included in the rental price?",
        a: "Our prices include basic insurance with excess, standard mileage allowance, and 24/7 support. Fuel, Salik (tolls), parking fees, and 5% VAT are additional.",
      },
      {
        q: "Are there any hidden charges?",
        a: "No hidden charges! We believe in transparent pricing. All costs are clearly communicated before you confirm your booking. Security deposit is fully refundable.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept cash, debit cards, and credit cards. A security deposit is required (amount varies by vehicle category) which is refunded within 14-21 business days after return.",
      },
      {
        q: "How does the security deposit work?",
        a: "A deposit is an amount blocked on your credit card or cash (not charged). The deposit is held for 30 days, after which we transfer it back to your credit card or bank account.",
      },
      {
        q: "What happens if there are damages or fines?",
        a: "We charge customers for any fines, scratches, or damages done to the car which weren't resolved on spot or after the car is returned. We provide customers with proof for any fines/damages for complete transparency.",
      },
    ],
  },
  {
    category: "Rental Process",
    Icon: Car,
    items: [
      {
        q: "How do I extend my rental period?",
        a: "Simply message us on WhatsApp at least 3 hours before your return time. We'll confirm availability and extend your booking instantly.",
      },
      {
        q: "Do you offer long-term rentals?",
        a: "Yes! We offer special discounted rates for weekly and monthly rentals. Contact us for a personalized quote based on your needs.",
      },
      {
        q: "Can I modify or cancel my booking?",
        a: "Free cancellation up to 48 hours before pickup. 50% charge for cancellation within 24-48 hours, and full charge within 24 hours. Modifications subject to availability.",
      },
      {
        q: "How long does the pickup process take?",
        a: "The pickup process typically takes 15-30 minutes. This includes document verification, vehicle inspection, signing the rental agreement, and a brief orientation about the car's features and Dubai driving rules.",
      },
    ],
  },
  {
    category: "Policies & Coverage",
    Icon: Shield,
    items: [
      {
        q: "What's your fuel policy?",
        a: "We follow a 'same-to-same' policy. You'll receive the car with a certain fuel level and should return it with the same level. Otherwise, refueling charges apply.",
      },
      {
        q: "What if I get into an accident?",
        a: "Contact us immediately via WhatsApp. Take photos, get a police report, and don't admit fault. Your insurance covers damages as per the policy terms.",
      },
      {
        q: "Are there any kilometre restrictions?",
        a: "Yes, rentals include a standard mileage allowance. Extra mileage charges apply as per your rental agreement. Please check your specific vehicle's terms.",
      },
      {
        q: "What if I have issues with my deposit or need to reschedule?",
        a: (
          <>
            For deposit complaints or follow-up, contact us at{" "}
            <a
              href="https://wa.me/971582947143?text=Hi, I have a question about my deposit"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkHighlight}
            >
              +971 58 294 7143
            </a>
            . If anything happens that might affect your scheduled request, we
            manage it and inform you of any rescheduling if needed.
          </>
        ),
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className={styles.mainContainer}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.mainTitle}>Frequently Asked Questions</h1>
          <p className={styles.mainSubtitle}>
            Everything you need to know about renting with us
          </p>
        </div>

        {/* FAQ Grid */}
        <div className={styles.gridContainer}>
          {faqData.map((section, idx) => (
            <div key={idx} className={styles.categoryColumn}>
              {/* Category Header */}
              <div className={styles.catHeader}>
                <div className={styles.iconBox}>
                  <section.Icon className={styles.icon} />
                </div>
                <h3 className={styles.catTitle}>{section.category}</h3>
              </div>

              {/* Questions List */}
              <div className={styles.questionsList}>
                {section.items.map((item, qIdx) => (
                  <div key={qIdx} className={styles.card}>
                    <h4 className={styles.question}>{item.q}</h4>
                    <div className={styles.answer}>{item.a}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className={styles.footerCta}>
          <p className={styles.ctaText}>Cant find what youre looking for?</p>
          <div className={styles.buttonGroup}>
            <a
              href="https://wa.me/971582947143?text=Hi, I have a question about car rental"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnWhatsapp}`}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Ask on WhatsApp
            </a>
            <Link
              href="/contact"
              className={`${styles.btn} ${styles.btnContact}`}
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
