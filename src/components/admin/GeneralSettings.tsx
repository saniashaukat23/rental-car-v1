"use client";
import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import {
  UploadCloud,
  X,
  Plus,
  Save,
  Car,
  DollarSign,
  Settings,
  Star,
  LucideIcon,
} from "lucide-react";

// --- Interfaces ---
interface SectionTitleProps {
  icon: LucideIcon;
  title: string;
}

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  width?: "full" | "half";
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean; // New: Mark field as required
}

// --- Helper Components (MOVED OUTSIDE) ---
// Ab ye re-render hone par destroy nahi honge

const SectionTitle = ({ icon: Icon, title }: SectionTitleProps) => (
  <div className="flex items-center gap-2 mb-6 border-b pb-2 border-slate-200">
    <Icon className="w-5 h-5 text-orange-500" />
    <h3 className="text-lg font-bold text-slate-700 uppercase tracking-wide">
      {title}
    </h3>
  </div>
);

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  width = "full",
  value,
  onChange,
  required = false,
}: InputFieldProps) => (
  <div
    className={`${
      width === "half" ? "col-span-1" : "col-span-2 md:col-span-1"
    }`}
  >
    <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
      {!required && <span className="text-slate-400 ml-1 text-[10px] normal-case">(optional)</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full bg-white border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all shadow-sm ${
        required 
          ? "border-slate-300 focus:ring-orange-500" 
          : "border-slate-200 focus:ring-slate-400"
      }`}
    />
  </div>
);

// --- Main Component ---
const AddCar = () => {
  const [loading, setLoading] = useState(false);
  const [featureInput, setFeatureInput] = useState("");
  const [keyFeatureInput, setKeyFeatureInput] = useState("");

  const [form, setForm] = useState({
    brand: "",
    name: "",
    year: "",
    type: "",
    color: "",
    seats: "5",
    doors: "4",
    engine: "",
    horsepower: "",
    fuel: "Gasoline",
    transmission: "Automatic",
    dailyPrice: "",
    weeklyPrice: "",
    monthlyPrice: "",
    securityDeposit: "",
    dailyMileage: "",
    extraMileagePrice: "5",
    chauffeurService: "No",
    about: "",
    pickupLocation: "",
    insurance: "Standard",
    freePickupAndDrop: "Yes",
    images: [] as string[],
    features: [] as string[],
    keyFeatures: [] as string[],
    applyDiscount: false, // Added: To keep in sync with model
  });

  // --- Handlers ---
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setForm((prev) => ({ ...prev, features: [...prev.features, featureInput] }));
      setFeatureInput("");
    }
  };

  const addKeyFeature = () => {
    if (keyFeatureInput.trim()) {
      setForm((prev) => ({ ...prev, keyFeatures: [...prev.keyFeatures, keyFeatureInput] }));
      setKeyFeatureInput("");
    }
  };

  const removeTag = (type: "features" | "keyFeatures", index: number) => {
    setForm((prev) => ({ ...prev, [type]: prev[type].filter((_, i) => i !== index) }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setForm((prev) => ({ ...prev, images: [...prev.images, reader.result as string] }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (indexToRemove: number) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, index) => index !== indexToRemove) }));
  };

  const handleSave = async () => {
    setLoading(true);

    // Validation for required fields
    const requiredFields = [
      { field: form.brand, name: "Brand" },
      { field: form.name, name: "Model Name" },
      { field: form.year, name: "Year" },
      { field: form.color, name: "Color" },
      { field: form.type, name: "Vehicle Category" },
      { field: form.seats, name: "Seats" },
      { field: form.doors, name: "Doors" },
      { field: form.dailyPrice, name: "Daily Price" },
    ];

    const missingFields = requiredFields
      .filter((f) => !f.field || f.field === "")
      .map((f) => f.name);

    if (missingFields.length > 0) {
      alert(`Please fill in required fields: ${missingFields.join(", ")}`);
      setLoading(false);
      return;
    }

    const payload = {
      ...form,
      carId: `${form.brand}-${form.name}-${form.year}`
        .toLowerCase()
        .replace(/\s+/g, "-"),
      seats: Number(form.seats),
      doors: Number(form.doors),
      horsepower: Number(form.horsepower),
      pricing: {
        currency: "AED",
        daily: Number(form.dailyPrice),
        weekly: Number(form.weeklyPrice),
        monthly: Number(form.monthlyPrice),
      },
      securityDeposit: Number(form.securityDeposit),
      mileage: {
        dailyIncluded: Number(form.dailyMileage),
        extraMileagePrice: Number(form.extraMileagePrice),
      },
      rentalInfo: {
        pickupLocation: form.pickupLocation,
        insurance: form.insurance,
        freePickupAndDrop: form.freePickupAndDrop,
        paymentMethods: ["Card", "Cash"],
      },
      applyDiscount: form.applyDiscount,
    };

    try {
      const res = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Error Handling Logic
      if (res.ok) {
        alert("✅ Vehicle Added Successfully!");
        window.location.reload();
      } else {
        const errorData = await res.json();
        console.error("API Error:", errorData); // Check Console for details
        alert(
          `❌ Error Adding Vehicle: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (e) {
      console.error("Network Error:", e);
      alert("Something went wrong. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Vehicle Registration
          </h1>
          <p className="text-slate-500 mt-1">
            Add a new luxury car to your fleet inventory.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-medium flex items-center gap-2 transition-all shadow-lg hover:shadow-xl disabled:opacity-70"
        >
          {loading ? (
            "Processing..."
          ) : (
            <>
              <Save size={18} /> Publish Vehicle
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* --- Left Column (Details) --- */}
        <div className="xl:col-span-2 space-y-8">
          {/* 1. Basic Specifications */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <SectionTitle icon={Car} title="Basic Specifications" />
            <div className="grid grid-cols-2 gap-6">
              <InputField
                label="Brand"
                name="brand"
                placeholder="e.g. BMW"
                value={form.brand}
                onChange={handleChange}
                required
              />
              <InputField
                label="Model Name"
                name="name"
                placeholder="e.g. M5 Competition"
                value={form.name}
                onChange={handleChange}
                required
              />
              <InputField
                label="Year"
                name="year"
                type="number"
                placeholder="2024"
                value={form.year}
                onChange={handleChange}
                required
              />
              <InputField
                label="Exterior Color"
                name="color"
                placeholder="e.g. Alpine White"
                value={form.color}
                onChange={handleChange}
                required
              />

              {/* Dropdowns */}
              <div className="col-span-2 md:col-span-1">
                <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">
                  Vehicle Category<span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select Category</option>
                  <option>Sedan</option>
                  <option>SUV</option>
                  <option>Sports</option>
                  <option>Luxury</option>
                  <option>Convertible</option>
                </select>
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">
                  Fuel Type
                </label>
                <select
                  name="fuel"
                  value={form.fuel}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option>Gasoline</option>
                  <option>Electric</option>
                  <option>Hybrid</option>
                </select>
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">
                  Transmission
                </label>
                <select
                  name="transmission"
                  value={form.transmission}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </div>
            </div>
          </div>

          {/* 2. Performance Specs */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <SectionTitle icon={Settings} title="Performance & Configuration" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <InputField
                label="Engine"
                name="engine"
                placeholder="V8 4.4L"
                value={form.engine}
                onChange={handleChange}
              />
              <InputField
                label="Horsepower"
                name="horsepower"
                type="number"
                placeholder="625 HP"
                value={form.horsepower}
                onChange={handleChange}
              />
              <InputField
                label="Seats"
                name="seats"
                type="number"
                placeholder="5"
                value={form.seats}
                onChange={handleChange}
                required
              />
              <InputField
                label="Doors"
                name="doors"
                type="number"
                placeholder="4"
                value={form.doors}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* 3. Features System */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <SectionTitle icon={Plus} title="Features & Highlights" />

            {/* General Features */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-slate-700 mb-2 block">
                General Features
              </label>
              <div className="flex gap-2">
                <input
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  placeholder="Type feature (e.g. Apple CarPlay)"
                  className="flex-1 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  onClick={addFeature}
                  type="button"
                  className="bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg font-bold text-slate-600 transition"
                >
                  +
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {form.features.map((f, i) => (
                  <span
                    key={i}
                    className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 border border-slate-200"
                  >
                    {f}{" "}
                    <button
                      type="button"
                      onClick={() => removeTag("features", i)}
                      className="hover:text-red-500"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2  flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> Key
                Features (Highlighted)
              </label>
              <div className="flex gap-2">
                <input
                  value={keyFeatureInput}
                  onChange={(e) => setKeyFeatureInput(e.target.value)}
                  placeholder="Type key highlight (e.g. 0-100 in 3s)"
                  className="flex-1 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  onClick={addKeyFeature}
                  type="button"
                  className="bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-lg font-bold text-orange-600 transition"
                >
                  +
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {form.keyFeatures.map((f, i) => (
                  <span
                    key={i}
                    className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 border border-orange-100"
                  >
                    {f}{" "}
                    <button
                      type="button"
                      onClick={() => removeTag("keyFeatures", i)}
                      className="hover:text-red-500"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Description */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <label className="text-sm font-bold text-slate-700 mb-2 block uppercase">
              Vehicle Description
            </label>
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              className="w-full h-32 border border-slate-200 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              placeholder="Describe the driving experience..."
            ></textarea>
          </div>
        </div>

        {/* --- Right Column (Pricing & Media) --- */}
        <div className="space-y-8">
          {/* 5. Pricing */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <SectionTitle icon={DollarSign} title="Pricing (AED)" />
            <div className="space-y-4">
              <InputField
                label="Daily Price"
                name="dailyPrice"
                type="number"
                placeholder="0.00"
                width="full"
                value={form.dailyPrice}
                onChange={handleChange}
                required
              />
              <InputField
                label="Weekly Price"
                name="weeklyPrice"
                type="number"
                placeholder="0.00"
                width="full"
                value={form.weeklyPrice}
                onChange={handleChange}
              />
              <InputField
                label="Monthly Price"
                name="monthlyPrice"
                type="number"
                placeholder="0.00"
                width="full"
                value={form.monthlyPrice}
                onChange={handleChange}
              />
              <div className="flex items-center gap-2 pt-4 border-t border-slate-50 mt-4">
                <input
                  type="checkbox"
                  id="applyDiscount"
                  checked={form.applyDiscount}
                  onChange={(e) =>
                    setForm({ ...form, applyDiscount: e.target.checked })
                  }
                  className="w-4 h-4 text-orange-600 border-slate-300 rounded focus:ring-orange-500 cursor-pointer"
                />
                <label
                  htmlFor="applyDiscount"
                  className="text-sm font-bold text-slate-700 cursor-pointer flex items-center gap-2"
                >
                  Apply Discount Badge
                  <span className="text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded uppercase">
                    Sale
                  </span>
                </label>
              </div>
              <div className="pt-4 border-t border-slate-100 mt-4">
                <InputField
                  label="Security Deposit"
                  name="securityDeposit"
                  type="number"
                  placeholder="0.00"
                  width="full"
                  value={form.securityDeposit}
                  onChange={handleChange}
                />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <InputField
                    label="Daily Mileage"
                    name="dailyMileage"
                    type="number"
                    placeholder="250"
                    width="half"
                    value={form.dailyMileage}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Extra KM Price"
                    name="extraMileagePrice"
                    type="number"
                    placeholder="5"
                    width="half"
                    value={form.extraMileagePrice}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 6. Media Upload */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <SectionTitle icon={UploadCloud} title="Media Gallery" />

            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-orange-500 transition-colors mb-2" />
                <p className="text-sm text-slate-600 font-medium">
                  Click to upload photos
                </p>
                <p className="text-xs text-slate-400">JPG, PNG or WebP</p>
              </div>
              <input
                type="file"
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>

            {/* Previews */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {form.images.map((url, index) => (
                <div
                  key={index}
                  className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200"
                >
                  <Image
                    src={url}
                    alt="preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all shadow-md"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              {form.images.length === 0 && (
                <div className="col-span-3 text-center text-xs text-slate-400 py-4 italic">
                  No images uploaded yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
