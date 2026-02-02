import mongoose, { Document, Schema } from "mongoose";

// --- CAR INTERFACES ---

interface IPricing {
  currency: string;
  daily: number;
  weekly: number;
  monthly: number;
  weeklyDiscount?: number;
  monthlyDiscount?: number;
  dailyDiscount?: number;
  originalDaily?: number;
  originalWeekly?: number;
  originalMonthly?: number;
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
  applyDiscount?: boolean;
}

// --- CAR SCHEMA ---

const CarSchema: Schema<ICar> = new Schema(
  {
    carId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    brand: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: { type: String, required: true }, // e.g., Sports, SUV
    color: { type: String, required: true },
    images: [
      {
        url: { type: String, required: true },
        y: { type: Number, default: 50 }, // vertical offset in %
        s: { type: Number, default: 100 }, // scale in %
      },
    ],
    seats: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    transmission: {
      type: String,
      default: 'Automatic',
    },
    fuel: {
      type: String,
      default: 'Gasoline',
    },
    doors: {
      type: Number,
      required: true,
      min: 2,
      max: 6,
    },
    engine: { type: String },
    horsepower: { type: Number, min: 0 },
    pricing: {
      currency: { type: String, default: "AED" },
      daily: { type: Number, required: true, min: 0 },
      weekly: { type: Number, min: 0 },
      monthly: { type: Number, min: 0 },
      weeklyDiscount: { type: Number, min: 0, max: 100 },
      monthlyDiscount: { type: Number, min: 0, max: 100 },
      dailyDiscount: { type: Number, min: 0, max: 100 },
      originalDaily: { type: Number, min: 0 },
      originalWeekly: { type: Number, min: 0 },
      originalMonthly: { type: Number, min: 0 },
    },
    securityDeposit: { type: Number, min: 0 },
    mileage: {
      dailyIncluded: { type: Number, min: 0 },
      extraMileagePrice: { type: Number, min: 0 },
    },
    applyDiscount: { type: Boolean, default: false },
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
    year: {
      type: Number,
      required: true,
      min: 1900,
      max: new Date().getFullYear() + 2,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Add compound indexes for better query performance
CarSchema.index({ type: 1 }); // Index for category queries (SUV, Sports, Sedan)
CarSchema.index({ brand: 1, type: 1 });
CarSchema.index({ 'pricing.daily': 1 });
CarSchema.index({ year: -1 });
CarSchema.index({ type: 1, createdAt: -1 }); // Optimized for sorted category queries

// Add virtual field for display name
CarSchema.virtual('displayName').get(function () {
  return `${this.year} ${this.brand} ${this.name}`;
});

export default mongoose.models.Car || mongoose.model("Car", CarSchema);

