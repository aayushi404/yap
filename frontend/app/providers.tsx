"use client"

import { AuthStoreProvider } from "@/contexts/auth"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import React from "react"

const queryClient = new QueryClient()

export default function Provider(
    {
        children
    } : {
        children: React.ReactNode
    }) {
    return (
        <AuthStoreProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </AuthStoreProvider>
    )
}