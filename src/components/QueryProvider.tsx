"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function QueryProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Data is considered fresh for 5 minutes - prevents refetching during navigation
                        staleTime: 5 * 60 * 1000,
                        // Cache data for 30 minutes
                        gcTime: 30 * 60 * 1000,
                        // Retry failed requests once
                        retry: 1,
                        // Don't refetch on window focus (causes slowdowns)
                        refetchOnWindowFocus: false,
                        // Don't refetch when component remounts - use cached data
                        refetchOnMount: false,
                        // Don't refetch on reconnect
                        refetchOnReconnect: false,
                    },
                    mutations: {
                        retry: 1,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
