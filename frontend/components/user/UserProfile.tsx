import Link from "next/link"
import { useProfile } from "@/hooks/useProfile"
import { Spinner } from "../ui/spinner"
import Image from "next/image"
import { createTime } from "@/lib/services"
import { useAuthStore } from "@/hooks/auth"
import { Button } from "../ui/button"
import { UnFollowButton } from "../ui/buttons"
import { useFollow } from "@/hooks/useFolow"
import Header from "../sidebars/header"
import { useRouter } from "next/navigation"

const UserProfile = ({username}:
    {
        username: string
    }
) => {
    const {isPending, error, data} = useProfile(username)
    const user = useAuthStore(state => state.user)
    const {follow, unfollow} = useFollow()
    const router = useRouter()

    return (
       <>
       {data && (
        <div className="py-4 border-b">
            <Header onClickHandler={() => router.back()} header={data.name} subHeader={data.username}/>
            <div className="relative">
                <div className="h-60 bg-neutral-600 rounded-2xl"></div>
                <div className="absolute -bottom-1/4 left-5">
                    <div className="size-20 sm:size-35 rounded-full bg-neutral-800">
                            {data.profileImage && (
                                <Image
                                src={data.profileImage}
                                alt="appLogo"
                                height={28}
                                width={28}
                            />
                            )}
                    </div>
                </div>
                <div className="absolute right-10 -bottom-10">
                    {data.id === user?.id ? (
                        <Button className="rounded-2xl text-black font-bold hover:cursor-pointer" onClick={() => router.push("/settings/profile")}>
                            Edit Profile
                        </Button>
                    ): (
                        data.isFollower ? (
                            <UnFollowButton onClick={() => unfollow(data.id, user?.username!, data.username)}/>
                        ): (
                            data.isFollowing ? (
                            <Button onClick={() => follow(data.id, user?.username!, data.username)} className="hover:cursor-pointer">Follow Back</Button>) :
                            <Button onClick={() => follow(data.id, user?.username!, data.username)} className="hover:cursor-pointer">Follow</Button>
                        )
                    )}
                </div>
            </div>
            <div className="flex-col mt-20">
                <div>
                    <div>{data.name}</div>
                    <div className="flex gap-2">
                        <span className="text-neutral-400">@{data.username}</span>
                        {data.username !== user?.username && data.isFollowing ? (
                            <span className="bg-neutral-600 rounded-sm px-1.5">Follows you</span>
                        ): null}
                    </div>
                </div>
                <div className="text-neutral-400">{data.bio}</div>
                <div className="text-neutral-400">{createTime(new Date(data.createdAt))}</div>
                
                <div className="flex gap-5">
                    <Link href={`/${username}/following`} className="hover:underline flex gap-0.5">
                        <span>{data.followingCount}</span> 
                        <span className="text-neutral-400">Following</span>
                    </Link>
                    <Link href={`/${username}/followers`} className="hover:underline flex gap-0.5">
                        <span>{data.followersCount}</span>
                        <span className="text-neutral-400">Followers</span>
                    </Link>
                </div>
            </div>
       </div>
       )}
        {isPending && (
          <div className="flex justify-center p-4">
            <Spinner className="size-8" />
          </div>
        )}

        {/* Error Handling */}
        {error && (
          <div className="p-4 text-center text-red-500">
            Failed to load feed.
          </div>
        )}
       </> 
    )
}

export default UserProfile