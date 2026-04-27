"use client"
import Feed from "@/components/Feed";
import PostCard from "@/components/post/FeedPostCard";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import FeedSidebar from "@/components/sidebars/FeedSidebar";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/hooks/auth";
import useFeed from "@/hooks/feed";
import { getFeed } from "@/lib/api/post";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
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
      <>
        <div className="sticky top-0 z-10 border-b border-neutral-800 bg-black/80 p-4 backdrop-blur-md">
            <h1 className="text-xl font-bold">Home</h1>
        </div>
        <Feed />
      </>
  );
}
