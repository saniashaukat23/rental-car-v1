// components/BrandPopup.tsx
import styles from "../styles/frontend/brandPopup.module.css";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BrandItem {
  name: string;
  logo: string;
}

interface BrandPopupProps {
  brands: BrandItem[];
  title: string;
  subtitle: string;
  onClose: () => void;
  columns?: 3 | 4;
  isCategory?: boolean; // 👈 1. Add this new optional prop
}

const BrandPopup = ({
  onClose,
  brands,
  title,
  subtitle,
  columns = 4,
  isCategory = false, // Default is false (treats as Brand)
}: BrandPopupProps) => {
  const gridClass = columns === 3 ? styles.grid3 : styles.grid4;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popupCard} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className={styles.closeBtn}
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className={`${styles.grid} ${gridClass}`}>
          {brands.map((item) => {
            // Logic for URL generation
            let hrefLink = "";

            if (isCategory) {
              // 👈 2. If it is a Category, go to Fleet page with Query Param
              // Example: /fleet?type=SUV
              hrefLink = `/our-fleet?type=${item.name}`;
            } else {
              // 👈 3. If it is a Brand, go to Brand specific page
              // Example: /brands/rolls-royce
              const slug = item.name.trim().toLowerCase().replace(/\s+/g, "-");
              hrefLink = `/brands/${slug}`;
            }

            return (
              <Link
                key={item.name}
                href={hrefLink} // Use the dynamic variable
                className={styles.brandItem}
                onClick={onClose}
              >
                <div className={styles.logoWrapper}>
                  <Image
                    src={item.logo}
                    alt={`${item.name} logo`}
                    width={48}
                    height={48}
                    className={styles.logo}
                  />
                </div>
                <span className={styles.brandName}>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BrandPopup;
