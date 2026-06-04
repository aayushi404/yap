import { userSearch } from "@/lib/api/user"
import { useQuery } from "@tanstack/react-query"

export const useSearch = (query: string) => {
    const {isPending, error, data} = useQuery({
        queryKey: ["userSearch", query],
        queryFn: () => userSearch(query), 
        enabled: !!query
    })

    return {isPending, error, data}
}