import Image from "next/image";
import Link from "next/link";
import styles from "../styles/frontend/carCategoryGrid.module.css";
const CarCategory: [string, string][] = [
  ["Convertible", "/images/cartypelogos/1759741436173-r7utj.webp"],
  ["Economy", "/images/cartypelogos/1761836668299-9dn7n.webp"],
  ["Luxury", "/images/cartypelogos/1759756904178-6g7kni.webp"],
  ["SUV", "/images/cartypelogos/1759827099550-kjwjapm.webp"],
  ["Sedan", "/images/cartypelogos/1759827106843-q31jyq.webp"],
  ["Sports", "/images/cartypelogos/1759741479677-50cvhn.webp"],
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
