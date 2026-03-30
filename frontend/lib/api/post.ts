import { api } from "./client"

const getFeed = async (cursor?:number) => {

    const response = await api.get("/user/feed?limit=10")
    return response.data
}
export {getFeed}