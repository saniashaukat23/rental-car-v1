import React from "react";
import dbConnect from "@/src/lib/db";
import Car from "@/src/models/Car";
import { Tag, Phone, MessageCircle } from "lucide-react";
import styles from "../../../styles/frontend/discountedCar.module.css";
// Import the shared component
import CarRentalCard from "@/src/components/CarRentalCard";

export const dynamic = "force-dynamic";

async function getDiscountedCars() {
  try {
    await dbConnect();
    // Ensure applyDiscount is selected
    const cars = await Car.find({ applyDiscount: true })
      .select(
        "name brand pricing images year transmission applyDiscount seats fuel type"
      )
      .sort({ updatedAt: -1 })
      .limit(9)
      .lean();

    return cars.map((car: any) => ({
      ...car,
      _id: car._id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching offers:", error);
    return [];
  }
}

export default async function DiscountedCarsPage() {
  const cars = await getDiscountedCars();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subHeader}>Limited Time Deals</span>
          <h1 className={styles.title}>Exclusive Offers</h1>
          <p className={styles.description}>
            Drive your dream car for less. Grab these special discounted rates
            before they are gone.
          </p>
        </div>

        {/* The Grid now renders CarRentalCards */}
        <div className={styles.grid}>
          {cars.length > 0 ? (
            cars.map((car) => <CarRentalCard key={car._id} car={car} />)
          ) : (
            /* Empty State */
            <div className={styles.emptyState}>
              <Tag className={`${styles.iconLarge} ${styles.textSlate300} ${styles.mb4}`} />
              <p className={`${styles.textSlate400} ${styles.textLg} ${styles.fontMedium}`}>
                No discounted cars available at the moment.
              </p>
              <p className={`${styles.textSlate400} ${styles.textSm} ${styles.mt1}`}>
                Check back later for exclusive deals!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            Don&apos;t Miss Out on These Exclusive Offers!
          </h2>
          <p className={styles.ctaText}>
            These special discounts are available for a limited time only. Book
            now to experience{" "}
            <span className={`${styles.textOrange500} ${styles.fontSemibold}`}>
              luxury at unbeatable prices
            </span>
            .
          </p>
          <div className={styles.ctaButtons}>
            <a
              href="https://wa.me/971582947143?text=Hi, I want to rent a car with discount offer"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.ctaBtn} ${styles.ctaBtnPrimary}`}
            >
              <MessageCircle className={styles.iconMedium} />
              WhatsApp Us
            </a>
            <a
              href="tel:971582947143"
              className={`${styles.ctaBtn} ${styles.ctaBtnSecondary}`}
            >
              <Phone className={styles.iconMedium} />
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
