import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "@/app/providers"
import { uploadFiles } from "@/lib/api/upload"
import { api } from "@/lib/api/client"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { getPost } from "@/lib/api/post"
import { FeedType } from "@/schema/api"

type CreatePostPayload = {
    text: string,
    files: File[]
}
export const useCreatePost = () => {
    const mutation = useMutation({
        mutationFn: async ({text, files}: CreatePostPayload) => {
            let mediaUrl: string[] = []

            if (files.length > 0) {
                mediaUrl = await uploadFiles(files)
            }

            await api.post("/post", {
                text: text,
                media: mediaUrl
            })

        },
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["fetchFeed"] })
        toast.success("Post created successfully!!")
        },

        onError: (error) => {
        if (error instanceof AxiosError) {
            toast.error(error.response?.data.error)
        }
        }
    })

    return {
    createPost: mutation.mutate,
    isPending: mutation.isPending,
  }

}

export const usePost = (postId:number) => {
    const {isPending, error, data} = useQuery({
        queryKey:["post", postId],
        queryFn: () => getPost(postId),
        initialData: () => {
            const feed : FeedType[]|undefined = queryClient.getQueryData(["fetchFeed"])
            return feed?.find(p => p.id === postId)
        }
    })
    return {isPending, error, data}
}