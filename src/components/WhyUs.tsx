import SectionHeader from "./SectionHeader";
import styles from "../styles/frontend/whyUs.module.css";

const WhyChooseUs = () => {
  // Example data for the cards
  const benefits = [0, 1, 2, 3, 4, 5];

  return (
    <section className={`${styles.whyUsSection} ${styles.container}`}>
      {/* Decorative background element */}
      <div
        className={`${styles.glowOrb} -top-20 right-[4%] lg:flex hidden`}
      ></div>
      <div
        className={`${styles.glowOrb} -bottom-4 left-60 -z-10 lg:flex hidden`}
      ></div>
      <SectionHeader
        title="Why People Rent Cars from Luxury In Motion"
        description="At Luxury In Motion Dubai, we offer a world-class luxury car rental experience built on style, performance, and reliability. Here's why clients from around the world choose us every day:"
      />

      <div className={`${styles.benefitsGrid}`}>
        {benefits.map((item) => (
          <div
            key={item}
            className={`shadow-sm hover:shadow-xl ${styles.benefitCard}`}
          >
            {/* Card Content Goes Here */}
            <div className=" w-full flex items-start justify-center gap-4">
              <div className="h-10 w-10 bg-[#f9831516] rounded-full flex justify-center items-center">
                <p className="text-md text-[#f98315]">{benefits[item]}</p>
              </div>
              <div className="flex flex-col w-[80%]">
                <p className={styles.cardTitle}>Premium Fleet of Exotic Cars</p>
                <p className={styles.description}>
                  Choose from Dubais most prestigious vehicles — Lamborghini,
                  Rolls-Royce, Mercedes G63, Ferrari, Range Rover, and more.
                  Every car is in immaculate condition and regularly maintained
                  to ensure the best performance.
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
