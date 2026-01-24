"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Car,
  DollarSign,
  Settings,
  Loader2,
  Image as ImageIcon,
  Upload,
  X,
  Percent,
  CheckCircle,
  XCircle,
  RotateCcw, // Added for reset
} from "lucide-react";
import Image from "next/image";
import { useCarById, useUpdateCar, useDeleteCar } from "@/src/hooks/useCars";

interface CarData {
  brand: string;
  name: string;
  type: string;
  year: number;
  color: string;
  transmission: string;
  fuel: string;
  seats: number;
  doors: number;
  engine: string;
  horsepower: number;
  images: string[];
  applyDiscount: boolean;
  about: string;
  chauffeurService: string;
  features: string[];
  keyFeatures: string[];
  securityDeposit: number;
  mileage: {
    dailyIncluded: number;
    extraMileagePrice: number;
  };
  pricing: {
    daily: number;
    weekly: number;
    monthly: number;
    currency: string;
    originalDaily?: number;
    originalWeekly?: number;
    originalMonthly?: number;
  };
  rentalInfo: {
    pickupLocation: string;
    insurance: string;
    freePickupAndDrop: string;
    paymentMethods: string[];
  };
}

interface InputGroupProp {
  label: string;
  name: string;
  value: number | string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

// Moved OUTSIDE component to prevent recreation on every render
const InputGroup = ({
  label,
  name,
  value,
  type = "text",
  onChange,
  placeholder,
}: InputGroupProp) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
    />
  </div>
);

