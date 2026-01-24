"use client";

import { usePrefetchCars } from "@/src/hooks/useCars";

/**
 * Invisible component that prefetches car data in the background
 * Add this to layouts or pages that load before /our-fleet
 */
export default function PrefetchCars() {
    usePrefetchCars();
    return null;
}
