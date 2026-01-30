"use client";
import React, { useState } from "react";
import Sidebar from "./SideBar";
import AddCar from "./GeneralSettings";
import DashboardOverview from "./DashboardOverview";
import { CarType } from "@/src/types/CarType";
import Image from "next/image";
import styles from "../../styles/admin/GeneralSettings.module.css";
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
    <div className={styles.dashRoot}>
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className={styles.dashMain}>
        {/* Top Header */}
        <header className={styles.dashHeader}>
          <div className={styles.dashSearchContainer}>
            <Search className={styles.dashSearchIcon} />
            <input
              type="text"
              placeholder="Search here..."
              className={styles.dashSearchInput}
            />
          </div>
          <div className={styles.dashHeaderRight}>
            <button className={styles.dashIconButton}>
              <Bell className={styles.dashIconSmall} />
            </button>
            <div className={styles.dashProfileAvatar}>
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
        <div className={styles.dashContent}>
          <div className={styles.dashInner}>
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
