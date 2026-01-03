import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/src/lib/db";
import Car from "@/src/models/Car";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get("brand");

    const query: any = {};

    if (brand) {
      query.brand = { $regex: new RegExp(brand, "i") };
    }
    const cars = await Car.find(query).sort({ createdAt: -1 });
    return NextResponse.json({
      success: true,
      count: cars.length,
      cars: cars,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error;
    console.error("API Error:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    console.log("Receiving Data:", body);

    const newCar = await Car.create(body);

    return NextResponse.json(
      { message: "Car Added Successfully", car: newCar },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Save Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to add car";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
