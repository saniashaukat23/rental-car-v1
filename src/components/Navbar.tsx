"use client";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import React, { useState, useEffect } from "react"; // Added useEffect
import styles from "../styles/frontend/navbar.module.css";
import BrandPopup from "./BrandPopUp";

interface MenuItem {
  href: string;
  label: string;
  hasDropdown?: boolean;
  isSpecial?: boolean;
}

interface BrandItem {
  name: string;
  logo: string;
}

const DropdownArrow = () => (
  <ChevronDown
    size={14}
    className={`${styles.dropdownArrow} ml-1 group-hover:text-amber-600`}
  />
);

const menuItems: MenuItem[] = [
  { href: "/", label: "Home" },
  { href: "/brands", label: "Brands", hasDropdown: true },
  { href: "/category", label: "Category", hasDropdown: true },
  { href: "/our-fleet", label: "Our Fleet" },
  { href: "/discount-offers", label: "Discount Offers", isSpecial: true },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const [mobileBrandsOpen, setMobileBrandsOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);

  const brands: BrandItem[] = [
    { name: "Audi", logo: "/images/CarLogos/audi.webp" },
    { name: "BMW", logo: "/images/CarLogos/bmw.webp" },
    { name: "BRABUS", logo: "/images/CarLogos/brabus.webp" },
    { name: "Bentley", logo: "/images/CarLogos/bentley.webp" },
    { name: "Cadillac", logo: "/images/CarLogos/cadillac.webp" },
    { name: "Chevrolet", logo: "/images/CarLogos/chevrolet.webp" },
    { name: "Corvette", logo: "/images/CarLogos/corvette.webp" },
    { name: "Ferrari", logo: "/images/CarLogos/ferrari.webp" },
    { name: "GMC", logo: "/images/CarLogos/gmc.webp" },
    { name: "Jetour", logo: "/images/CarLogos/jetour.webp" },
    { name: "Land Rover", logo: "/images/CarLogos/landrover.webp" },
    { name: "Lamborghini", logo: "/images/CarLogos/lamborghini.webp" },
    { name: "Mansory", logo: "/images/CarLogos/Mansory.webp" },
    { name: "McLaren", logo: "/images/CarLogos/McLaren.webp" },
    { name: "Mercedes", logo: "/images/CarLogos/Mercedes.webp" },
    { name: "Nissan", logo: "/images/CarLogos/Nissan.webp" },
    { name: "Porsche", logo: "/images/CarLogos/Porsche.webp" },
    { name: "Rolls Royce", logo: "/images/CarLogos/RollsRoyce.webp" },
    { name: "Rox", logo: "/images/CarLogos/Rox.webp" },
    { name: "Toyota", logo: "/images/CarLogos/Toyota.webp" },
  ];

  const category: BrandItem[] = [
    {
      name: "Convertible",
      logo: "/images/CarTypeLogos/1759741436173-r7utj.webp",
    },
    { name: "Luxury", logo: "/images/CarTypeLogos/1759756904178-6g7kni.webp" },
    { name: "Economy", logo: "/images/CarTypeLogos/1761836668299-9dn7n.webp" },
    { name: "SUV", logo: "/images/CarTypeLogos/1759827099550-kjwjapm.webp" },
    { name: "Sedan", logo: "/images/CarTypeLogos/1759827106843-q31jyq.webp" },
    { name: "Sports", logo: "/images/CarTypeLogos/1759741479677-50cvhn.webp" },
  ];

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleDesktopLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: MenuItem
  ) => {
    if (item.label === "Brands") {
      e.preventDefault();
      setIsBrandsOpen(true);
      setIsCategoryOpen(false);
    } else if (item.label === "Category") {
      e.preventDefault();
      setIsCategoryOpen(true);
      setIsBrandsOpen(false);
    }
  };

  const handleMobileLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>,
    item: MenuItem
  ) => {
    if (item.label === "Brands") {
      e.preventDefault();
      setMobileBrandsOpen(!mobileBrandsOpen);
      setMobileCategoryOpen(false);
    } else if (item.label === "Category") {
      e.preventDefault();
      setMobileCategoryOpen(!mobileCategoryOpen);
      setMobileBrandsOpen(false);
    } else {
      setMobileMenuOpen(false);
      setMobileBrandsOpen(false);
      setMobileCategoryOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (mobileMenuOpen) {
      setMobileBrandsOpen(false);
      setMobileCategoryOpen(false);
    }
  };

  return (
    <>
      <nav className={styles.navContainer}>
        <div className={styles.navWrapper}>
          <Link href={"/"}>
            <div className="flex items-center">
              <Image
                src="/images/logo.jpeg"
                width={140}
                height={40}
                alt="Logo"
                className={styles.logoImage}
              />
            </div>
          </Link>
          <div className={`${styles.linksGroup} ${styles.desktopLinks} flex`}>
            {menuItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={(e) => handleDesktopLinkClick(e, item)}
                className={
                  item.isSpecial ? styles.navLinkSpecial : styles.navLink
                }
              >
                {item.label} {item.hasDropdown && <DropdownArrow />}
                {item.isSpecial && <span className={styles.badge}>%</span>}
              </Link>
            ))}
          </div>
          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div
          className={`${styles.mobileMenu} ${
            mobileMenuOpen ? styles.open : ""
          } fixed left-0 right-0 bottom-0 bg-white z-50`}
          style={{
            height: "calc(100vh - 80px)",
            overflowY: "auto",
            overscrollBehavior: "contain",
          }}
        >
          <div className="pb-20">
            {menuItems.map((item, idx) => {
              const isBrands = item.label === "Brands";
              const isCategory = item.label === "Category";
              const isExpanded =
                (isBrands && mobileBrandsOpen) ||
                (isCategory && mobileCategoryOpen);
              const displayList = isBrands
                ? brands
                : isCategory
                ? category
                : [];

              return (
                <div
                  key={idx}
                  className="flex flex-col border-b border-gray-100 last:border-0"
                >
                  <Link
                    href={item.href}
                    className={`${
                      item.isSpecial
                        ? `${styles.mobileLink} ${styles.navLinkSpecial}`
                        : styles.mobileLink
                    } flex justify-between items-center w-full px-4 py-3`}
                    onClick={(e) => handleMobileLinkClick(e, item)}
                  >
                    <span className="flex items-center gap-2">
                      {item.label}
                      {item.isSpecial && (
                        <span className={styles.badge}>%</span>
                      )}
                    </span>
                    {item.hasDropdown &&
                      (isExpanded ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </Link>
                  {item.hasDropdown && isExpanded && (
                    <div className="bg-gray-50 p-4 border-t border-gray-200 shadow-inner">
                      <div className="grid grid-cols-2 gap-4">
                        {displayList.map((subItem, subIdx) => {
                          const linkHref = isBrands
                            ? `/brands/${subItem.name}`
                            : `/our-fleet?type=${subItem.name}`;
                          return (
                            <Link
                              key={subIdx}
                              href={linkHref}
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileBrandsOpen(false);
                                setMobileCategoryOpen(false);
                              }}
                              className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                            >
                              <div className="relative w-12 h-12 mb-2">
                                <Image
                                  src={subItem.logo}
                                  alt={subItem.name}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                              <span className="text-xs font-medium text-center text-gray-700">
                                {subItem.name}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </nav>
      {isBrandsOpen && (
        <BrandPopup
          brands={brands}
          title="Brands"
          subtitle="Choose from premium car brands"
          onClose={() => setIsBrandsOpen(false)}
        />
      )}
      {isCategoryOpen && (
        <BrandPopup
          title="Categories"
          subtitle="Explore cars by their types"
          brands={category}
          onClose={() => setIsCategoryOpen(false)}
          isCategory={true}
          columns={3}
        />
      )}
    </>
  );
}
