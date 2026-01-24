"use client";

import React, { useState, useMemo, Suspense } from "react";
import styles from "../../../styles/frontend/fleet.module.css";
import CarRentalCard from "@/src/components/CarRentalCard";
import { CarType } from "@/src/types/CarType";
import {
  FaFilter,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { Funnel } from "lucide-react";
import Image from "next/image";
import { useCars } from "@/src/hooks/useCars";

// Helper to normalize brand name for image path
const getBrandImagePath = (brand: string) => {
  // Convert to lowercase and remove spaces for file names like "landrover.webp", "rollsroyce.webp"
  const normalizedBrand = brand.toLowerCase().replace(/\s+/g, "");
  return `/images/carLogos/${normalizedBrand}.webp`;
};


function FleetContent() {
  const SearchParams = useSearchParams();

  // Fetch cars using React Query
  const { data: allCars = [], isLoading: loading } = useCars();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // --- Filter States ---
  // Initialize brand/type from URL params to avoid syncing in an effect
  const brandFromUrl = SearchParams.get("brand");
  const typeFromUrl = SearchParams.get("type");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    brandFromUrl ?? null
  );
  const [selectedType, setSelectedType] = useState<string | null>(
    typeFromUrl ?? null
  );
  const [selectedSeats, setSelectedSeats] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // --- Pagination States ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Note: we intentionally avoid calling setState inside an effect here.
  // Initialization from `SearchParams` above prevents cascading updates.

  // Filtering Logic using useMemo to prevent infinite loops
  const filteredCars = useMemo(() => {
    let result = allCars;

    if (selectedBrand) {
      const normalizedSelectedBrand = selectedBrand.toLowerCase().replace(/\s+/g, "");
      result = result.filter((car) =>
        car.brand.toLowerCase().replace(/\s+/g, "") === normalizedSelectedBrand
      );
    }
    if (selectedType) {
      result = result.filter((car) =>
        car.type.toLowerCase() === selectedType.toLowerCase()
      );
    }
    if (selectedSeats) {
      result = result.filter((car) => Number(car.seats) === selectedSeats);
    }
    if (selectedYear) {
      result = result.filter((car) => Number(car.year) === selectedYear);
    }

    return result;
  }, [selectedBrand, selectedType, selectedSeats, selectedYear, allCars]);

  // 3. Helper to count items (with normalized brand matching)
  const getCount = (key: keyof CarType, value: any) => {
    if (key === "brand") {
      const normalizedValue = String(value).toLowerCase().replace(/\s+/g, "");
      return allCars.filter((car) =>
        car.brand.toLowerCase().replace(/\s+/g, "") === normalizedValue
      ).length;
    }
    return allCars.filter((car) => car[key] == value).length;
  };

  // 4. Extract Unique Lists (normalize to prevent duplicates like "Land Rover" and "LandRover")
  const uniqueBrands = Array.from(
    allCars.reduce((map, car) => {
      const normalizedBrand = car.brand.toLowerCase().replace(/\s+/g, "");
      if (!map.has(normalizedBrand)) {
        map.set(normalizedBrand, car.brand); // Keep original display name
      }
      return map;
    }, new Map<string, string>()).values()
  );
  const uniqueTypes = Array.from(new Set(allCars.map((c) => c.type)));
  const uniqueSeats = Array.from(
    new Set(allCars.map((c) => Number(c.seats)).filter((s) => !isNaN(s)))
  ).sort((a, b) => a - b);
  const uniqueYears = Array.from(
    new Set(allCars.map((c) => Number(c.year)).filter((y) => !isNaN(y) && y > 0))
  ).sort((a, b) => b - a);

  // 5. Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 6. Reset Handler
  const resetFilters = () => {
    setSelectedBrand(null);
    setSelectedType(null);
    setSelectedSeats(null);
    setSelectedYear(null);
    setCurrentPage(1);
    // Optional: Close mobile menu on reset
    setShowMobileFilters(false);
  };

  // Helper to toggle selection and optionally close mobile menu
  // You can decide if you want the menu to close immediately on selection or stay open
  const handleFilterClick = <T,>(
    setter: React.Dispatch<React.SetStateAction<T | null>>,
    currentValue: T | null,
    newValue: T
  ) => {
    setter(currentValue === newValue ? null : newValue);
    setCurrentPage(1); // Reset to page 1 when filter changes
  };

  return (
    <section className={styles.fleet}>
      <div className={styles.pageContainer}>


        {/* --- Mobile Controls --- */}
        <button
          className={styles.mobileFilterToggle}
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          {showMobileFilters ? <FaTimes /> : <FaFilter />}
          {showMobileFilters ? "Close Filters" : "Show Filters"}
        </button>

        {/* --- Mobile Backdrop (Click to close) --- */}
        <div
          className={`${styles.backdrop} ${showMobileFilters ? styles.show : ""
            }`}
          onClick={() => setShowMobileFilters(false)}
        />

        <div className="flex gap-8 relative">
          {/* ---------------- FILTER SIDEBAR CONTAINER ---------------- */}
          {/* We wrap all asides in this container for the Mobile Drawer logic */}
          <div
            className={`${styles.filtersContainer} ${showMobileFilters ? styles.show : ""
              }`}
          >
            {/* Mobile Only: Header inside drawer */}
            <div className={styles.mobileFilterHeader}>

            </div>

            {/* Brand Filter */}
            <aside className={styles.sidebar}>
              <div className={styles.filterGroup}>
                <div className={styles.filterTitle}>
                  <Funnel size={18} />
                  Browse by Brand
                </div>

                <div className={styles.filterList}>
                  <div
                    className={`${styles.filterItem} ${selectedBrand === null ? styles.active : ""
                      }`}
                    onClick={() => setSelectedBrand(null)}
                  >
                    <span className="font-semibold">All Brands</span>
                    <span className={styles.countBadge}>{allCars.length}</span>
                  </div>

                  {uniqueBrands.map((brand) => (
                    <div
                      key={brand}
                      className={`${styles.filterItem} ${selectedBrand?.toLowerCase() === brand.toLowerCase() ? styles.active : ""
                        }`}
                      onClick={() =>
                        handleFilterClick(
                          setSelectedBrand,
                          selectedBrand,
                          brand
                        )
                      }
                    >
                      <div className="flex gap-1 items-center justify-center">
                        <Image
                          src={getBrandImagePath(brand)}
                          alt={brand}
                          height={20}
                          width={20}
                          className="object-contain"
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

            {/* Category Filter */}
            <aside className={styles.sidebar}>
              <div className={styles.filterGroup}>
                <div className={styles.filterTitle}>Categories</div>
                <div className={styles.filterList}>
                  {uniqueTypes.map((type) => (
                    <div
                      key={type}
                      className={`${styles.filterItem} ${selectedType?.toLowerCase() === type.toLowerCase() ? styles.active : ""
                        }`}
                      onClick={() =>
                        handleFilterClick(setSelectedType, selectedType, type)
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

            {/* Seats Filter */}
            <aside className={styles.sidebar}>
              <div className={styles.filterGroup}>
                <div className={styles.filterTitle}>Seats</div>
                <div className={styles.filterList}>
                  {uniqueSeats.map((seats) => (
                    <div
                      key={seats}
                      className={`${styles.filterItem} ${selectedSeats === seats ? styles.active : ""
                        }`}
                      onClick={() =>
                        handleFilterClick(
                          setSelectedSeats,
                          selectedSeats,
                          seats
                        )
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

            {/* Year Filter */}
            <aside className={styles.sidebar}>
              <div className={styles.filterGroup}>
                <div className={styles.filterTitle}>Year</div>
                <div className={styles.filterList}>
                  {uniqueYears.map((year) => (
                    <div
                      key={year}
                      className={`${styles.filterItem} ${selectedYear === year ? styles.active : ""
                        }`}
                      onClick={() =>
                        handleFilterClick(setSelectedYear, selectedYear, year)
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

            {/* Mobile Only: Show Results Button inside drawer - sticky at bottom */}
            <div className={styles.mobileResultsButtonContainer}>
              <button
                onClick={() => setShowMobileFilters(false)}
                className={styles.mobileResultsBtn}
              >
                Show {filteredCars.length} Results
              </button>
            </div>
          </div>
          {/* ---------------- END FILTERS ---------------- */}

          <main className={styles.mainContent}>
            <div className={styles.headerArea}>
              <h1 className={styles.pageTitle}>All Vehicles</h1>
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
              <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
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
                      className={`p-2 rounded-md border ${currentPage === 1
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
                          className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium transition-colors ${currentPage === number
                            ? "bg-orange-500 text-white"
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
                      className={`p-2 rounded-md border ${currentPage === totalPages
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
