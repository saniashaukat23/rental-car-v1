"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Trash2,
  Car,
  DollarSign,
  Settings,
  Loader2,
  Image as ImageIcon,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
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
  horsepower: number;
  images: string[];
  pricing: {
    daily: number;
    weekly: number;
    monthly: number;
    currency: string;
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

export default function EditCar() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

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
    horsepower: 500,
    images: [],
    pricing: { daily: 0, weekly: 0, monthly: 0, currency: "AED" },
  });

  useEffect(() => {
    if (!id) return;
    const fetchCar = async () => {
      try {
        const res = await fetch(`/api/cars/${id}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setCar({ ...data, images: data.images || [] });
      } catch (error) {
        console.error("Error:", error);
        alert("Car not found!");
        router.push("/admin");
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id, router]);

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
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/cars/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(car),
      });

      if (!res.ok) throw new Error("Update failed");
      alert("✅ Car updated successfully!");
      router.push("/admin/");
    } catch (error: unknown) {
      console.log("Update failed:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this car?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/cars/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      alert("Car deleted successfully.");
      router.push("/admin/");
    } catch (error) {
      console.log("Could not delete car: ", error);
      setDeleting(false);
    }
  };

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

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 bg-white border border-slate-200 rounded-full hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Edit Vehicle
              </h1>
              <p className="text-slate-500 text-sm">
                Update details for{" "}
                <span className="font-semibold text-blue-600">
                  {car.brand} {car.name}
                </span>
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 rounded-xl font-semibold text-sm hover:bg-red-100 transition-colors disabled:opacity-50"
            >
              {deleting ? (
                "Deleting..."
              ) : (
                <>
                  <Trash2 size={18} /> Delete Car
                </>
              )}
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              {saving ? (
                "Saving..."
              ) : (
                <>
                  <Save size={18} /> Save Changes
                </>
              )}
            </button>
          </div>
        </div>

        <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
                <ImageIcon className="w-5 h-5 text-purple-500" />
                <h3 className="text-lg font-bold text-slate-700">
                  Vehicle Gallery
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {car.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-50"
                  >
                    <Image
                      src={img}
                      alt={`Car ${index}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}

                <label className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-blue-400 cursor-pointer transition-all group">
                  <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-blue-500">
                    <Upload size={24} />
                    <span className="text-xs font-bold uppercase tracking-wide">
                      Add Photo
                    </span>
                  </div>
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
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
                <Car className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-bold text-slate-700">
                  Vehicle Information
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputGroup
                  label="Brand"
                  name="brand"
                  value={car.brand}
                  onChange={handleChange}
                />
                <InputGroup
                  label="Model Name"
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

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Category
                  </label>
                  <select
                    name="type"
                    value={car.type}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Sedan</option>
                    <option>SUV</option>
                    <option>Sports</option>
                    <option>Luxury</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Transmission
                  </label>
                  <select
                    name="transmission"
                    value={car.transmission}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Automatic</option>
                    <option>Manual</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
                <Settings className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-bold text-slate-700">
                  Specs & Config
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
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
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Fuel
                  </label>
                  <select
                    name="fuel"
                    value={car.fuel}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Gasoline</option>
                    <option>Electric</option>
                    <option>Hybrid</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
                <DollarSign className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-bold text-slate-700">
                  Pricing Plan
                </h3>
              </div>
              <div className="space-y-4">
                <InputGroup
                  label="Daily Rate (AED)"
                  name="daily"
                  type="number"
                  value={car.pricing.daily}
                  onChange={handlePricingChange}
                />
                <InputGroup
                  label="Weekly Rate (AED)"
                  name="weekly"
                  type="number"
                  value={car.pricing.weekly}
                  onChange={handlePricingChange}
                />
                <InputGroup
                  label="Monthly Rate (AED)"
                  name="monthly"
                  type="number"
                  value={car.pricing.monthly}
                  onChange={handlePricingChange}
                />
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-400 text-center">
                    All prices are in AED currency
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
