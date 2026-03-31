"use client"
import { useAuthStore } from "@/hooks/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import React from "react"
import { Spinner } from "./ui/spinner"

export const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
    const user = useAuthStore((state) => state.user)
    const _hasHydrated = useAuthStore((state) => state._hasHydrated)
    const router = useRouter()
    useEffect(() => {
    if (_hasHydrated && !user) {
        router.push("/login")
    }

    }, [user, router, _hasHydrated])

    if (!_hasHydrated) {
    return (<Spinner />)
    }
    if (!user) {
    return null
    }
 
    return (
        {children}
    )
}