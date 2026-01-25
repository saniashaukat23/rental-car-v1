import Image from "next/image";
import Link from "next/link";
import styles from "../styles/frontend/carCategoryGrid.module.css";
const CarCategory: [string, string][] = [
  ["Convertible", "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769349831/Convertible_xmov8i.webp"],
  ["Economy", "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769349831/Sedan_m6iywf.webp"],
  ["Luxury", "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769349832/Luxury_cn5zf6.webp"],
  ["SUV", "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769349831/SUV_t11v2e.webp"],
  ["Sedan", "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769349831/Economy_g6xgfl.webp"],
  ["Sports", "https://res.cloudinary.com/dfck2j3nx/image/upload/v1769349831/Sports_cidcwv.webp"],
];


const CarCategoryGrid: React.FC = () => {
  return (
    <div className={styles.gridWrapper}>
      {CarCategory.map((item, index) => (
        <Link
          href={`/our-fleet?type=${item[0]}`}
          key={index}
          className={styles.card}
        >
          <Image
            width={80}
            height={80}
            src={item[1]}
            alt={item[0]}
            className={styles.image}
          />
          <p className={styles.text}>{item[0]}</p>
        </Link>
      ))}
    </div>
  );
};
export default CarCategoryGrid;