export default function EditCar() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params?.id;

  // React Query hooks
  const { data: fetchedCar, isLoading: loading, error } = useCarById(id);
  const updateCarMutation = useUpdateCar();
  const deleteCarMutation = useDeleteCar();

  // Discount States
  const [discount, setDiscount] = useState<string>("");
  const [discountPreview, setDiscountPreview] = useState<{
    daily: number;
    weekly: number;
    monthly: number;
  } | null>(null);

  // Local saving state to control Save button (avoids relying on external mutation flags)
  const [saving, setSaving] = useState(false);

  const [car, setCar] = useState<CarData>({
    brand: "",
    name: "",
    type: "",
    year: 2024,
    color: "",
    transmission: "Automatic",
    fuel: "Gasoline",
    seats: 4,
    doors: 4,
    engine: "",
    horsepower: 0,
    images: [],
    applyDiscount: false,
    about: "",
    chauffeurService: "Available",
    features: [],
    keyFeatures: [],
    securityDeposit: 0,
    mileage: { dailyIncluded: 250, extraMileagePrice: 5 },
    pricing: { daily: 0, weekly: 0, monthly: 0, currency: "AED" },
    rentalInfo: {
      pickupLocation: "Dubai Main Branch",
      insurance: "Basic Comprehensive",
      freePickupAndDrop: "On Monthly Rentals",
      paymentMethods: ["Card", "Cash"],
    },
  });

  // Update local state when fetched data arrives
  useEffect(() => {
    if (fetchedCar) {
      setCar(fetchedCar);
    }
  }, [fetchedCar]);

  // Handle error state
  useEffect(() => {
    if (error) {
      console.error("Error:", error);
      alert("Car not found!");
      router.push("/admin");
    }
  }, [error, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCar((prev) => ({ ...prev, [name]: value }));
  };

  const handlePricingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCar((prev) => ({
      ...prev,
      pricing: { ...prev.pricing, [name]: Number(value) },
    }));
  };

  // --- DISCOUNT LOGIC ---

  // 1. Calculate Preview
  const handleCalculateDiscount = () => {
    const discountValue = Number(discount);
    if (!discountValue || discountValue <= 0 || discountValue >= 100) {
      alert("Please enter a valid discount percentage between 1 and 99.");
      return;
    }
    const factor = 1 - discountValue / 100;
    setDiscountPreview({
      daily: Math.round(car.pricing.daily * factor),
      weekly: Math.round(car.pricing.weekly * factor),
      monthly: Math.round(car.pricing.monthly * factor),
    });
  };

  // 2. Confirm and Apply (SETS applyDiscount to TRUE and SAVES original prices)
  const confirmDiscount = () => {
    if (discountPreview) {
      setCar((prev) => ({
        ...prev,
        applyDiscount: true,
        pricing: {
          ...prev.pricing,
          // Store original prices only if they aren't already stored 
          // (prevents overwriting original with already discounted prices)
          originalDaily: prev.applyDiscount ? prev.pricing.originalDaily : prev.pricing.daily,
          originalWeekly: prev.applyDiscount ? prev.pricing.originalWeekly : prev.pricing.weekly,
          originalMonthly: prev.applyDiscount ? prev.pricing.originalMonthly : prev.pricing.monthly,
          ...discountPreview,
        },
      }));
      setDiscountPreview(null);
      setDiscount("");
      alert(`Discount applied! Original prices saved. Don't forget to click "Save Changes".`);
    }
  };

  // 3. Cancel Preview
  const cancelDiscount = () => {
    setDiscountPreview(null);
  };

  // 4. Remove Discount (RESTORES original prices and SAVES to database)
  const handleRemoveDiscount = async () => {
    if (!confirm("Remove discount and restore original prices?") || !id) return;

    const updatedCar = {
      ...car,
      applyDiscount: false,
      pricing: {
        ...car.pricing,
        daily: car.pricing.originalDaily || car.pricing.daily,
        weekly: car.pricing.originalWeekly || car.pricing.weekly,
        monthly: car.pricing.originalMonthly || car.pricing.monthly,
      },
    };

    try {
      await updateCarMutation.mutateAsync({ id, data: updatedCar });
      setCar(updatedCar);
      alert("✅ Discount removed and original prices restored!");
    } catch (error) {
      console.error("Remove discount error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert(`Failed to remove discount: ${errorMessage}`);
    }
  };

  // --- IMAGE & SUBMIT LOGIC ---

  const handleRemoveImage = (indexToRemove: number) => {
    setCar((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setCar((prev) => ({
              ...prev,
              images: [...prev.images, reader.result as string],
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Saving Car Data:", car);
    console.log("Is Discount Applied?", car.applyDiscount);
    e.preventDefault();

    if (!id) return;

    setSaving(true);
    try {
      await updateCarMutation.mutateAsync({ id, data: car });
      alert("✅ Car updated successfully!");
      router.push("/admin/");
    } catch (error: unknown) {
      console.log("Update failed:", error);
      alert("Failed to update car. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this car?") || !id) return;

    try {
      await deleteCarMutation.mutateAsync(id);
      alert("Car deleted successfully.");
      router.push("/admin/");
    } catch (error) {
      console.log("Could not delete car: ", error);
      alert("Failed to delete car. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 bg-white border border-slate-200 rounded-full hover:bg-slate-100"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <h1 className="text-2xl font-bold text-slate-800">Edit Vehicle</h1>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleteCarMutation.isPending}
              className="px-5 py-2.5 bg-red-50 text-red-600 rounded-xl font-bold text-sm"
            >
              {deleteCarMutation.isPending ? "Deleting..." : "Delete"}
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 shadow-lg disabled:opacity-60"
            >
              {saving ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                <Save size={18} />
              )}
              Save Changes
            </button>
          </div>
        </div>

        <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Gallery & Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery (Simplified for brevity) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="w-5 h-5 text-purple-500" />
                <h3 className="font-bold">Gallery</h3>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {car.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-lg overflow-hidden bg-slate-100"
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
                <label className="flex items-center justify-center aspect-square border-2 border-dashed rounded-lg cursor-pointer hover:bg-slate-50">
                  <Upload className="text-slate-400" />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Basic Info */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Car className="w-5 h-5 text-blue-500" />
                <h3 className="font-bold">Info</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputGroup
                  label="Brand"
                  name="brand"
                  value={car.brand}
                  onChange={handleChange}
                />
                <InputGroup
                  label="Model"
                  name="name"
                  value={car.name}
                  onChange={handleChange}
                />
                <InputGroup
                  label="Year"
                  name="year"
                  type="number"
                  value={car.year}
                  onChange={handleChange}
                />
                <InputGroup
                  label="Color"
                  name="color"
                  value={car.color}
                  onChange={handleChange}
                />
                {/* Type Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Type
                  </label>
                  <select
                    name="type"
                    value={car.type}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option>Sedan</option>
                    <option>SUV</option>
                    <option>Sports</option>
                    <option>Luxury</option>
                    <option>Convertible</option>
                  </select>
                </div>
                {/* Transmission Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Transmission
                  </label>
                  <select
                    name="transmission"
                    value={car.transmission}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Automatic</option>
                    <option>Manual</option>
                    <option>Semi-Automatic</option>
                  </select>
                </div>
                {/* Fuel Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Fuel
                  </label>
                  <select
                    name="fuel"
                    value={car.fuel}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Gasoline</option>
                    <option>Diesel</option>
                    <option>Electric</option>
                    <option>Hybrid</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Specs */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-purple-500" />
                <h3 className="font-bold">Specs</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <InputGroup
                  label="Engine"
                  name="engine"
                  value={car.engine}
                  onChange={handleChange}
                  placeholder="V8 4.4L"
                />
                <InputGroup
                  label="Horsepower"
                  name="horsepower"
                  type="number"
                  value={car.horsepower}
                  onChange={handleChange}
                />
                <InputGroup
                  label="Seats"
                  name="seats"
                  type="number"
                  value={car.seats}
                  onChange={handleChange}
                />
                <InputGroup
                  label="Doors"
                  name="doors"
                  type="number"
                  value={car.doors}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* About / Description */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Car className="w-5 h-5 text-green-500" />
                <h3 className="font-bold">Description</h3>
              </div>
              <textarea
                name="about"
                value={car.about}
                onChange={(e) => setCar((prev) => ({ ...prev, about: e.target.value }))}
                placeholder="Describe the car..."
                className="w-full h-24 border border-slate-200 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Mileage & Deposit */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-orange-500" />
                <h3 className="font-bold">Mileage & Deposit</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <InputGroup
                  label="Daily Mileage (KM)"
                  name="dailyIncluded"
                  type="number"
                  value={car.mileage.dailyIncluded}
                  onChange={(e) =>
                    setCar((prev) => ({
                      ...prev,
                      mileage: { ...prev.mileage, dailyIncluded: Number(e.target.value) },
                    }))
                  }
                />
                <InputGroup
                  label="Extra KM Price (AED)"
                  name="extraMileagePrice"
                  type="number"
                  value={car.mileage.extraMileagePrice}
                  onChange={(e) =>
                    setCar((prev) => ({
                      ...prev,
                      mileage: { ...prev.mileage, extraMileagePrice: Number(e.target.value) },
                    }))
                  }
                />
                <InputGroup
                  label="Security Deposit (AED)"
                  name="securityDeposit"
                  type="number"
                  value={car.securityDeposit}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Pricing & Discount */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-bold text-slate-700">Pricing</h3>
                </div>
                {/* Status Indicator */}
                {car.applyDiscount ? (
                  <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs font-bold uppercase">
                    Discount Active
                  </span>
                ) : (
                  <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded text-xs font-bold uppercase">
                    Standard Rate
                  </span>
                )}
              </div>

              {/* --- DISCOUNT WIDGET --- */}
              <div
                className={`border rounded-xl p-4 mb-6 transition-colors ${car.applyDiscount
                    ? "bg-orange-50 border-orange-200"
                    : "bg-slate-50 border-slate-100"
                  }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Percent className="w-4 h-4 text-orange-500" />
                    <h4 className="text-sm font-bold text-slate-700">
                      Apply Discount
                    </h4>
                  </div>
                  {car.applyDiscount && (
                    <button
                      type="button"
                      onClick={handleRemoveDiscount}
                      className="text-xs text-red-500 hover:underline flex items-center gap-1"
                    >
                      <RotateCcw size={10} /> Remove
                    </button>
                  )}
                </div>

                {!discountPreview ? (
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="%"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleCalculateDiscount}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-orange-600 transition-colors"
                    >
                      Calc
                    </button>
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-top-2">
                    <div className="text-xs bg-white/60 p-2 rounded-lg space-y-1 mb-2">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Daily:</span>
                        <span className="font-mono">
                          {car.pricing.daily}{" "}
                          <ArrowLeft className="inline w-3 h-3 rotate-180" />{" "}
                          <span className="font-bold text-orange-600">
                            {discountPreview.daily}
                          </span>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Weekly:</span>
                        <span className="font-mono">
                          {car.pricing.weekly}{" "}
                          <ArrowLeft className="inline w-3 h-3 rotate-180" />{" "}
                          <span className="font-bold text-orange-600">
                            {discountPreview.weekly}
                          </span>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Monthly:</span>
                        <span className="font-mono">
                          {car.pricing.monthly}{" "}
                          <ArrowLeft className="inline w-3 h-3 rotate-180" />{" "}
                          <span className="font-bold text-orange-600">
                            {discountPreview.monthly}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={confirmDiscount}
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg text-xs font-bold uppercase flex items-center justify-center gap-1 hover:bg-green-700"
                      >
                        <CheckCircle size={14} /> Apply
                      </button>
                      <button
                        type="button"
                        onClick={cancelDiscount}
                        className="flex-1 bg-slate-200 text-slate-600 py-2 rounded-lg text-xs font-bold uppercase flex items-center justify-center gap-1 hover:bg-slate-300"
                      >
                        <XCircle size={14} /> Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Manual Price Inputs */}
              <div className="space-y-4">
                <InputGroup
                  label="Daily (AED)"
                  name="daily"
                  type="number"
                  value={car.pricing.daily}
                  onChange={handlePricingChange}
                />
                <InputGroup
                  label="Weekly (AED)"
                  name="weekly"
                  type="number"
                  value={car.pricing.weekly}
                  onChange={handlePricingChange}
                />
                <InputGroup
                  label="Monthly (AED)"
                  name="monthly"
                  type="number"
                  value={car.pricing.monthly}
                  onChange={handlePricingChange}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
