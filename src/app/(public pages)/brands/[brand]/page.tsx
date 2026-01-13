"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCar, FaArrowRight } from "react-icons/fa";
import CarRentalCard from "@/src/components/CarRentalCard";
import styles from "../../../../styles/frontend/brandpage.module.css";
import { BrandDescription } from "@/src/components/BrandDescription";
import { CarType } from "@/src/types/CarType";
type PageProps = {
  params: Promise<{ brand: string }>;
};
export default function BrandCarsPage({ params }: PageProps) {
  const { brand } = use(params);
  const brandSlug = brand.toLowerCase();
  const brandDisplayName =
    brandSlug.charAt(0).toUpperCase() + brandSlug.slice(1).replace(/-/g, " ");
  const [cars, setCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex] = useState(0);
  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/cars?brand=${brand}`, {
          cache: "no-store",
        });
        const data = await res.json();
        const carsArray = Array.isArray(data) ? data : data.cars || [];
        setCars(carsArray);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [brand]);

  const safeCars = Array.isArray(cars) ? cars : [];
  const DISPLAY_COUNT = 3;
  const featuredCars = safeCars.slice(0, DISPLAY_COUNT);

  const normalizedCars =
    featuredCars.length > 0
      ? Array.from(
          { length: DISPLAY_COUNT },
          (_, i) => featuredCars[i % featuredCars.length]
        )
      : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {loading && (
        <div className="h-[80vh] flex flex-col items-center justify-center bg-white">
          <div className="w-12 h-12 border-4 border-gray-100 border-t-black rounded-full animate-spin mb-6"></div>
          <p className="text-gray-400 text-sm tracking-widest uppercase animate-pulse">
            Locating {brandDisplayName} Fleet...
          </p>
        </div>
      )}
      {!loading && (
        <>
          {normalizedCars.length > 0 ? (
            <section className={styles.landingGridContainer}>
              <div className="absolute top-[15%] left-[8%] z-10 p-6 rounded-2xl bg-white/5 border border-white/20 backdrop-blur-md shadow-2xl">
                <div className={styles.logoBox}>
                  <Image
                    src={`/images/carLogos/${brandSlug}.webp`}
                    className={styles.logoImage}
                    height={60}
                    width={60}
                    alt={brandSlug}
                    quality={100}
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
              </div>
              <div className="absolute bottom-[24%] right-[3%] z-10 p-5 rounded-2xl bg-white/5 border border-white/20 backdrop-blur-md shadow-2xl">
                <div className="flex flex-col text-center">
                  <p className="text-3xl text-white font-black capitalize">
                    {safeCars.length}
                  </p>
                  <p className="text-[10px] tracking-widest text-white/70 font-bold uppercase mt-1">
                    Available Models
                  </p>
                </div>
              </div>
              {normalizedCars.map((car, index) => (
                <div
                  key={`${car._id}-${index}`}
                  className={styles.imageWrapper}
                >
                  <Image
                    src={
                      car.images?.[activeIndex] || "/images/placeholder.webp"
                    }
                    alt={car.name}
                    fill
                    className={styles.imageObjectCover}
                    priority={index === 0}
                  />
                  <div className={styles.imageOverlay} />
                </div>
              ))}
            </section>
          ) : (
            <div className="h-20  w-full"></div>
          )}
          <section
            className={`${styles.carListSection} ${styles.sectionmargin} min-h-[50vh]`}
          >
            <div className="mb-12">
              <h1 className={styles.carListTitle}>{brandDisplayName} </h1>
              <div className="h-1 w-32 bg-orange-500  rounded-full"></div>
            </div>

            {safeCars.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 px-4">
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 max-w-lg w-full text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCar className="text-3xl text-gray-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {brandDisplayName} Currently Unavailable
                  </h3>
                  <p className="text-gray-500 mb-8 leading-relaxed">
                    We are currently restocking our {brandDisplayName} fleet.
                    However, we have many other luxury options available for you
                    today.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/our-fleet"
                      className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group"
                    >
                      View All Vehicles
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/contact"
                      className="w-full bg-white border-2 border-gray-100 hover:border-gray-300 text-gray-700 font-bold py-4 rounded-xl transition-all"
                    >
                      Contact Support
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.carGrid}>
                {safeCars.map((car) => (
                  <CarRentalCard key={car._id} car={car} />
                ))}
              </div>
            )}
          </section>
          <BrandDescription brandName={brandDisplayName} />
        </>
      )}
    </div>
  );
}
