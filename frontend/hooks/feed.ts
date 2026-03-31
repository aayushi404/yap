import { getFeed } from "@/lib/api/post"
import { useQuery } from "@tanstack/react-query"

const useFeed = () => {
    const {isPending, error, data} = useQuery({
        queryKey: ["fetchFeed"],
        queryFn: () => getFeed()
    })
    return {isPending, error, data}
}
export default useFeed


