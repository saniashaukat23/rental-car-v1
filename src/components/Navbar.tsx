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
    className={styles.dropdownArrow}
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
    { name: "Audi", logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Audi.webp" },
    { name: "BMW", logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/BMW.webp" },
    { name: "BRABUS", logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Brabus.webp" },
    { name: "Bentley", logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Bentley.webp" },
    { name: "Cadillac", logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Cadillac.webp" },
    { name: "Chevrolet", logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Chevrolet.webp" },
    { name: "Corvette", logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Corvette.webp" },
    { name: "Ferrari", logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Ferrari.webp" },
    { name: "GMC", logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/GMC.webp" },
    { name: "Jetour", logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Jetour.webp" },
    { name: "Land Rover", logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/LandRover.webp" },
    { name: "Lamborghini", logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Lamborghini.webp" },
    { name: "Mansory", logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Mansory.webp" },
    { name: "McLaren", logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/McLaren.webp" },
    { name: "Mercedes", logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Mercedes.webp" },
    { name: "Nissan", logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Nissan.webp" },
    { name: "Porsche", logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Porsche.webp" },
    { name: "Rolls Royce", logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/RollsRoyce.webp" },
    { name: "Rox", logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351266/Rox.webp" },
    { name: "Toyota", logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769351303/toyota.webp" },

  ];


  const category: BrandItem[] = [
    {
      name: "Convertible",
      logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769349831/Convertible_xmov8i.webp",
    },
    { name: "Luxury", logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769349832/Luxury_cn5zf6.webp" },
    { name: "Economy", logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769349831/Sedan_m6iywf.webp" },
    { name: "SUV", logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769352893/suv.webp" },

    { name: "Sedan", logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769349831/Economy_g6xgfl.webp" },
    { name: "Sports", logo: "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769349831/Sports_cidcwv.webp" },
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
            <Image
              src="https://res.cloudinary.com/dfck2j3nx/image/upload/v1769349404/Logo_ngjhge.jpg"
              width={160}
              height={40}
              alt="Logo"
              className={styles.logoImage}
            />
          </Link>

          {/* Desktop Links */}
          <div className={styles.linksGroup}>
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

          {/* Mobile Menu Toggle */}
          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
        {/* Mobile Menu Overlay */}
        <div
          className={`${styles.mobileMenuOverlay} ${mobileMenuOpen ? styles.open : ""}`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Mobile Menu Drawer */}
        <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ""}`}>
          <div className={styles.mobileMenuContent}>
            {menuItems.map((item, idx) => {
              const isBrands = item.label === "Brands";
              const isCategory = item.label === "Category";
              const isExpanded =
                (isBrands && mobileBrandsOpen) ||
                (isCategory && mobileCategoryOpen);
              const displayList = isBrands ? brands : isCategory ? category : [];

              return (
                <div key={idx} className={styles.flexCol}>
                  <div
                    className={styles.mobileLink}
                    onClick={(e) => handleMobileLinkClick(e as any, item)}
                  >
                    {item.hasDropdown ? (
                      <span className={item.isSpecial ? styles.navLinkSpecial : ""}>
                        {item.label}
                        {item.isSpecial && <span className={styles.badge}>%</span>}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className={item.isSpecial ? styles.navLinkSpecial : ""}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                        {item.isSpecial && <span className={styles.badge}>%</span>}
                      </Link>
                    )}

                    {item.hasDropdown && (
                      <div>
                        {isExpanded ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </div>
                    )}
                  </div>

                  {item.hasDropdown && isExpanded && (
                    <div className={styles.subItemsGrid}>
                      {displayList.map((subItem, subIdx) => {
                        const linkHref = isBrands
                          ? `/brands/${subItem.name.toLowerCase().replace(/\s+/g, "-")}`
                          : `/our-fleet?type=${subItem.name}`;
                        return (
                          <Link
                            key={subIdx}
                            href={linkHref}
                            onClick={() => setMobileMenuOpen(false)}
                            className={styles.subItemLink}
                          >
                            <div className={styles.subItemIcon}>
                              <Image
                                src={subItem.logo}
                                alt={subItem.name}
                                fill
                                className={styles.objectContain}
                              />
                            </div>
                            <span className={styles.textXs}>{subItem.name}</span>
                          </Link>
                        );
                      })}
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
