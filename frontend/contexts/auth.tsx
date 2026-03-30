"use client"
import { type AuthStore, createAuthStore } from "@/store/auth.store";
import { createContext, useState, type ReactNode } from "react";

export type AuthStoreApi = ReturnType<typeof createAuthStore>

export const AuthStoreContext = createContext<AuthStoreApi | undefined>(undefined)

export const AuthStoreProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const [store] = useState(() => createAuthStore())

    return (
        <AuthStoreContext.Provider value={store}>
            {children}
        </AuthStoreContext.Provider>
    )
}