import { NextResponse } from "next/server";
import dbConnect from "@/src/lib/db";
import Car from "@/src/models/Car";
type Props = {
  params: Promise<{ id: string }>;
};
export async function GET(request: Request, { params }: Props) {
  try {
    const { id } = await params;

    await dbConnect();
    console.log("🔍 Fetching Car ID:", id);

    const car = await Car.findById(id);

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json(car);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Props) {
  try {
    const { id } = await params;

    await dbConnect();
    const body = await request.json();
    const { _id, ...updateData } = body;

    const updatedCar = await Car.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCar) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Car Updated", car: updatedCar });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error : "Status update failed";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Props) {
  try {
    const { id } = await params;

    await dbConnect();
    const deletedCar = await Car.findByIdAndDelete(id);

    if (!deletedCar) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Car Deleted Successfully" });
  } catch (error) {
    const errorMessage = error instanceof Error ? error : "Delete Failed";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
