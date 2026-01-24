"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit, Trash2, Fuel, Settings, Calendar, Tag } from "lucide-react";
// Type import (Apne path ke hisaab se adjust kar lena)
import { CarType } from "@/src/types/CarType";
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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
          <p className="text-slate-500 text-sm mt-1">{subtitle}</p>
        </div>
        <div className="bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg shadow-slate-200">
          {cars?.length || 0} Vehicles Total
        </div>
      </div>

      {/* --- Table Container --- */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Table Head */}
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Specs
                </th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Daily Rate
                </th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100">
              {!cars || cars.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                      <div className="bg-slate-100 p-4 rounded-full">
                        <Settings className="w-6 h-6 text-slate-300" />
                      </div>
                      <p>No cars found in inventory.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                cars.map((car) => (
                  <tr
                    key={car._id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Column 1: Image & Name */}
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                          {car.images?.[0] ? (
                            <Image
                              src={car.images[0]}
                              alt={car.name}
                              width={64}
                              height={48}
                              className="object-cover w-full h-full"
                              priority={false}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/placeholder-car.png";
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                              <span className="text-xs">No Image</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-orange-500 uppercase tracking-wide">
                            {car.brand}
                          </div>
                          <div className="text-sm font-bold text-slate-800">
                            {car.name}
                          </div>
                          <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                            <Calendar size={10} /> {car.year}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Category Badge */}
                    <td className="p-4">
                      <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold border border-slate-200">
                        {car.type}
                      </span>
                    </td>

                    {/* Column 3: Specs (Icons) */}
                    <td className="p-4">
                      <div className="flex flex-col gap-1 text-xs text-slate-500">
                        <div className="flex items-center gap-2">
                          <Settings size={12} className="text-slate-400" />{" "}
                          {car.transmission}
                        </div>
                        <div className="flex items-center gap-2">
                          <Fuel size={12} className="text-slate-400" />{" "}
                          {car.fuel}
                        </div>
                      </div>
                    </td>

                    {/* Column 4: Price */}
                    <td className="p-4">
                      {car.applyDiscount && car.pricing?.originalDaily ? (
                        <div className="flex flex-col">
                          <span className="text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded font-bold uppercase w-fit mb-1">
                            Discount
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 line-through text-xs">
                              {car.pricing?.currency || "AED"} {car.pricing?.originalDaily}
                            </span>
                            <div className="font-bold text-orange-600">
                              {car.pricing?.currency || "AED"} {car.pricing?.daily}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="font-bold text-slate-800">
                          {car.pricing?.currency || "AED"} {car.pricing?.daily}
                        </div>
                      )}
                      <div className="text-xs text-slate-400">/ day</div>
                    </td>

                    {/* Column 5: Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/cars/${car._id}`}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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
                            className="p-2 text-orange-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                            title="Remove Discount"
                          >
                            <Tag size={16} />
                          </button>
                        )}

                        <button
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
