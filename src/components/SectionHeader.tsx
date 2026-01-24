import React from "react";
import styles from "../styles/frontend/sectionHeader.module.css";

interface SectionHeaderProps {
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {title}
      </h2>
      <p className={styles.description}>
        {description}
      </p>
    </div>
  );
};

export default SectionHeader;
