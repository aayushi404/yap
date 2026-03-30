import { AuthStoreContext } from "@/contexts/auth";
import { type AuthStore } from "@/store/auth.store";
import { useContext } from "react";
import { useStore } from "zustand";

export const useAuthStore = <T,>(
    selector: (store: AuthStore) => T,
) : T => {
    const authStoreContext = useContext(AuthStoreContext)
    if (!authStoreContext) {
        throw new Error(`useCounterStore must be used within CounterStoreProvider`)
    }
    return useStore(authStoreContext, selector)
}