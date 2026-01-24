"use client";
import React from "react";
import {
  FileText,
  CreditCard,
  Car,
  Shield,
} from "lucide-react";
import styles from "../../../styles/frontend/faq.module.css";
import CTAButtons from "../../../components/CTAButtons";

const faqData = [
  {
    category: "Booking & Requirements",
    Icon: FileText,
    items: [
      {
        q: "What documents do I need?",
        a: "UAE residents provide a valid UAE driving license and Emirates ID. International visitors need a passport, valid visa, and an international driving permit or a valid driving license from recognized countries (US, UK, Canada, Australia, EU member states, etc.).",
      },
      {
        q: "What's the minimum age to rent?",
        a: "Most vehicles require drivers to be 21+ years old. Premium luxury and sports cars require a minimum age of 25. Your driving license must be valid for at least one year.",
      },
      {
        q: "I'm new to car rentals—is that okay?",
        a: "Absolutely! We welcome first-time renters and handle the entire process with care. Our team walks you through documentation, vehicle features, and driving tips via WhatsApp before your pickup.",
      },
      {
        q: "Do you accept international driving licenses?",
        a: "Yes, we accept valid international driving permits (IDP) and driving licenses from many countries including the US, UK, Canada, Australia, and EU nations. Tourists from other countries should have an IDP. Contact us to confirm your specific license.",
      },
    ],
  },
  {
    category: "Pricing & Payments",
    Icon: CreditCard,
    items: [
      {
        q: "What's included in the rental price?",
        a: "Your rental includes comprehensive insurance coverage, standard mileage allowance (varies by vehicle), roadside assistance, and 24/7 support. Fuel, Salik tolls, and parking fees are separate charges. VAT applies per UAE regulations.",
      },
      {
        q: "Are there hidden charges?",
        a: "No. We believe in complete transparency. Every cost is discussed and confirmed in writing before you book. Security deposits are fully refundable if there are no damages or violations.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept cash, debit cards, and credit cards. A refundable security deposit is required (amount depends on vehicle category). It's refunded 14-21 business days after return to your card or bank account.",
      },
      {
        q: "What if I damage the car?",
        a: "We document all damage during handover and return inspection. Minor wear is covered by insurance. For damages or fines, we provide documentation and work with your insurance. Full transparency always.",
      },
    ],
  },
  {
    category: "Rental Policies",
    Icon: Car,
    items: [
      {
        q: "Can I extend my rental?",
        a: "Yes! Message us on WhatsApp at least 3 hours before your return time. If the vehicle is available, we'll extend your booking instantly at the standard daily rate.",
      },
      {
        q: "Do you offer long-term rentals?",
        a: "Absolutely. Weekly and monthly rentals come with special discounted rates. The longer you rent, the better your rate. Contact us for a custom quote based on your dates.",
      },
      {
        q: "What's your cancellation policy?",
        a: "Free cancellation up to 48 hours before pickup. Cancellations within 24-48 hours incur a 50% charge. Cancellations within 24 hours are non-refundable. Modifications depend on availability.",
      },
      {
        q: "How long is pickup?",
        a: "Pickup typically takes 20-30 minutes. This includes document verification, vehicle inspection with photos, agreement signing, and a brief walkthrough of your car's features and Dubai driving rules.",
      },
    ],
  },
  {
    category: "Vehicle & Safety",
    Icon: Shield,
    items: [
      {
        q: "What's your fuel policy?",
        a: "Simple: same-to-same. You receive the car with a specific fuel level and return it at the same level. Additional refueling charges apply if you return it lower. It's fair and transparent.",
      },
      {
        q: "What if I have an accident?",
        a: "Contact us immediately on WhatsApp with details and photos. Get a police report if needed. Don't admit fault. Your insurance covers damages within policy terms. We guide you through the process.",
      },
      {
        q: "Are there mileage limits?",
        a: "Yes, each rental includes a standard daily mileage allowance. Extra kilometers are charged at the rate specified in your agreement. We're upfront about all mileage terms.",
      },
      {
        q: "What if I need roadside help?",
        a: "Call us immediately. We provide 24/7 roadside assistance including towing, tire changes, lockout help, and fuel delivery. Our team coordinates everything for you.",
      },
    ],
  },
];


export default function FAQPage() {
  return (
    <main className={styles.mainContainer}>
      {/* Decorative Orbs */}
      <div className={styles.decorOrbLeft} />
      <div className={styles.decorOrbRight} />
      
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.mainTitle}>Your Questions, Answered</h1>
          <p className={styles.mainSubtitle}>
            Everything you need to know about renting a luxury car with Car Hire Now. Still curious? Our team is ready to help via WhatsApp.
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
          <p className={styles.ctaText}>Didn't find your answer? We're here to help—fast.</p>
          <CTAButtons 
            whatsappMessage="Hi, I have a question about car rental"
            whatsappLabel="Ask on WhatsApp"
            callLabel="Call Our Team"
          />
        </div>
      </div>
    </main>
  );
}
