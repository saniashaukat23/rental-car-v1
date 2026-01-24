"use client";
import React, { useMemo } from "react";
import { CarType } from "@/src/types/CarType";
import styles from "../../styles/admin/dashboard.module.css";
import {
  Car,
  Tag,
  Package,
  Grid3x3,
  TrendingUp,
  DollarSign,
  Calendar,
  Percent,
} from "lucide-react";

interface DashboardOverviewProps {
  cars: CarType[];
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtext?: string;
  badge?: string;
  badgeType?: "success" | "warning" | "info";
  iconClass?: string;
}

const MetricCard = ({
  icon,
  label,
  value,
  subtext,
  badge,
  badgeType = "success",
  iconClass = "",
}: MetricCardProps) => {
  const badgeClassName = badgeType === "warning" ? styles.badgeWarning : badgeType === "info" ? styles.badgeInfo : styles.badge;

  return (
    <div className={styles.metricCard}>
      <div className={styles.cardHeader}>
        <div className={`${styles.cardIcon} ${iconClass}`}>{icon}</div>
        {badge && <span className={badgeClassName}>{badge}</span>}
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardLabel}>{label}</div>
        <div className={styles.cardValue}>{value}</div>
        {subtext && <div className={styles.cardSubtext}>{subtext}</div>}
      </div>
    </div>
  );
};

const DashboardOverview = ({ cars }: DashboardOverviewProps) => {
  // Calculate metrics
  const metrics = useMemo(() => {
    const totalCars = cars.length;
    const discountedCars = cars.filter((car) => car.applyDiscount === true).length;
    const uniqueBrands = new Set(cars.map((car) => car.brand)).size;
    const uniqueCategories = new Set(cars.map((car) => car.type)).size;

    // Calculate recent additions (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentCars = cars.filter((car: any) => {
      if (!car.createdAt) return false;
      const carDate = new Date(car.createdAt);
      return carDate >= thirtyDaysAgo;
    }).length;

    // Calculate average daily price
    const totalDailyPrice = cars.reduce(
      (sum, car) => sum + (car.pricing?.daily || 0),
      0
    );
    const avgDailyPrice = totalCars > 0 ? Math.round(totalDailyPrice / totalCars) : 0;

    // Calculate discount percentage
    const discountPercentage = totalCars > 0 
      ? Math.round((discountedCars / totalCars) * 100) 
      : 0;

    // Get brand breakdown
    const brandCounts: Record<string, number> = {};
    cars.forEach((car) => {
      brandCounts[car.brand] = (brandCounts[car.brand] || 0) + 1;
    });

    // Get top brands
    const topBrands = Object.entries(brandCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    // Get category breakdown
    const categoryCounts: Record<string, number> = {};
    cars.forEach((car) => {
      categoryCounts[car.type] = (categoryCounts[car.type] || 0) + 1;
    });

    const topCategories = Object.entries(categoryCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    return {
      totalCars,
      discountedCars,
      uniqueBrands,
      uniqueCategories,
      recentCars,
      avgDailyPrice,
      discountPercentage,
      topBrands,
      topCategories,
    };
  }, [cars]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard Overview</h1>
        <p className={styles.subtitle}>
          Welcome back! Here's what's happening with your car rental business.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className={styles.metricsGrid}>
        <MetricCard
          icon={<Car size={24} />}
          label="Total Cars Available"
          value={metrics.totalCars}
          subtext="Active vehicles in fleet"
          iconClass=""
        />

        <MetricCard
          icon={<Tag size={24} />}
          label="Discounted Cars"
          value={metrics.discountedCars}
          subtext={`${metrics.discountPercentage}% of total fleet`}
          badge={`${metrics.discountPercentage}%`}
          badgeType="warning"
          iconClass={styles.cardIconAlt1}
        />

        <MetricCard
          icon={<Package size={24} />}
          label="Total Brands"
          value={metrics.uniqueBrands}
          subtext="Unique car manufacturers"
          iconClass={styles.cardIconAlt2}
        />

        <MetricCard
          icon={<Grid3x3 size={24} />}
          label="Categories"
          value={metrics.uniqueCategories}
          subtext="Vehicle types available"
          iconClass={styles.cardIconAlt3}
        />

        <MetricCard
          icon={<Calendar size={24} />}
          label="Recent Additions"
          value={metrics.recentCars}
          subtext="Added in last 30 days"
          badge="New"
          badgeType="info"
          iconClass={styles.cardIconAlt4}
        />

        <MetricCard
          icon={<DollarSign size={24} />}
          label="Avg. Daily Price"
          value={`AED ${metrics.avgDailyPrice}`}
          subtext="Average rental rate"
          iconClass={styles.cardIconAlt5}
        />
      </div>

      {/* Top Brands Section */}
      <div className={styles.quickStats}>
        <h2 className={styles.quickStatsTitle}>Top Brands</h2>
        <div className={styles.statsGrid}>
          {metrics.topBrands.map(([brand, count]) => {
            const percentage = (count / metrics.totalCars) * 100;
            return (
              <div key={brand} className={styles.statItem}>
                <div className={styles.statLabel}>{brand}</div>
                <div className={styles.statValue}>{count}</div>
                <div className={styles.statBar}>
                  <div
                    className={styles.statBarFill}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
          {metrics.topBrands.length === 0 && (
            <div className={styles.emptyState}>
              <p className={styles.emptyStateText}>No brands available</p>
            </div>
          )}
        </div>
      </div>

      {/* Top Categories Section */}
      <div className={styles.quickStats}>
        <h2 className={styles.quickStatsTitle}>Popular Categories</h2>
        <div className={styles.statsGrid}>
          {metrics.topCategories.map(([category, count]) => {
            const percentage = (count / metrics.totalCars) * 100;
            return (
              <div key={category} className={styles.statItem}>
                <div className={styles.statLabel}>{category}</div>
                <div className={styles.statValue}>{count}</div>
                <div className={styles.statBar}>
                  <div
                    className={styles.statBarFill}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
          {metrics.topCategories.length === 0 && (
            <div className={styles.emptyState}>
              <p className={styles.emptyStateText}>No categories available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
