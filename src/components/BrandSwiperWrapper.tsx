"use client";
import dynamic from "next/dynamic";

// Dynamic import with SSR disabled to fix hydration mismatch
const BrandSwiper = dynamic(() => import("./BrandSwiper"), { 
  ssr: false,
  loading: () => <div style={{ height: '150px' }} /> // Placeholder while loading
});

export default function BrandSwiperWrapper() {
  return <BrandSwiper />;
}
