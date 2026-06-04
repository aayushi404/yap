"use client"
import Header from "@/components/sidebars/header"
import { useRouter } from "next/navigation"

const Profile = () => {
    const router = useRouter()
    return (
        <>
            <Header onClickHandler={() => router.back()} header="Back" subHeader=""/>
            
        </>
    )
}

export default Profile