"use client"
import Header from "@/components/sidebars/header"
import SearchBar from "@/components/userSearch/SearchBar"
import { useRouter } from "next/navigation"
export default function Explore() {
    const router = useRouter()
    return (
        <div>
            <Header onClickHandler={() => router.back()} header="Search" subHeader=""/>
            <SearchBar />
        </div>
    )
}