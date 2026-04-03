import { api } from "./client"

export const uploadFiles = async (files: File[]) => {
    const formData = new FormData()

    files.forEach((file) => {
        formData.append("media", file)
    })

    const filesUrl = await api.post<{media: string[]}>("/uploads", formData, 
         {headers: {
            "Content-Type": "multipart/form-data",
        }}
    )

    return filesUrl.data.media
}