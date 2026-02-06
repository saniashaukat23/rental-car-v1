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
import styles from "../../styles/admin/GeneralSettings.module.css";

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
  <div className={styles.sectionTitle}>
    <Icon className={styles.sectionTitleIcon} />
    <h3>{title}</h3>
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
  <div className={width === "half" ? styles.inputColHalf : styles.inputColFull}>
    <label className={styles.inputLabel}>
      {label}
      {required && <span className={styles.requiredMark}>*</span>}
      {!required && <span className={styles.optionalNote}>(optional)</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={styles.inputField}
    />
  </div>
);

// --- Main Component ---
const AddCar = () => {
  const [loading, setLoading] = useState(false);
  const [featureInput, setFeatureInput] = useState("");
  const [keyFeatureInput, setKeyFeatureInput] = useState("");
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [popupImage, setPopupImage] = useState<{ url: string; y: number; s: number } | null>(null);

  // Close popup on ESC key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPopupImage(null);
    };
    if (popupImage) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [popupImage]);

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
    about: "",
    pickupLocation: "",
    insurance: "Standard",
    freePickupAndDrop: "Yes",
    images: [] as { url: string; y: number; s: number }[],
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

  const addImageUrl = () => {
    if (imageUrlInput.trim()) {
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, { url: imageUrlInput.trim(), y: 50, s: 100 }],
      }));
      setImageUrlInput("");
    }
  };

  const removeImage = (indexToRemove: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const updateImageAdjustment = (index: number, key: "y" | "s", value: number) => {
    setForm((prev) => {
      const newImages = [...prev.images];
      newImages[index] = { ...newImages[index], [key]: value };
      return { ...prev, images: newImages };
    });
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
      year: Number(form.year),
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
    <div className={styles.root}>
      {/* Page Header */}
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.pageTitle}>Vehicle Registration</h1>
          <p className={styles.pageSubtitle}>Add a new luxury car to your fleet inventory.</p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className={styles.publishButton}
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

      <div className={styles.layoutGrid}>
        {/* --- Left Column (Details) --- */}
        <div className={styles.leftColumn}>
          {/* 1. Basic Specifications */}
          <div className={styles.card}>
            <SectionTitle icon={Car} title="Basic Specifications" />
            <div className={styles.gridTwo}>
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
              <div className={styles.inputColFull}>
                <label className={styles.inputLabel}>
                  Vehicle Category<span className={styles.requiredMark}>*</span>
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className={styles.selectField}
                >
                  <option value="">Select Category</option>
                  <option>Sedan</option>
                  <option>SUV</option>
                  <option>Sports</option>
                  <option>Luxury</option>
                  <option>Convertible</option>
                </select>
              </div>

              <div className={styles.inputColFull}>
                <label className={styles.inputLabel}>Fuel Type</label>
                <select
                  name="fuel"
                  value={form.fuel}
                  onChange={handleChange}
                  className={styles.selectField}
                >
                  <option>Gasoline</option>
                  <option>Electric</option>
                  <option>Hybrid</option>
                </select>
              </div>

              <div className={styles.inputColFull}>
                <label className={styles.inputLabel}>Transmission</label>
                <select
                  name="transmission"
                  value={form.transmission}
                  onChange={handleChange}
                  className={styles.selectField}
                >
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </div>
            </div>
          </div>

          {/* 2. Performance Specs */}
          <div className={styles.card}>
            <SectionTitle icon={Settings} title="Performance & Configuration" />
            <div className={styles.gridFour}>
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
          <div className={styles.card}>
            <SectionTitle icon={Plus} title="Features & Highlights" />

            {/* General Features */}
            <div>
              <label className={styles.inputLabel}>General Features</label>
              <div className={styles.featureRow}>
                <input
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  placeholder="Type feature (e.g. Apple CarPlay)"
                  className={styles.featureInput}
                />
                <button
                  onClick={addFeature}
                  type="button"
                  className={styles.addButton}
                >
                  +
                </button>
              </div>
              <div className={styles.tagList}>
                {form.features.map((f, i) => (
                  <span key={i} className={styles.tag}>
                    {f}
                    <button type="button" onClick={() => removeTag("features", i)}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className={styles.keyFeaturesHeader}>
              <label className={styles.keyFeaturesLabel}>
                <Star size={14} /> Key Features (Highlighted)
              </label>
              <div className={styles.featureRow}>
                <input
                  value={keyFeatureInput}
                  onChange={(e) => setKeyFeatureInput(e.target.value)}
                  placeholder="Type key highlight (e.g. 0-100 in 3s)"
                  className={styles.featureInput}
                />
                <button
                  onClick={addKeyFeature}
                  type="button"
                  className={styles.addButton}
                >
                  +
                </button>
              </div>
              <div className={styles.tagList}>
                {form.keyFeatures.map((f, i) => (
                  <span key={i} className={styles.tag}>
                    {f}
                    <button type="button" onClick={() => removeTag("keyFeatures", i)}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Description */}
          <div className={styles.card}>
            <label className={styles.inputLabel}>Vehicle Description</label>
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="Describe the driving experience..."
            ></textarea>
          </div>
        </div>

        {/* --- Right Column (Pricing & Media) --- */}
        <div className={styles.rightColumn}>
          {/* 5. Pricing */}
          <div className={styles.card}>
            <SectionTitle icon={DollarSign} title="Pricing (AED)" />
            <div>
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
              <div className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  id="applyDiscount"
                  checked={form.applyDiscount}
                  onChange={(e) =>
                    setForm({ ...form, applyDiscount: e.target.checked })
                  }
                  className={styles.checkboxInput}
                />
                <label htmlFor="applyDiscount" className={`${styles.inputLabel} ${styles.priceDiscountLabel}`}>
                  Apply Discount Badge
                  <span className={styles.saleBadge}>Sale</span>
                </label>
              </div>
              <div className={styles.extraPricingContainer}>
                <InputField
                  label="Security Deposit"
                  name="securityDeposit"
                  type="number"
                  placeholder="0.00"
                  width="full"
                  value={form.securityDeposit}
                  onChange={handleChange}
                />
                <div className={styles.mileageGrid}>
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
          <div className={styles.card}>
            <SectionTitle icon={UploadCloud} title="Media Gallery" />

            <div className={styles.urlUploadRow}>
              <input
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="Paste image URL here..."
                className={styles.urlInput}
              />
              <button
                onClick={addImageUrl}
                type="button"
                className={styles.addImageButton}
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Previews */}
            <div className={styles.previewStack}>
              {form.images.map((img, index) => (
                <div key={index} className={styles.fixedPreviewItem}>
                  <div
                    className={styles.fixedImageWrapper}
                    onClick={() => setPopupImage(img)}
                    style={{ cursor: 'pointer' }}
                    title="Click to enlarge"
                  >
                    <Image
                      src={img.url}
                      alt="preview"
                      fill
                      className={styles.objectCover}
                      style={{
                        objectPosition: `center ${img.y}%`,
                        transform: `scale(${img.s / 100})`
                      }}
                      unoptimized
                    />
                  </div>

                  {/* Adjustment Controls */}
                  <div className={styles.imageControls}>
                    <div className={styles.controlGroup}>
                      <label className={styles.controlLabel}>Vertical Position</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={img.y}
                        onChange={(e) => updateImageAdjustment(index, 'y', parseInt(e.target.value))}
                        className={styles.rangeInput}
                      />
                    </div>
                    <div className={styles.controlGroup}>
                      <label className={styles.controlLabel}>Zoom / Scale</label>
                      <input
                        type="range"
                        min="50"
                        max="200"
                        value={img.s}
                        onChange={(e) => updateImageAdjustment(index, 's', parseInt(e.target.value))}
                        className={styles.rangeInput}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className={styles.previewRemove}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              {form.images.length === 0 && (
                <div className={styles.emptyState}>No images added yet.</div>
              )}
            </div>
          </div>
        </div>
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
              src={popupImage.url}
              alt="Preview"
              width={800}
              height={500}
              className={styles.imagePopupImage}
              style={{
                objectPosition: `center ${popupImage.y}%`,
                transform: `scale(${popupImage.s / 100})`
              }}
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCar;
