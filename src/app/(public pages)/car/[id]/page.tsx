import React from "react";
import { notFound } from "next/navigation";
import CarDetailsView from "@/src/components/CarDetailsView";
import { CarType } from "@/src/types/CarType";
interface PageProps {
  params: Promise<{ id: string }>;
}

// src/app/cars/[id]/page.tsx

async function getCarById(id: string): Promise<CarType | null> {
  // 1. Determine the environment
  // If we are in production, use the environment variable.
  // If undefined (local dev), fallback to localhost.

  try {
    // 2. Use the dynamic baseUrl
    const res = await fetch(`/api/cars/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.error("Failed to fetch car:", error);
    return null;
  }
}

// ... rest of your component

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const car = await getCarById(id);

  if (!car) {
    return notFound();
  }

  return <CarDetailsView car={car} />;
}
