import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/src/lib/db";
import Car from "@/src/models/Car";
import { CarSchema, CarQuerySchema } from "@/src/lib/validations";
import { z } from "zod";
import type { CarListResponse } from "@/src/types/api";
import { rateLimit } from "@/src/lib/rateLimit";
import { sanitizeErrorMessage } from "@/src/lib/sanitize";

export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting: 30 requests per minute
    const rateLimitResult = await rateLimit(request, {
      interval: 60 * 1000, // 1 minute
      uniqueTokenPerInterval: 30,
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
            'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    await dbConnect();
    const { searchParams } = new URL(request.url);

    // Validate query parameters
    const queryResult = CarQuerySchema.safeParse({
      brand: searchParams.get("brand"),
      type: searchParams.get("type"),
      minPrice: searchParams.get("minPrice"),
      maxPrice: searchParams.get("maxPrice"),
    });

    if (!queryResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid query parameters",
          details: queryResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { brand, type, minPrice, maxPrice } = queryResult.data;

    // Build query with proper typing
    interface MongoQuery {
      brand?: { $regex: RegExp };
      type?: { $regex: RegExp };
      "pricing.daily"?: { $gte?: number; $lte?: number };
    }

    const query: MongoQuery = {};

    if (brand) {
      query.brand = { $regex: new RegExp(brand, "i") };
    }

    if (type) {
      query.type = { $regex: new RegExp(type, "i") };
    }

    if (minPrice || maxPrice) {
      query["pricing.daily"] = {};
      if (minPrice) query["pricing.daily"].$gte = minPrice;
      if (maxPrice) query["pricing.daily"].$lte = maxPrice;
    }

    // CRITICAL PERFORMANCE FIX: Only return first image for list views
    // Full image arrays are fetched only when viewing individual car details
    // This reduces response size from MBs to KBs
    const cars = await Car.find(query)
      .select("name brand type pricing transmission fuel seats color carId applyDiscount year _id images")
      .limit(50)
      .lean();

    // Keep only first image for list views to reduce payload size
    const processedCars = cars.map((car: Record<string, unknown>) => {
      const images = Array.isArray(car.images) ? car.images : [];
      return {
        ...car,
        images: images.length > 0 ? [images[0]] : [] // Only first image
      };
    });

    const response: CarListResponse = {
      success: true,
      count: processedCars.length,
      cars: processedCars,
    };

    // Add cache and rate limit headers
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'X-RateLimit-Limit': rateLimitResult.limit.toString(),
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
      },
    });
  } catch (error: unknown) {
    console.error("API Error:", error);
    const errorMessage = sanitizeErrorMessage(error);
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Check authentication
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in to add cars." },
        { status: 401 }
      );
    }

    await dbConnect();
    const body = await request.json();

    // Validate input data
    const validationResult = CarSchema.safeParse(body);

    if (!validationResult.success) {
      console.error("Validation Error:", validationResult.error.issues);
      return NextResponse.json(
        {
          success: false,
          error: "Invalid car data",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;
    console.log("Creating car with validated data:", validatedData);

    const newCar = await Car.create(validatedData);

    return NextResponse.json(
      {
        success: true,
        message: "Car added successfully",
        car: newCar,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Save Error:", error);

    // Handle duplicate key error
    if (error instanceof Error && 'code' in error && (error as any).code === 11000) {
      return NextResponse.json(
        { success: false, error: "A car with this ID already exists" },
        { status: 409 }
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : "Failed to add car";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
