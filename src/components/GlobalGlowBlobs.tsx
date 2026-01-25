"use client";
import React from "react";
import styles from "../styles/frontend/glowBlobs.module.css";

const GlobalGlowBlobs: React.FC = () => {
    return (
        <div className={styles.blobContainer} aria-hidden="true">
            <div className={`${styles.blurBlob} ${styles.blobPrimary} ${styles.blob1}`} />
            <div className={`${styles.blurBlob} ${styles.blobSecondary} ${styles.blob2}`} />
            <div className={`${styles.blurBlob} ${styles.blobPrimary} ${styles.blob3}`} />
        </div>
    );
};

export default GlobalGlowBlobs;
