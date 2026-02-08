import React from "react";
import dbConnect from "@/src/lib/db";
export const dynamic = "force-dynamic";
import Dashboard from "@/src/components/admin/Dashboard";
import Car from "@/src/models/Car";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
const ADMIN_EMAILS = ["saniashaukat2002@gmail.com", "usamarehman489@gmail.com"];

async function getCars() {
  try {
    await dbConnect();
    // Select only essential fields - no sort to avoid memory overflow
    // MongoDB sorts before limit, which causes memory issues with large datasets
    const totalCars = await Car.find({})
      .select("name brand type carId pricing applyDiscount createdAt images year transmission fuel seats")
      .limit(100)
      .lean();

    return JSON.parse(JSON.stringify(totalCars));
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
}

export default async function AdminDashboardPage() {
  const user = await currentUser();
  if (!user) return redirect("/");
  const userEmail = user.emailAddresses?.[0]?.emailAddress || "";
  if (!ADMIN_EMAILS.includes(userEmail)) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontWeight: 'bold', fontSize: '1.25rem' }}>
        Access Denied: You are not an admin.
      </div>
    );
  }
  const cars = await getCars();
  return <Dashboard cars={cars} />;
}
