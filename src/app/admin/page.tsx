import React from "react";
import dbConnect from "@/src/lib/db";
import Dashboard from "@/src/components/admin/Dashboard";
import Car from "@/src/models/Car";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
const ADMIN_EMAIL = "saniashaukat2002@gmail.com";

async function getCars() {
  try {
    await dbConnect();
    const totalCars = await Car.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(totalCars));
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
}

export default async function AdminDashboardPage() {
  const user = await currentUser();
  if (!user) return redirect("/");
  const userEmail = user.emailAddresses[0].emailAddress;
  if (userEmail !== ADMIN_EMAIL) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500 font-bold text-xl">
        Access Denied: You are not an admin.
      </div>
    );
  }
  const cars = await getCars();
  return <Dashboard cars={cars} />;
}
