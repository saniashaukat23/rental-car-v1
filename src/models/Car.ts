import mongoose, { Document, Schema } from "mongoose";

// --- CAR INTERFACES ---

interface IPricing {
  currency: string;
  daily: number;
  weekly: number;
  monthly: number;
  weeklyDiscount?: string;
  monthlyDiscount?: string;
}

interface IMileage {
  dailyIncluded: number;
  extraMileagePrice: number;
}

interface IRentalInfo {
  pickupLocation: string;
  insurance: string;
  freePickupAndDrop: string;
  paymentMethods: string[];
}

export interface ICar extends Document {
  year: number;
  carId: string; // e.g., "audi-rs5-2022"
  brand: string;
  name: string;
  type: string;
  color: string;
  images: string[];
  seats: number;
  transmission: string;
  fuel: string;
  doors: number;
  engine: string;
  horsepower: number;
  pricing: IPricing;
  securityDeposit: number;
  mileage: IMileage;
  chauffeurService: string;
  features: string[];
  keyFeatures: string[];
  about: string;
  rentalInfo: IRentalInfo;
}

// --- CAR SCHEMA ---

const CarSchema: Schema<ICar> = new Schema(
  {
    carId: { type: String, required: true },
    brand: { type: String, required: true, index: true },
    name: { type: String, required: true },
    type: { type: String, required: true }, // e.g., Sports, SUV
    color: { type: String, required: true },
    images: [{ type: String }],
    seats: { type: Number, required: true },
    transmission: { type: String, default: "Automatic" },
    fuel: { type: String, default: "Gasoline" },
    doors: { type: Number, required: true },
    engine: { type: String },
    horsepower: { type: Number },
    pricing: {
      currency: { type: String, default: "AED" },
      daily: { type: Number, required: true },
      weekly: { type: Number },
      monthly: { type: Number },
      weeklyDiscount: { type: String },
      monthlyDiscount: { type: String },
    },
    securityDeposit: { type: Number },
    mileage: {
      dailyIncluded: { type: Number },
      extraMileagePrice: { type: Number },
    },
    chauffeurService: { type: String },
    features: [{ type: String }],
    keyFeatures: [{ type: String }],
    about: { type: String },
    rentalInfo: {
      pickupLocation: { type: String },
      insurance: { type: String },
      freePickupAndDrop: { type: String },
      paymentMethods: [{ type: String }],
    },
    year: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Car || mongoose.model("Car", CarSchema);
