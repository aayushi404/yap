"use client"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/hooks/auth"

const Logout = () => {
    const logout = useAuthStore(state => state.logout)
    return (
        <div>
            <Button onClick={() => logout()}>Logout</Button>
        </div>
    )
}

export default Logout