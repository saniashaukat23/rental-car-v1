import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CarType } from "@/src/types/CarType";
import { useEffect } from "react";

// Types for query parameters
interface CarsQueryParams {
    brand?: string;
    type?: string;
}

// Shared fetch function
const fetchCars = async (params?: CarsQueryParams): Promise<CarType[]> => {
    const searchParams = new URLSearchParams();
    if (params?.brand) searchParams.set("brand", params.brand);
    if (params?.type) searchParams.set("type", params.type);

    const url = `/api/cars${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Failed to fetch cars");
    }

    const data = await res.json();
    const carsArray: CarType[] = Array.isArray(data) ? data : data.cars || [];
    return carsArray;
};

// ========================================
// QUERY HOOKS (for fetching data)
// ========================================

/**
 * Fetch all cars with optional filters
 * @param params - Optional filters (brand, type)
 * @returns React Query result with cars data
 */
export function useCars(params?: CarsQueryParams) {
    const queryKey = params
        ? ["cars", params]
        : ["cars"];

    return useQuery({
        queryKey,
        queryFn: () => fetchCars(params),
    });
}

/**
 * Prefetch cars data on component mount for faster navigation
 * Use this in components that load before /our-fleet (like home page)
 */
export function usePrefetchCars() {
    const queryClient = useQueryClient();

    useEffect(() => {
        // Prefetch all cars data in the background
        queryClient.prefetchQuery({
            queryKey: ["cars"],
            queryFn: () => fetchCars(),
            staleTime: 5 * 60 * 1000, // Consider fresh for 5 minutes
        });
    }, [queryClient]);
}

/**
 * Fetch a single car by ID
 * @param id - Car ID
 * @returns React Query result with car data
 */
export function useCarById(id: string | undefined) {
    return useQuery({
        queryKey: ["car", id],
        queryFn: async () => {
            if (!id) throw new Error("Car ID is required");

            const res = await fetch(`/api/cars/${id}`);

            if (!res.ok) {
                throw new Error("Failed to fetch car");
            }

            const data = await res.json();
            return { ...data, images: data.images || [] };
        },
        enabled: !!id, // Only run query if id exists
    });
}

// ========================================
// MUTATION HOOKS (for modifying data)
// ========================================

/**
 * Update a car
 * @returns Mutation hook for updating car data
 */
export function useUpdateCar() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: any }) => {
            const res = await fetch(`/api/cars/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Update failed");
            }

            return res.json();
        },
        onSuccess: (_, variables) => {
            // Invalidate relevant queries to refetch fresh data
            queryClient.invalidateQueries({ queryKey: ["car", variables.id] });
            queryClient.invalidateQueries({ queryKey: ["cars"] });
        },
    });
}

/**
 * Delete a car
 * @returns Mutation hook for deleting a car
 */
export function useDeleteCar() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`/api/cars/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Delete failed");
            }

            return res.json();
        },
        onSuccess: () => {
            // Invalidate cars list after deletion
            queryClient.invalidateQueries({ queryKey: ["cars"] });
        },
    });
}
