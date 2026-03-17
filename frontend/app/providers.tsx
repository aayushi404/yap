"use client"

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
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )

}