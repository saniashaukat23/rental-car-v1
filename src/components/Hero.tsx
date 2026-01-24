import Image from "next/image";
import { Check } from "lucide-react";
import styles from "../styles/frontend/hero.module.css";
import FilterBox from "./FilterBar";
import SectionHeader from "./SectionHeader";
import CarCategoryGrid from "./carCategoryGrid";
import BrandSwiperWrapper from "./BrandSwiperWrapper";
import LuxuryCarProcess from "./LuxuryCarProcess";
import CarCardsSection from "./CarCardsSection";
import WhyChooseUs from "./WhyUs";
import Requirements from "./Requiements";
import PaymentSection from "./PaymentSection";
import dbConnect from "../lib/db";
import Car from "../models/Car";
import SecurityDeposit from "./DepositInformation";

// Direct data fetcher without caching to avoid 2MB limit errors
async function getCarsByCategory(category: string) {
  try {
    await dbConnect();
    const regex = new RegExp(`^${category}$`, "i");

    const cars = await Car.find({ type: { $regex: regex } })
      .select(
        "name brand type pricing transmission fuel seats color carId applyDiscount images"
      )
      .limit(6)
      .sort({ createdAt: -1 })
      .lean();

    // Keep full images array so UI components can use all images
    const processedCars = cars.map((car: Record<string, unknown>) => ({
      ...car,
      images: Array.isArray(car.images) ? car.images : []
    }));

    return JSON.parse(JSON.stringify(processedCars));
  } catch (error) {
    console.error(`Error fetching ${category}:`, error);
    return [];
  }
}

export default async function Hero() {
  const [suvs, sports, sedan] = await Promise.all([
    getCarsByCategory("SUV"),
    getCarsByCategory("Sports"),
    getCarsByCategory("Sedan"),
  ]);
  const listItems = ["Instant Booking", "24/7 Support", "Best Prices"];

  return (
    <>
      <section className={styles.heroBG}>
        <div className={styles.bgImageContainer}>
          <Image
            src="/images/landingBG.png"
            alt="Luxury cars on a Dubai city street at night"
            fill
            className={styles.bgImage}
            priority
          />
        </div>
        {/* Dark Overlay */}
        <div className={styles.overlay}></div>
        {/* Content */}
        <div className={styles.innerhero}>
          <p className={styles.subTitle}>••• PREMIUM LUXURY RENTALS</p>
          <h1 className={styles.mainTitle}>
            Experience Luxury in{" "}
            <span className={styles.highlightText}>Dubai</span>
          </h1>
          <p className={styles.descriptionText}>
            Discover an unparalleled driving experience with our handpicked collection of premium and luxury vehicles. From the gleaming streets to the desert expanse, explore Dubai in style.
          </p>
          <ul className={styles.featuresList}>
            {listItems.map((item, index) => (
              <li key={index} className={styles.featureItem}>
                <Check size={20} className={styles.checkIcon} /> {item}
              </li>
            ))}
          </ul>
          <FilterBox />
        </div>
      </section>
      {/* --- 1. Category Grid --- */}
      <section className={styles.sectionPadding}>
        <div className={styles.sectionmargin}>
          <SectionHeader
            title="Choose Your Favorite Category"
            description="Find your perfect ride from our diverse collection"
          />
          <div className={styles.marginTop10}>
            <CarCategoryGrid />
          </div>
        </div>
      </section>
      <section className={styles.sectionmargin}>
        <div className={styles.paddingX4}>
          <SectionHeader
            title="Choose Your Favorite Brand"
            description="Luxury brands you love, all in one place"
          />
        </div>
        <BrandSwiperWrapper />
      </section>
      <section className={styles.sectionPaddingTop}>
        <div className={styles.sectionPaddingXLarge}>
          <SectionHeader
            title="Explore Cars by Category"
            description="Rent premium cars in Dubai from our diverse collection"
          />
        </div>
        <CarCardsSection title="Sedan" category="Sedan" cars={sedan} />
        <CarCardsSection
          title="Luxury SUVs"
          category="suv"
          bgColor="bg-gray-50"
          cars={suvs}
        />
        <CarCardsSection title="Sports Cars" category="sports" cars={sports} />
      </section>
      <WhyChooseUs />
      <section className={`${styles.sectionPadding} ${styles.sectionPaddingX} ${styles.bgGrayLight}`}>
        <SectionHeader
          title="How to Book"
          description="Simple 3-step process to get your luxury car in Dubai"
        />
        <LuxuryCarProcess />
      </section>
      <SecurityDeposit />
      <section className={`${styles.sectionPaddingBottom} ${styles.sectionPaddingX} ${styles.bgGrayLight}`}>
        <SectionHeader
          title="Rental Requirements"
          description="Everything you need to rent a luxury car in Dubai"
        />
        <Requirements />
      </section>
      <PaymentSection />
    </>
  );
}
