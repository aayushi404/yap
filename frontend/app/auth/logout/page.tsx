"use client"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { useAuthStore } from "@/hooks/auth"
import { useRouter } from "next/navigation"

const Logout = () => {
    const {logout, user} = useAuthStore(state => state)
    const router = useRouter() 
    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
            <div className="w-full max-w-sm">
                <Card>
                <CardHeader>Log out as @{user?.username}</CardHeader>
                <Button onClick={() => {
                    logout()
                    router.push("/")
                    }}>Logout</Button>
                </Card>
            </div>
        </div>
    )
}

export default Logout