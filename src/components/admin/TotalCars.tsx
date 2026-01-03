"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit, Trash2, Fuel, Settings, Calendar } from "lucide-react";
// Type import (Apne path ke hisaab se adjust kar lena)
import { CarType } from "@/src/types/CarType";
interface TotalCarsProps {
  cars: CarType[];
}

const TotalCars = ({ cars }: TotalCarsProps) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Fleet Inventory</h2>
          <p className="text-slate-500 text-sm mt-1">
            Manage your vehicle database, update pricing, and track
            availability.
          </p>
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
                        <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                          <Image
                            src={car.images?.[0] || "/placeholder-car.png"}
                            alt={car.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
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
                      <div className="font-bold text-slate-800">
                        {car.pricing?.currency || "AED"} {car.pricing?.daily}
                      </div>
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
