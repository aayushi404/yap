import { useRouter } from "next/navigation"
import Header from "../sidebars/header"
import { Field } from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { ChangeEvent, SubmitEvent, useEffect, useState } from "react"
import useDebounce from "@/hooks/useDebounce"
import { useSearch } from "@/hooks/useSearch"
import { Spinner } from "../ui/spinner"
import UserSearchResult from "./UserResultCard"

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearchTerm = useDebounce(searchTerm, 300)
    const {isPending, error, data} = useSearch(debouncedSearchTerm)
    const router = useRouter()

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const handleSubmit = (e:SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        setSearchTerm(formData.get("search") as string)
        e.target.reset()
        e.target.focus()
    }

    return (
        <div className="flex-col gap-5">
            <form onSubmit={(e) => handleSubmit(e)}>
                <Field orientation="horizontal">
                    <Input type="search" name="search" placeholder="Search..." onChange={(e) => handleChange(e)}/>
                    <Button type="submit">Search</Button>
                </Field> 
            </form>
            {isPending && (
                <div className="flex justify-center p-4">
                    <Spinner className="size-8" />
                </div>
                )}

                {error && (
                <div className="p-4 text-center text-red-500">
                    Failed to load feed.
                </div>
            )}
            {data && <UserSearchResult data={data}/>}
        </div>
    )
}

export default SearchBar