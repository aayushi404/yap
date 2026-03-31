import {createStore} from "zustand/vanilla"
import { persist } from 'zustand/middleware'

type userPayload =  {
    id: number,
    name: string,
    username: string,
    profileImage: string
}

export type AuthState = {
    token: string | null
    user: userPayload | null
    _hasHydrated: boolean
}

export type AuthActions = {
    login: (token: string, user: userPayload) => void
    logout: () => void
    setHasHydrated: (state:boolean) => void
}

export type AuthStore = AuthState & AuthActions

export const defaultInitState: AuthState = {
    token : null,
    user: null,
    _hasHydrated: false
}

export const createAuthStore = (
    initState: AuthState = defaultInitState
) => {
    return (
        createStore<AuthStore>()(
            persist((set) => ({
            ...initState,
            login: (token, user) => set(() => ({token: token, user: user})),
            logout: () => set(() => ({token: null, user: null})),
            setHasHydrated: (state) => set(() => ({_hasHydrated:state}))
        }),
        {
            name: "user",
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true)
            }
        }
        
    ))
    )
}