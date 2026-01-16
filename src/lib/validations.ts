import { z } from 'zod';

// Pricing validation schema
const PricingSchema = z.object({
  currency: z.string().default('AED'),
  daily: z.number().positive('Daily price must be positive'),
  weekly: z.number().positive().optional(),
  monthly: z.number().positive().optional(),
  weeklyDiscount: z.number().min(0).max(100).optional(),
  monthlyDiscount: z.number().min(0).max(100).optional(),
  dailyDiscount: z.number().min(0).max(100).optional(),
});

// Mileage validation schema
const MileageSchema = z.object({
  dailyIncluded: z.number().nonnegative(),
  extraMileagePrice: z.number().nonnegative(),
});

// Rental info validation schema
const RentalInfoSchema = z.object({
  pickupLocation: z.string(),
  insurance: z.string(),
  freePickupAndDrop: z.string(),
  paymentMethods: z.array(z.string()),
});

// Main Car validation schema
export const CarSchema = z.object({
  carId: z.string().min(1, 'Car ID is required').toLowerCase().trim(),
  brand: z.string().min(1, 'Brand is required').trim(),
  name: z.string().min(1, 'Name is required').trim(),
  type: z.string().min(1, 'Type is required'),
  color: z.string().min(1, 'Color is required'),
  images: z.array(z.string().url('Invalid image URL')).min(1, 'At least one image is required'),
  seats: z.number().int().min(1).max(12),
  transmission: z.string().default('Automatic'),
  fuel: z.string().default('Gasoline'),
  doors: z.number().int().min(2).max(6),
  engine: z.string().optional(),
  horsepower: z.number().positive().optional(),
  pricing: PricingSchema,
  securityDeposit: z.number().nonnegative().optional(),
  mileage: MileageSchema.optional(),
  chauffeurService: z.string().optional(),
  features: z.array(z.string()).default([]),
  keyFeatures: z.array(z.string()).default([]),
  about: z.string().optional(),
  rentalInfo: RentalInfoSchema.optional(),
  applyDiscount: z.boolean().optional().default(false),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 2),
});

// Type inference
export type CarInput = z.infer<typeof CarSchema>;

// Query parameters schema for GET requests
export const CarQuerySchema = z.object({
  brand: z.string().nullish(),
  type: z.string().nullish(),
  minPrice: z
    .string()
    .nullish()
    .transform((val) => (val ? Number(val) : undefined))
    .pipe(z.number().positive().optional()),
  maxPrice: z
    .string()
    .nullish()
    .transform((val) => (val ? Number(val) : undefined))
    .pipe(z.number().positive().optional()),
});

export type CarQuery = z.infer<typeof CarQuerySchema>;
