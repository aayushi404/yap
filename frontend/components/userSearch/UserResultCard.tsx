import { useSearch } from "@/hooks/useSearch"
import { Spinner } from "../ui/spinner"
import { userSearch } from "@/schema/api"
import Link from "next/link"
import Image from "next/image"

const UserSearchResult = ({data}: {data: userSearch[]}) => {
    return (
        <div className="flex-col gap-3 mt-4">
            {data.map(d => (
              <div key={d.id} className="flex gap-2 items-center hover:bg-neutral-800 rounded-xs transition-all ease-in-out">
                <Link href="/" className="flex w-fit cursor-pointer items-center justify-center rounded-full p-3 hover:bg-neutral-900 bg-neutral-800 transition-colors">
                  <div className="size-3 sm:size-4 rounded-full ">
                  {d.profileImage && (
                      <Image
                      src={d.profileImage}
                      alt="appLogo"
                      height={28}
                      width={28}
                  />
                  )}
                  </div>
                </Link>
                <div className="flex-col">
                  <div><Link href={`/${d.username}`} className="hover:underline text-xl font-stretch-80%" onClick={e => e.stopPropagation()}>{d.name}</Link></div>
                  <div className="text-neutral-300">
                    <Link href={`/${d.username}`} onClick={e => e.stopPropagation()}>@{d.username}</Link></div>
                </div>

              </div>
            ))}
        </div> 
    )
}

export default UserSearchResult