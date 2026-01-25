"use client";

import React from "react";
import Link from "next/link";
import { Tag } from "lucide-react";
import styles from "../styles/frontend/DiscountFloatingButton.module.css";

const DiscountFloatingButton: React.FC = () => {
    return (
        <Link
            href="/discount-offers"
            className={styles.floatingButton}
            aria-label="View Discount Offers"
        >
            <div className={styles.container}>
                <Tag className={styles.icon} aria-hidden="true" />
                <div className={styles.text}>Discount Offers</div>
                {/* Animated Ping Effect */}
                <div className={styles.ping}></div>
                <div className={styles.dot}></div>
            </div>
        </Link>
    );
};

export default DiscountFloatingButton;
