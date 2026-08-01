import Link from "next/link"
import { useProfile } from "@/hooks/useProfile"
import Image from "next/image"
import { createTime } from "@/lib/services"
import { useAuthStore } from "@/hooks/auth"
import { Button } from "../ui/button"
import { UnFollowButton } from "../ui/buttons"
import { useFollow } from "@/hooks/useFollow"
import Header from "../sidebars/header"
import { useRouter } from "next/navigation"

const ProfileSkeleton = () => (
    <div className="mx-auto w-full max-w-3xl animate-pulse bg-neutral-950/80 p-3 shadow-2xl shadow-black/20 sm:p-4">
        <div className="h-40 rounded-[24px] bg-neutral-800 sm:h-48" />
        <div className="px-2 pb-2 pt-14 sm:px-3 sm:pb-3 sm:pt-16">
            <div className="flex items-start justify-between gap-3">
                <div className="space-y-3">
                    <div className="h-6 w-32 rounded-full bg-neutral-800" />
                    <div className="h-4 w-40 rounded-full bg-neutral-800" />
                </div>
                <div className="h-9 w-24 rounded-full bg-neutral-800" />
            </div>
            <div className="mt-6 space-y-3">
                <div className="h-4 w-full rounded-full bg-neutral-800" />
                <div className="h-4 w-3/4 rounded-full bg-neutral-800" />
                <div className="h-4 w-1/2 rounded-full bg-neutral-800" />
            </div>
        </div>
    </div>
)

const UserProfile = ({username}:
    {
        username: string
    }
) => {
    const {isPending, error, data} = useProfile(username)
    const user = useAuthStore(state => state.user)
    const {follow, unfollow} = useFollow()
    const router = useRouter()

    const currentUsername = user?.username ?? ""

    return (
       <>
            <Header onClickHandler={() => router.back()} header={data ? data.name : "User"} subHeader={username}/>

            {isPending && <div className="px-3 py-4 sm:px-4"><ProfileSkeleton /></div>}

            {data && !isPending && (
                <div className="">
                    <div className="mx-auto w-full max-w-3xl overflow-hidden  bg-neutral-950/80 shadow-2xl shadow-black/20 backdrop-blur">
                        <div className="relative h-40 overflow-hidden sm:h-52">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_40%)]" />
                            <div className="absolute inset-0 bg-linear-to-br from-neutral-800 via-neutral-900 to-neutral-950" />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
                                {data.id === user?.id ? (
                                    <Button
                                        type="button"
                                        size="sm"
                                        className="rounded-full border border-white/10 bg-white px-3.5 py-2 text-sm font-semibold text-neutral-950 shadow-lg shadow-black/20 transition-all hover:bg-neutral-200"
                                        onClick={() => router.push("/settings/profile")}
                                    >
                                        Edit Profile
                                    </Button>
                                ) : data.isFollower ? (
                                    <UnFollowButton onClick={() => unfollow(data.id, currentUsername, data.username)} />
                                ) : data.isFollowing ? (
                                    <Button
                                        type="button"
                                        size="sm"
                                        className="rounded-full border border-white/10 bg-white px-3.5 py-2 text-sm font-semibold text-neutral-950 shadow-lg shadow-black/20 transition-all hover:bg-neutral-200"
                                        onClick={() => follow(data.id, currentUsername, data.username)}
                                    >
                                        Follow Back
                                    </Button>
                                ) : (
                                    <Button
                                        type="button"
                                        size="sm"
                                        className="rounded-full border border-white/10 bg-white px-3.5 py-2 text-sm font-semibold text-neutral-950 shadow-lg shadow-black/20 transition-all hover:bg-neutral-200"
                                        onClick={() => follow(data.id, currentUsername, data.username)}
                                    >
                                        Follow
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="relative px-4 pb-5 pt-14 sm:px-6 sm:pb-6 sm:pt-16">
                            <div className="absolute -top-12 left-4 sm:-top-14 sm:left-6">
                                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-neutral-950 bg-neutral-800 shadow-2xl shadow-black/30 sm:h-28 sm:w-28">
                                    {data.profileImage ? (
                                        <Image
                                            src={data.profileImage}
                                            alt={`${data.name} avatar`}
                                            height={112}
                                            width={112}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-lg font-semibold text-neutral-200">
                                            {data.name?.charAt(0)?.toUpperCase() || "U"}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="min-w-0">
                                        <div className="text-xl font-semibold text-white">{data.name}</div>
                                        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-neutral-400">
                                            <span className="truncate">@{data.username}</span>
                                            {data.username !== user?.username && data.isFollowing ? (
                                                <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                                                    Follows you
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm text-neutral-300 sm:text-[15px]">
                                    {data.bio ? (
                                        <p className="max-w-2xl leading-6 text-neutral-300">{data.bio}</p>
                                    ) : (
                                        <p className="max-w-2xl text-neutral-500">No bio yet.</p>
                                    )}

                                    <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-400">
                                        <span className="inline-flex items-center py-1">
                                            Joined {createTime(new Date(data.createdAt))}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 text-sm sm:gap-6">
                                    <Link href={`/${username}/following`} className="flex items-center gap-1.5 hover:underline transition-all py-1 text-neutral-300 hover:text-white">
                                        <span className="font-semibold text-white">{data.followingCount}</span>
                                        <span className="text-neutral-400">Following</span>
                                    </Link>
                                    <Link href={`/${username}/followers`} className="flex items-center gap-1.5 hover:underline transition-all py-1 text-neutral-300 hover:text-white">
                                        <span className="font-semibold text-white">{data.followersCount}</span>
                                        <span className="text-neutral-400">Followers</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div className="mx-auto mt-4 w-full max-w-3xl rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-center text-sm text-red-300">
                    Failed to load profile.
                </div>
            )}
       </>
    )
}

export default UserProfile