import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/src/lib/db";
import Car from "@/src/models/Car";
import { isValidObjectId, sanitizeErrorMessage } from "@/src/lib/sanitize";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: Props) {
  try {
    const { id } = await params;

    // Validate ObjectId format
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid car ID format" },
        { status: 400 }
      );
    }

    await dbConnect();
    console.log("🔍 Fetching Car ID:", id);

    const car = await Car.findById(id).lean();

    if (!car) {
      return NextResponse.json(
        { success: false, error: "Car not found" },
        { status: 404 }
      );
    }

    // Serialize to strip MongoDB _id from nested subdocuments (images, etc.)
    const serializedCar = JSON.parse(JSON.stringify(car));

    return NextResponse.json({ success: true, car: serializedCar });
  } catch (error) {
    console.error("API Error:", error);
    const errorMessage = sanitizeErrorMessage(error);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: Props) {
  try {
    // Check authentication - only authenticated users can update cars
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in to update cars." },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Validate ObjectId format
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid car ID format" },
        { status: 400 }
      );
    }

    await dbConnect();
    const body = await request.json();

    // Remove _id and __v from update data to prevent modification
    const { _id, __v, ...updateData } = body;

    const updatedCar = await Car.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCar) {
      return NextResponse.json(
        { success: false, error: "Car not found" },
        { status: 404 }
      );
    }

    // Revalidate all pages that display car pricing
    revalidatePath('/');
    revalidatePath('/discount-offers');
    revalidatePath('/our-fleet');

    return NextResponse.json({
      success: true,
      message: "Car updated successfully",
      car: updatedCar,
    });
  } catch (error: unknown) {
    console.error("PUT Error:", error);
    const errorMessage = sanitizeErrorMessage(error);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Props) {
  try {
    // Check authentication - only authenticated users can delete cars
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in to delete cars." },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Validate ObjectId format
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid car ID format" },
        { status: 400 }
      );
    }

    await dbConnect();
    const deletedCar = await Car.findByIdAndDelete(id);

    if (!deletedCar) {
      return NextResponse.json(
        { success: false, error: "Car not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Car deleted successfully",
    });
  } catch (error) {
    console.error("DELETE Error:", error);
    const errorMessage = sanitizeErrorMessage(error);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

