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
import styles from "./editCar.module.css";
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
  images: {
    url: string;
    y: number;
    s: number;
  }[];
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
  <div className={styles.inputGroup}>
    <label className={styles.inputLabel}>
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className={styles.inputField}
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

  // Image popup and URL input states
  const [popupImage, setPopupImage] = useState<string | null>(null);
  const [imageUrlInput, setImageUrlInput] = useState("");

  // Close popup on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPopupImage(null);
    };
    if (popupImage) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [popupImage]);

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
              images: [...prev.images, { url: reader.result as string, y: 50, s: 100 }],
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Add image from URL
  const handleAddImageUrl = () => {
    if (imageUrlInput.trim()) {
      setCar((prev) => ({
        ...prev,
        images: [...prev.images, { url: imageUrlInput.trim(), y: 50, s: 100 }],
      }));
      setImageUrlInput("");
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
      <div className={styles.loaderContainer}>
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <button
              onClick={() => router.back()}
              className={styles.backButton}
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <h1 className={styles.headerTitle}>Edit Vehicle</h1>
          </div>
          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleteCarMutation.isPending}
              className={styles.deleteButton}
            >
              {deleteCarMutation.isPending ? "Deleting..." : "Delete"}
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className={styles.saveButton}
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

        <form className={styles.form}>
          {/* LEFT COLUMN: Gallery & Info */}
          <div className={`${styles.leftColumn} ${styles.sectionContainer}`}>
            {/* Gallery */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <ImageIcon className="w-5 h-5 text-purple-500" />
                <h3 className={styles.cardTitle}>Gallery</h3>
              </div>

              {/* Image URL Input */}
              <div className={styles.urlUploadRow}>
                <input
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  placeholder="Paste image URL here..."
                  className={styles.urlInput}
                />
                <button
                  onClick={handleAddImageUrl}
                  type="button"
                  className={styles.addImageBtn}
                >
                  +
                </button>
              </div>

              <div className={styles.galleryGrid}>
                {car.images.map((img, i) => (
                  <div
                    key={i}
                    className={styles.imageBox}
                    onClick={() => setPopupImage(img.url)}
                    style={{ cursor: 'pointer' }}
                    title="Click to enlarge"
                  >
                    <Image
                      src={img.url}
                      alt=""
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleRemoveImage(i); }}
                      className={styles.imageRemoveBtn}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
                <label className={styles.uploadLabel}>
                  <Upload className="text-slate-400" />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className={styles.hiddenFileInput}
                  />
                </label>
              </div>
            </div>

            {/* Basic Info */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Car className="w-5 h-5 text-blue-500" />
                <h3 className={styles.cardTitle}>Info</h3>
              </div>
              <div className={styles.gridTwoCol}>
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
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>
                    Type
                  </label>
                  <select
                    name="type"
                    value={car.type}
                    onChange={handleChange}
                    className={styles.selectField}
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
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>
                    Transmission
                  </label>
                  <select
                    name="transmission"
                    value={car.transmission}
                    onChange={handleChange}
                    className={styles.selectField}
                  >
                    <option>Automatic</option>
                    <option>Manual</option>
                    <option>Semi-Automatic</option>
                  </select>
                </div>
                {/* Fuel Dropdown */}
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>
                    Fuel
                  </label>
                  <select
                    name="fuel"
                    value={car.fuel}
                    onChange={handleChange}
                    className={styles.selectField}
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
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Settings className="w-5 h-5 text-purple-500" />
                <h3 className={styles.cardTitle}>Specs</h3>
              </div>
              <div className={styles.gridFourCol}>
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
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Car className="w-5 h-5 text-green-500" />
                <h3 className={styles.cardTitle}>Description</h3>
              </div>
              <textarea
                name="about"
                value={car.about}
                onChange={(e) => setCar((prev) => ({ ...prev, about: e.target.value }))}
                placeholder="Describe the car..."
                className={styles.textarea}
              />
            </div>

            {/* Mileage & Deposit */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Settings className="w-5 h-5 text-orange-500" />
                <h3 className={styles.cardTitle}>Mileage & Deposit</h3>
              </div>
              <div className={styles.gridThreeCol}>
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
          <div className={`${styles.rightColumn} ${styles.sectionContainer}`}>
            <div className={styles.card}>
              <div className={styles.pricingHeader}>
                <div className={styles.pricingHeaderLeft}>
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <h3 className={styles.pricingTitle}>Pricing</h3>
                </div>
                {/* Status Indicator */}
                {car.applyDiscount ? (
                  <span className={`${styles.statusBadge} ${styles.statusActive}`}>
                    Discount Active
                  </span>
                ) : (
                  <span className={`${styles.statusBadge} ${styles.statusInactive}`}>
                    Standard Rate
                  </span>
                )}
              </div>

              {/* --- DISCOUNT WIDGET --- */}
              <div
                className={`${styles.discountWidget} ${car.applyDiscount
                  ? styles.discountWidgetActive
                  : styles.discountWidgetInactive
                  }`}
              >
                <div className={styles.discountHeader}>
                  <div className={styles.discountHeaderLeft}>
                    <Percent className="w-4 h-4 text-orange-500" />
                    <h4 className={styles.discountLabel}>
                      Apply Discount
                    </h4>
                  </div>
                  {car.applyDiscount && (
                    <button
                      type="button"
                      onClick={handleRemoveDiscount}
                      className={styles.removeDiscountBtn}
                    >
                      <RotateCcw size={10} /> Remove
                    </button>
                  )}
                </div>

                {!discountPreview ? (
                  <div className={styles.discountForm}>
                    <input
                      type="number"
                      placeholder="%"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      className={styles.discountInput}
                    />
                    <button
                      type="button"
                      onClick={handleCalculateDiscount}
                      className={styles.calcButton}
                    >
                      Calc
                    </button>
                  </div>
                ) : (
                  <div className={styles.discountPreview}>
                    <div className={styles.previewBox}>
                      <div className={styles.previewLine}>
                        <span className={styles.previewLabel}>Daily:</span>
                        <span className={styles.previewValue}>
                          <span className={styles.previewOld}>{car.pricing.daily}</span>
                          {" "}→{" "}
                          <span className={styles.previewNew}>
                            {discountPreview.daily}
                          </span>
                        </span>
                      </div>
                      <div className={styles.previewLine}>
                        <span className={styles.previewLabel}>Weekly:</span>
                        <span className={styles.previewValue}>
                          <span className={styles.previewOld}>{car.pricing.weekly}</span>
                          {" "}→{" "}
                          <span className={styles.previewNew}>
                            {discountPreview.weekly}
                          </span>
                        </span>
                      </div>
                      <div className={styles.previewLine}>
                        <span className={styles.previewLabel}>Monthly:</span>
                        <span className={styles.previewValue}>
                          <span className={styles.previewOld}>{car.pricing.monthly}</span>
                          {" "}→{" "}
                          <span className={styles.previewNew}>
                            {discountPreview.monthly}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className={styles.buttonRow}>
                      <button
                        type="button"
                        onClick={confirmDiscount}
                        className={styles.confirmBtn}
                      >
                        <CheckCircle size={14} /> Apply
                      </button>
                      <button
                        type="button"
                        onClick={cancelDiscount}
                        className={styles.cancelBtn}
                      >
                        <XCircle size={14} /> Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Manual Price Inputs */}
              <div className={styles.sectionContainer}>
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

      {/* Image Popup Modal */}
      {popupImage && (
        <div
          className={styles.imagePopupOverlay}
          onClick={() => setPopupImage(null)}
        >
          <div
            className={styles.imagePopupModal}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.imagePopupClose}
              onClick={() => setPopupImage(null)}
              type="button"
            >
              <X size={20} />
            </button>
            <Image
              src={popupImage}
              alt="Preview"
              width={800}
              height={500}
              className={styles.imagePopupImage}
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  );
}
