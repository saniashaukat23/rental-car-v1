import React from "react";
import { notFound } from "next/navigation";
import CarDetailsView from "@/src/components/CarDetailsView";
import dbConnect from "@/src/lib/db";
import Car from "@/src/models/Car";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getCarById(id: string) {
  try {
    // 1. Connect to DB directly (No fetch URL needed!)
    await dbConnect();

    // 2. Find the car
    const car = await Car.findById(id).lean();

    if (!car) return null;

    // 3. Convert to JSON to avoid Next.js serialization warnings
    return JSON.parse(JSON.stringify(car));
  } catch (error) {
    console.error("Error fetching car:", error);
    return null;
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const car = await getCarById(id);

  if (!car) {
    return notFound(); // This triggers the 404 if DB fails
  }

  return <CarDetailsView car={car} />;
}
