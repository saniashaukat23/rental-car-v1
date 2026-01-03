// import { NextResponse } from "next/server";
// import dbConnect from "@/src/lib/db";
// import Car from "@/src/models/Car";
// export async function GET() {
//   try {
//     await dbConnect();

//     const carsData=[{""}],

//     await Car.insertMany(carsData);

//     return NextResponse.json({
//       message: "✅ Cars imported successfully!",
//       count: carsData.length,
//     });
//   } catch (error: any) {
//     console.error("Seed Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
