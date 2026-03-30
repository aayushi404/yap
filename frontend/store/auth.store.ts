import {createStore} from "zustand/vanilla"

type userPayload = {
    id: number
}

export type AuthState = {
    token: string | null
    user: userPayload| null
    isAuthenticated: boolean
}

export type AuthActions = {
    login: (token: string, user: userPayload) => void
    logout: () => void
    setIsAuthenticated: (status:boolean) => void
}

export type AuthStore = AuthState & AuthActions

export const defaultInitState: AuthState = {
    token : null,
    user: null,
    isAuthenticated: false
}

export const createAuthStore = (
    initState: AuthState = defaultInitState
) => {
    return (
        createStore<AuthStore>()((set) => ({
            ...initState,
            login: (token, user) => set(() => ({token: token, user: user})),
            logout: () => set(() => ({token: null, user: null})),
            setIsAuthenticated: (status) => set(() => ({isAuthenticated:status}))
        }))
    )
}