"use client";
import React, { useState } from "react";
import Sidebar from "./SideBar";
import AddCar from "./GeneralSettings";
import DashboardOverview from "./DashboardOverview";
import { CarType } from "@/src/types/CarType";
import Image from "next/image";
import TotalCars from "./TotalCars";
import { Search, Bell } from "lucide-react";

// 1. Define the Props Interface
interface DashboardProps {
  cars: CarType[];
}

// 2. Add the type to the component arguments
const Dashboard = ({ cars }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-[#334155]">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search here..."
              className="w-full bg-gray-50 border-none rounded-md py-2 pl-10 text-sm focus:ring-1 focus:ring-lime-500"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 bg-gray-50 rounded-full hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              <Image
                src="/api/placeholder/40/40"
                alt="Profile"
                height={40}
                width={40}
              />
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {/* Dashboard Overview Tab */}
            {activeTab === "Dashboard" && <DashboardOverview cars={cars} />}

            {activeTab === "Add Car" ? <AddCar /> : ""}

            {/* 3. Pass the cars prop down to TotalCars */}
            {activeTab === "Total Cars" ? <TotalCars cars={cars} /> : ""}

            {/* Discounted Cars Tab */}
            {activeTab === "Discounted Cars" ? (
              <TotalCars
                title="Active Promotions"
                subtitle="Currently discounted vehicles appearing on the Special Offers page."
                cars={cars.filter((car) => car.applyDiscount === true)}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
