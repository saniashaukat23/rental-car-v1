"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit, Trash2, Fuel, Settings, Calendar, Tag } from "lucide-react";
// Type import (Apne path ke hisaab se adjust kar lena)
import { CarType } from "@/src/types/CarType";
import styles from "../../styles/admin/GeneralSettings.module.css";

interface TotalCarsProps {
  cars: CarType[];
  title?: string;
  subtitle?: string;
}

const TotalCars = ({
  cars,
  title = "Fleet Inventory",
  subtitle = "Manage your vehicle database, update pricing, and track availability."
}: TotalCarsProps) => {
  return (
    <div className={styles.tcContainer}>
      {/* --- Header Section --- */}
      <div className={styles.tcHeader}>
        <div>
          <h2 className={styles.tcHeaderTitle}>{title}</h2>
          <p className={styles.tcHeaderSubtitle}>{subtitle}</p>
        </div>
        <div className={styles.tcTotalBadge}>
          {cars?.length || 0} Vehicles Total
        </div>
      </div>

      {/* --- Table Container --- */}
      <div className={styles.tcTableContainer}>
        <div className={styles.tcTableScroll}>
          <table className={styles.tcTable}>
            {/* Table Head */}
            <thead className={styles.tcThead}>
              <tr>
                <th className={styles.tcTh}>
                  Vehicle
                </th>
                <th className={styles.tcTh}>
                  Category
                </th>
                <th className={styles.tcTh}>
                  Specs
                </th>
                <th className={styles.tcTh}>
                  Daily Rate
                </th>
                <th className={styles.tcThRight}>
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className={styles.tcTbody}>
              {!cars || cars.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.tcEmptyState}>
                    <div className={styles.tcEmptyStateContent}>
                      <div className={styles.tcEmptyIconWrapper}>
                        <Settings className={styles.tcEmptyIcon} />
                      </div>
                      <p>No cars found in inventory.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                cars.map((car) => (
                  <tr
                    key={car._id}
                    className={styles.tcRow}
                  >
                    {/* Column 1: Image & Name */}
                    <td className={styles.tcTd}>
                      <div className={styles.tcCarInfoCell}>
                        <div className={styles.tcImageWrapper}>
                          {car.images?.[0] ? (
                            <Image
                              src={car.images[0].url}
                              alt={car.name}
                              width={64}
                              height={48}
                              className={styles.tcCarImage}
                              priority={false}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/placeholder-car.png";
                              }}
                            />
                          ) : (
                            <div className={styles.tcNoImagePlaceholder}>
                              <span className={styles.tcNoImageText}>No Image</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className={styles.tcBrand}>
                            {car.brand}
                          </div>
                          <div className={styles.tcName}>
                            {car.name}
                          </div>
                          <div className={styles.tcYear}>
                            <Calendar size={10} /> {car.year}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Category Badge */}
                    <td className={styles.tcTd}>
                      <span className={styles.tcTypeBadge}>
                        {car.type}
                      </span>
                    </td>

                    {/* Column 3: Specs (Icons) */}
                    <td className={styles.tcTd}>
                      <div className={styles.tcSpecsWrapper}>
                        <div className={styles.tcSpecItem}>
                          <Settings size={12} className={styles.tcSpecIcon} />{" "}
                          {car.transmission}
                        </div>
                        <div className={styles.tcSpecItem}>
                          <Fuel size={12} className={styles.tcSpecIcon} />{" "}
                          {car.fuel}
                        </div>
                      </div>
                    </td>

                    {/* Column 4: Price */}
                    <td className={styles.tcTd}>
                      {car.applyDiscount && car.pricing?.originalDaily ? (
                        <div className={styles.tcPriceWrapper}>
                          <span className={styles.tcDiscountLabel}>
                            Discount
                          </span>
                          <div className={styles.tcPriceRow}>
                            <span className={styles.tcOriginalPrice}>
                              {car.pricing?.currency || "AED"} {car.pricing?.originalDaily}
                            </span>
                            <div className={styles.tcCurrentPriceDiscounted}>
                              {car.pricing?.currency || "AED"} {car.pricing?.daily}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className={styles.tcCurrentPriceNormal}>
                          {car.pricing?.currency || "AED"} {car.pricing?.daily}
                        </div>
                      )}
                      <div className={styles.tcDayLabel}>/ day</div>
                    </td>

                    {/* Column 5: Actions */}
                    <td className={styles.tcActionsCell}>
                      <div className={styles.tcActionsWrapper}>
                        <Link
                          href={`/admin/cars/${car._id}`}
                          className={styles.tcEditButton}
                          title="Edit"
                        >
                          <Edit size={16} />
                        </Link>

                        {car.applyDiscount && (
                          <button
                            onClick={async () => {
                              if (!confirm("Remove discount and restore original prices?")) return;
                              try {
                                const res = await fetch(`/api/cars/${car._id}`, {
                                  method: "PUT",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({
                                    ...car,
                                    applyDiscount: false,
                                    pricing: {
                                      ...car.pricing,
                                      daily: car.pricing.originalDaily || car.pricing.daily,
                                      weekly: car.pricing.originalWeekly || car.pricing.weekly || 0,
                                      monthly: car.pricing.originalMonthly || car.pricing.monthly || 0,
                                    },
                                  }),
                                });
                                if (res.ok) {
                                  alert("Success: Discount removed and prices restored.");
                                  window.location.reload();
                                } else {
                                  const errorData = await res.json();
                                  alert(`Error: ${errorData.error || "Failed to update"}`);
                                }
                              } catch (err) {
                                console.error("Update error:", err);
                                alert("Failed to connect to the server.");
                              } finally {
                                // No loading state needed for now as reload follows
                              }
                            }}
                            className={styles.tcTagButton}
                            title="Remove Discount"
                          >
                            <Tag size={16} />
                          </button>
                        )}

                        <button
                          className={styles.tcDeleteButton}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TotalCars;
