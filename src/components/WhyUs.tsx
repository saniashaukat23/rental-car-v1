import SectionHeader from "./SectionHeader";
import styles from "../styles/frontend/whyUs.module.css";

const WhyChooseUs = () => {
  const benefits = [
    {
      title: "Curated Luxury Selection",
      description: "Our handpicked collection features only the finest vehicles, from Italian supercars to British performance machines. Every model represents excellence in engineering and design.",
    },
    {
      title: "Transparent & Honest Pricing",
      description: "What you see is what you pay. We believe in upfront pricing with zero surprises. Competitive rates that deliver genuine value without compromising on quality.",
    },
    {
      title: "Expert Local Knowledge",
      description: "Our team knows Dubai inside and out. Get personalized recommendations for routes, destinations, and the best ways to experience the city in your luxury vehicle.",
    },
    {
      title: "Professional Fleet Management",
      description: "Every vehicle is meticulously maintained to the highest standards. Regular servicing, deep cleaning, and quality checks ensure a flawless driving experience.",
    },
    {
      title: "Dedicated Customer Support",
      description: "Available round-the-clock to assist you. Whether it's advice on your rental, roadside support, or questions about your vehicle, we're always just a call away.",
    },
    {
      title: "Seamless Booking Experience",
      description: "Simple, quick, and hassle-free reservation process. From browsing our fleet to pickup, we've streamlined everything for your convenience.",
    },
  ];

  return (
    <section className={`${styles.whyUsSection} ${styles.container}`}>
      {/* Decorative background element */}
      <div
        className={`${styles.glowOrb} ${styles.glowOrbTopRight} ${styles.hiddenMobile}`}
      ></div>
      <div
        className={`${styles.glowOrb} ${styles.glowOrbBottomLeft} ${styles.hiddenMobile}`}
      ></div>
      <SectionHeader
        title="Why Choose Car Hire Now"
        description="We're more than just a rental service—we're your partner in creating unforgettable moments. Here's what sets us apart in Dubai's luxury car rental market:"
      />

      <div className={`${styles.benefitsGrid}`}>
        {benefits.map((benefit, item) => (
          <div
            key={item}
            className={`${styles.benefitCard} ${styles.shadowHover}`}
          >
            {/* Card Content Goes Here */}
            <div className={styles.cardContent}>
              <div className={styles.numberBadge}>
                <p className={styles.numberText}>{item + 1}</p>
              </div>
              <div className={styles.contentWrapper}>
                <p className={styles.cardTitle}>{benefit.title}</p>
                <p className={styles.description}>
                  {benefit.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
