import React from "react";
import Link from "next/link";
import Image from "next/image";
import dbConnect from "@/src/lib/db";
import Car from "@/src/models/Car";
import {
  TrendingDown,
  Star,
  Users,
  Settings,
  Fuel,
  Phone,
  MessageCircle,
  Tag,
} from "lucide-react";
import styles from "../../../styles/frontend/discountedCar.module.css";

export const dynamic = "force-dynamic";

async function getDiscountedCars() {
  try {
    await dbConnect();
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

        <div className={styles.grid}>
          {cars.length > 0 ? (
            cars.map((car) => {
              const oldDaily = Math.round(car.pricing.daily * 1.15);
              const oldWeekly = Math.round(car.pricing.weekly * 1.15);
              const oldMonthly = Math.round(car.pricing.monthly * 1.15);

              return (
                <div key={car._id} className={styles.card}>
                  <div className={styles.discountBadge}>
                    <TrendingDown className="w-4 h-4" />
                    <span className={styles.discountText}>Special Offer</span>
                  </div>
                  <div className={styles.labelBadge}>
                    <span className={styles.labelText}>Book Now!</span>
                  </div>

                  {/* Image Link */}
                  <Link
                    href={`/cars/${car._id}`}
                    className={styles.imageWrapper}
                  >
                    <Image
                      src={car.images?.[0] || "/images/placeholder.webp"}
                      alt={car.name}
                      fill
                      className={styles.carImage}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </Link>

                  {/* Content */}
                  <div className={styles.content}>
                    <div className={styles.headerRow}>
                      <div className={styles.titleGroup}>
                        {/* Placeholder for brand logo if not in DB, generic brand text otherwise */}
                        <div>
                          <h3 className={styles.carTitle}>{car.name}</h3>
                          <p className={styles.carType}>
                            {car.type || car.brand}
                          </p>
                        </div>
                      </div>
                      <div className={styles.rating}>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>4.8</span>
                      </div>
                    </div>

                    <div className={styles.divider}></div>

                    {/* Specs Grid */}
                    <div className={styles.specsRow}>
                      <div className={styles.specItem}>
                        <Users className="w-4 h-4" />
                        <span>{car.seats || 4} seats</span>
                      </div>
                      <div className={styles.specItem}>
                        <Settings className="w-4 h-4" />
                        <span>{car.transmission || "Auto"}</span>
                      </div>
                      <div className={styles.specItem}>
                        <Fuel className="w-4 h-4" />
                        <span>{car.fuel || "Gasoline"}</span>
                      </div>
                    </div>

                    <div className={styles.divider}></div>

                    {/* Pricing Table */}
                    <div className={styles.priceBlock}>
                      <div className={styles.priceRow}>
                        <span className={styles.priceLabel}>Daily</span>
                        <div className={styles.priceValues}>
                          <span className={styles.oldPrice}>
                            AED {oldDaily}
                          </span>
                          <span className={styles.newPrice}>
                            AED {car.pricing.daily}
                          </span>
                        </div>
                      </div>
                      <div className={styles.priceRow}>
                        <span className={styles.priceLabel}>Weekly</span>
                        <div className={styles.priceValues}>
                          <span className={styles.oldPrice}>
                            AED {oldWeekly}
                          </span>
                          <span className={styles.newPrice}>
                            AED {car.pricing.weekly}
                          </span>
                        </div>
                      </div>
                      <div className={styles.priceRow}>
                        <span className={styles.priceLabel}>Monthly</span>
                        <div className={styles.priceValues}>
                          <span className={styles.oldPrice}>
                            AED {oldMonthly}
                          </span>
                          <span className={styles.newPrice}>
                            AED {car.pricing.monthly}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.divider}></div>
                  </div>

                  {/* Action Buttons */}
                  <div className={styles.actions}>
                    <div className={styles.buttonGroup}>
                      <a href="tel:+97141234567" className={styles.linkWrapper}>
                        <button className={`${styles.btn} ${styles.btnCall}`}>
                          <Phone className="w-4 h-4" />
                          <span>Call Us</span>
                        </button>
                      </a>
                      <a
                        href={`https://wa.me/971501234567?text=Hi%2C%20I'm%20interested%20in%20renting%20the%20${encodeURIComponent(
                          car.name
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkWrapper}
                      >
                        <button
                          className={`${styles.btn} ${styles.btnWhatsapp}`}
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp</span>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            /* Empty State */
            <div className={styles.emptyState}>
              <Tag className="w-12 h-12 text-slate-300 mb-4" />
              <p className="text-slate-400 text-lg font-medium">
                No discounted cars available at the moment.
              </p>
              <p className="text-slate-400 text-sm mt-1">
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
            <span className="text-orange-500 font-semibold">
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
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
            <a
              href="tel:971582947143"
              className={`${styles.ctaBtn} ${styles.ctaBtnSecondary}`}
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
