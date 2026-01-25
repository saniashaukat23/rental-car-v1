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
    { name: "Audi", logo: "/images/carlogos/audi.webp" },
    { name: "BMW", logo: "/images/carlogos/bmw.webp" },
    { name: "BRABUS", logo: "/images/carlogos/brabus.webp" },
    { name: "Bentley", logo: "/images/carlogos/bentley.webp" },
    { name: "Cadillac", logo: "/images/carlogos/cadillac.webp" },
    { name: "Chevrolet", logo: "/images/carlogos/chevrolet.webp" },
    { name: "Corvette", logo: "/images/carlogos/corvette.webp" },
    { name: "Ferrari", logo: "/images/carlogos/ferrari.webp" },
    { name: "GMC", logo: "/images/carlogos/gmc.webp" },
    { name: "Jetour", logo: "/images/carlogos/jetour.webp" },
    { name: "Land Rover", logo: "/images/carlogos/landrover.webp" },
    { name: "Lamborghini", logo: "/images/carlogos/lamborghini.webp" },
    { name: "Mansory", logo: "/images/carlogos/mansory.webp" },
    { name: "McLaren", logo: "/images/carlogos/mclaren.webp" },
    { name: "Mercedes", logo: "/images/carlogos/mercedes.webp" },
    { name: "Nissan", logo: "/images/carlogos/nissan.webp" },
    { name: "Porsche", logo: "/images/carlogos/porsche.webp" },
    { name: "Rolls Royce", logo: "/images/carlogos/rollsroyce.webp" },
    { name: "Rox", logo: "/images/carlogos/rox.webp" },
    { name: "Toyota", logo: "/images/carlogos/toyota.webp" },
  ];

  const category: BrandItem[] = [
    {
      name: "Convertible",
      logo: "/images/cartypelogos/1759741436173-r7utj.webp",
    },
    { name: "Luxury", logo: "/images/cartypelogos/1759756904178-6g7kni.webp" },
    { name: "Economy", logo: "/images/cartypelogos/1761836668299-9dn7n.webp" },
    { name: "SUV", logo: "/images/cartypelogos/1759827099550-kjwjapm.webp" },
    { name: "Sedan", logo: "/images/cartypelogos/1759827106843-q31jyq.webp" },
    { name: "Sports", logo: "/images/cartypelogos/1759741479677-50cvhn.webp" },
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
              src="/images/logo.jpeg"
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
