"use client"
import Feed from "@/components/feed";
import { useAuthStore } from "@/hooks/auth";
import { getFeed } from "@/lib/api/post";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const {isAuthenticated, setIsAuthenticated} = useAuthStore((state) => state)
  const router = useRouter()
  if (!isAuthenticated) {
    router.push("/login")
  }
  useEffect(() => {
    (async () => {
      try {
        const response = await getFeed()
        console.log(response)
      } catch (err) {
        console.log(err)
        if (err instanceof AxiosError) {
          console.log(err.response?.data)
        }
      }
    })()

  }, [])
  return (
    <div className="">
      <Feed />
    </div>
  );
}
