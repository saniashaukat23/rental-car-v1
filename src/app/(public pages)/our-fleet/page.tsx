"use client";

import React, { useState, useEffect, Suspense } from "react";
import styles from "../../../styles/frontend/fleet.module.css";
import CarRentalCard from "@/src/components/CarRentalCard";

import { CarType } from "@/src/types/CarType";
import {
  FaFilter,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa"; // Added Chevrons
import { useSearchParams } from "next/navigation";
import { Funnel } from "lucide-react";
import Image from "next/image";

function FleetContent() {
  const SearchParams = useSearchParams();
  const [allCars, setAllCars] = useState<CarType[]>([]);
  const [filteredCars, setFilteredCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // --- Filter States ---
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // --- Pagination States ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // 1. Fetch Cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("/api/cars", { cache: "no-store" });
        const data = await res.json();
        const carsArray = Array.isArray(data) ? data : data.cars || [];
        setAllCars(carsArray);
        setFilteredCars(carsArray);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const typeFromUrl = SearchParams.get("type");
    if (typeFromUrl) {
      setSelectedType(typeFromUrl);
    }
  }, [SearchParams]);

  // 2. Filtering Logic (Runs whenever a filter changes)
  useEffect(() => {
    let result = allCars;

    if (selectedBrand) {
      result = result.filter((car) => car.brand === selectedBrand);
    }
    if (selectedType) {
      result = result.filter((car) => car.type === selectedType);
    }
    if (selectedSeats) {
      result = result.filter((car) => Number(car.seats) === selectedSeats);
    }
    if (selectedYear) {
      result = result.filter((car) => Number(car.year) === selectedYear);
    }

    setFilteredCars(result);
    // IMPORTANT: Reset to page 1 whenever filters change
    setCurrentPage(1);
  }, [selectedBrand, selectedType, selectedSeats, selectedYear, allCars]);

  // 3. Helper to count items for badges
  const getCount = (key: keyof CarType, value: any) => {
    return allCars.filter((car) => car[key] == value).length;
  };

  // 4. Extract Unique Lists dynamically
  const uniqueBrands = Array.from(new Set(allCars.map((c) => c.brand)));
  const uniqueTypes = Array.from(new Set(allCars.map((c) => c.type)));
  const uniqueSeats = Array.from(
    new Set(allCars.map((c) => Number(c.seats)))
  ).sort((a, b) => a - b);
  const uniqueYears = Array.from(
    new Set(allCars.map((c) => Number(c.year)))
  ).sort((a, b) => b - a);

  // 5. Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Optional: Scroll to top of grid when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 6. Reset Handler
  const resetFilters = () => {
    setSelectedBrand(null);
    setSelectedType(null);
    setSelectedSeats(null);
    setSelectedYear(null);
    setCurrentPage(1);
  };

  return (
    <section className={styles.fleet}>
      <div className={styles.pageContainer}>
        <button
          className={styles.mobileFilterToggle}
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          {showMobileFilters ? <FaTimes /> : <FaFilter />}
          {showMobileFilters ? "Close Filters" : "Show Filters"}
        </button>
        <div className="flex gap-8">
          {/* ---------------- SIDEBARS START ---------------- */}
          <div className={styles.layoutGrid}>
            <aside
              className={`${styles.sidebar} ${
                showMobileFilters ? styles.show : ""
              }`}
            >
              <div className={styles.filterGroup}>
                <div className={styles.filterTitle}>
                  <Funnel />
                  Browse by Brand
                </div>

                <div className={styles.filterList}>
                  <div
                    className={`${styles.filterItem} ${
                      selectedBrand === null ? styles.active : ""
                    }`}
                    onClick={() => setSelectedBrand(null)}
                  >
                    <span className="font-semibold">All Brands</span>
                    <span className={styles.countBadge}>{allCars.length}</span>
                  </div>

                  {uniqueBrands.map((brand) => (
                    <div
                      key={brand}
                      className={`${styles.filterItem} ${
                        selectedBrand === brand ? styles.active : ""
                      }`}
                      onClick={() =>
                        setSelectedBrand(selectedBrand === brand ? null : brand)
                      }
                    >
                      <div className="flex gap-1 items-center justify-center">
                        <Image
                          src={`/images/carLogos/${brand}.webp`}
                          alt={brand}
                          height={30}
                          width={30}
                        />
                        <span className="capitalize">{brand}</span>
                      </div>

                      <span className={styles.countBadge}>
                        {getCount("brand", brand)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
            <aside
              className={`${styles.sidebar} ${
                showMobileFilters ? styles.show : ""
              }`}
            >
              <div
                className={
                  uniqueTypes.length > 6
                    ? styles.filterGroup
                    : styles.filterGroup2
                }
              >
                <div className={styles.filterTitle}>Categories</div>
                <div className={styles.filterList}>
                  {uniqueTypes.map((type) => (
                    <div
                      key={type}
                      className={`${styles.filterItem} ${
                        selectedType === type ? styles.active : ""
                      }`}
                      onClick={() =>
                        setSelectedType(selectedType === type ? null : type)
                      }
                    >
                      <span className="capitalize">{type}</span>
                      <span className={styles.countBadge}>
                        {getCount("type", type)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
            <aside
              className={`${styles.sidebar} ${
                showMobileFilters ? styles.show : ""
              }`}
            >
              <div
                className={
                  uniqueSeats.length > 6
                    ? styles.filterGroup
                    : styles.filterGroup2
                }
              >
                <div className={styles.filterTitle}>Seats</div>
                <div className={styles.filterList}>
                  {uniqueSeats.map((seats) => (
                    <div
                      key={seats}
                      className={`${styles.filterItem} ${
                        selectedSeats === seats ? styles.active : ""
                      }`}
                      onClick={() =>
                        setSelectedSeats(selectedSeats === seats ? null : seats)
                      }
                    >
                      <span>{seats} Seats</span>
                      <span className={styles.countBadge}>
                        {getCount("seats", seats)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
            <aside
              className={`${styles.sidebar} ${
                showMobileFilters ? styles.show : ""
              }`}
            >
              <div
                className={
                  uniqueYears.length > 6
                    ? styles.filterGroup
                    : styles.filterGroup2
                }
              >
                <div className={styles.filterTitle}>Year</div>
                <div className={styles.filterList}>
                  {uniqueYears.map((year) => (
                    <div
                      key={year}
                      className={`${styles.filterItem} ${
                        selectedYear === year ? styles.active : ""
                      }`}
                      onClick={() =>
                        setSelectedYear(selectedYear === year ? null : year)
                      }
                    >
                      <span>{year}</span>
                      <span className={styles.countBadge}>
                        {getCount("year", year)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
          {/* ---------------- SIDEBARS END ---------------- */}

          <main className={styles.mainContent}>
            <div className={styles.headerArea}>
              <h1 className={styles.pageTitle}>All Vehicles</h1>
              {/* Updated Result Count Logic */}
              <span className={styles.resultCount}>
                {filteredCars.length > 0
                  ? `Showing ${indexOfFirstItem + 1}-${Math.min(
                      indexOfLastItem,
                      filteredCars.length
                    )} of ${filteredCars.length} vehicles`
                  : "0 vehicles found"}
              </span>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
              </div>
            ) : filteredCars.length === 0 ? (
              <div className={styles.noResults}>
                <h3>No cars match your filters</h3>
                <button
                  onClick={resetFilters}
                  className={styles.resetBtn}
                  style={{ width: "auto", marginTop: "1rem" }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className={styles.carsGrid}>
                  {/* Map over currentCars instead of filteredCars */}
                  {currentCars.map((car) => (
                    <CarRentalCard key={car._id} car={car} />
                  ))}
                </div>

                {/* --- Pagination Controls --- */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8 mb-4">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-md border ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                      }`}
                    >
                      <FaChevronLeft size={14} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (number) => (
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium transition-colors ${
                            currentPage === number
                              ? "bg-orange-500 text-white" // Adjust color to match your theme
                              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                          }`}
                        >
                          {number}
                        </button>
                      )
                    )}

                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-md border ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                      }`}
                    >
                      <FaChevronRight size={14} />
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}

export default function OurFleetPage() {
  return (
    <Suspense fallback={<div>Loading Fleet...</div>}>
      <FleetContent />
    </Suspense>
  );
}
