export interface CarType {
  _id: string;
  carId: string;
  brand: string;
  name: string;
  type: string;
  color: string;
  images: string[];
  seats: number;
  transmission: string;
  fuel: string;
  doors: number;
  engine?: string;
  horsepower?: number;
  year: number;
  pricing: {
    currency: string;
    daily: number;
    weekly?: number;
    monthly?: number;
    weeklyDiscount?: string;
    monthlyDiscount?: string;
    originalDaily?: number;
    originalWeekly?: number;
    originalMonthly?: number;
  };
  applyDiscount?: boolean;

  securityDeposit?: number;

  mileage?: {
    dailyIncluded?: number;
    extraMileagePrice?: number;
  };

  chauffeurService?: string;
  features: string[];
  keyFeatures: string[];
  about?: string;

  rentalInfo?: {
    pickupLocation?: string;
    insurance?: string;
    freePickupAndDrop?: string;
    paymentMethods?: string[];
  };
}
