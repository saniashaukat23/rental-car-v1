"use client";
import React, { useState } from "react";
import {
  MapPin,
  ChevronDown,
  Check,
  Search,
  CarFront,
  Gauge,
} from "lucide-react";
import { useRouter } from "next/navigation";

import styles from "../styles/frontend/filterBox.module.css";

interface FilterOption {
  value: string;
  label: string;
}

// Data Options
const brandOptions: FilterOption[] = [
  { value: "all", label: "All Brands" },
  { value: "Audi", label: "Audi" },
  { value: "BMW", label: "BMW" },
  { value: "Bentley", label: "Bentley" },
  { value: "Ferrari", label: "Ferrari" },
  { value: "Lamborghini", label: "Lamborghini" },
  { value: "Mercedes", label: "Mercedes" },
  { value: "Rolls Royce", label: "Rolls Royce" },
  { value: "Toyota", label: "Toyota" },
];

const categoryOptions: FilterOption[] = [
  { value: "SUV", label: "SUV" },
  { value: "Sport", label: "Sport" },
  { value: "Sedan", label: "Sedan" },
  { value: "Luxury", label: "Luxury" },
  { value: "Convertible", label: "Convertible" },
];

const typeOptions: FilterOption[] = [
  { value: "electric", label: "Electric" },
  { value: "hybrid", label: "Hybrid" },
  { value: "V8", label: "V8 Engine" },
  { value: "V12", label: "V12 Engine" },
];

interface FilterDropdownProps {
  label: string;
  placeholder: string;
  icon?: React.ElementType;
  options: FilterOption[];
  isOpen: boolean;
  onToggle: () => void;
  selectedValue: string;
  onSelect: (value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  placeholder,
  icon: Icon,
  options,
  isOpen,
  onToggle,
  selectedValue,
  onSelect,
}) => {
  const currentSelectionLabel = options.find(
    (opt) => opt.value === selectedValue
  )?.label;

  return (
    <div className={styles.dropdownContainer}>
      <div className="w-full">
        <label className={styles.dropdownLabel}>{label}</label>
        <button
          type="button"
          className={styles.dropdownButton}
          onClick={onToggle}
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4 text-orange-400" />}
            <span
              className={`truncate ${
                currentSelectionLabel ? "text-white" : "text-white/60"
              }`}
            >
              {currentSelectionLabel || placeholder}
            </span>
          </div>
          <ChevronDown
            className="h-4 w-4 text-white/60"
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
        </button>
      </div>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <button
              key={option.value}
              className={styles.dropdownOption}
              onClick={() => {
                onSelect(option.value);
                onToggle();
              }}
            >
              {option.value === selectedValue ? (
                <Check className="h-4 w-4 text-orange-500" />
              ) : (
                <div className="h-4 w-4" />
              )}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const FilterBox: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // 1. State keys defined here
  const [selections, setSelections] = useState({
    brand: "",
    type: "", // This is Category
    engineType: "", // This is Engine Type
  });

  const router = useRouter();

  const toggleFilter = (label: string) => {
    setActiveFilter((prev) => (prev === label ? null : label));
  };

  const handleSelect = (filter: string, value: string) => {
    setSelections((prev) => ({ ...prev, [filter]: value }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    // 2. Map 'type' state to 'type' URL param
    if (selections.type) {
      params.append("type", selections.type);
    }

    // Map 'brand' state to 'brand' URL param
    if (selections.brand && selections.brand !== "all") {
      params.append("brand", selections.brand);
    }

    // 3. Map 'engineType' state to 'engine' URL param
    if (selections.engineType) {
      params.append("engine", selections.engineType);
    }

    router.push(`/our-fleet?${params.toString()}`);
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterWrapper}>
        <FilterDropdown
          label="Brand"
          placeholder="Pick a brand"
          icon={CarFront}
          options={brandOptions}
          isOpen={activeFilter === "Brand"}
          onToggle={() => toggleFilter("Brand")}
          selectedValue={selections.brand}
          onSelect={(val) => handleSelect("brand", val)}
        />

        <FilterDropdown
          label="Category"
          placeholder="Select category"
          icon={MapPin}
          options={categoryOptions}
          isOpen={activeFilter === "Category"}
          onToggle={() => toggleFilter("Category")}
          selectedValue={selections.type}
          // 4. FIX: changed "category" to "type" to match state
          onSelect={(val) => handleSelect("type", val)}
        />

        <FilterDropdown
          label="Engine Type"
          placeholder="Any Type"
          icon={Gauge}
          options={typeOptions}
          isOpen={activeFilter === "Engine Type"}
          onToggle={() => toggleFilter("Engine Type")}
          selectedValue={selections.engineType}
          // 5. This correctly matches state 'engineType'
          onSelect={(val) => handleSelect("engineType", val)}
        />

        <div className="flex justify-center md:justify-end">
          <button className={styles.searchButton} onClick={handleSearch}>
            <Search className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBox;
