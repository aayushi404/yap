import axios from "axios"
import { error } from "console"

export const api = axios.create({
    baseURL: process.env.BACKEND_URL || "http://localhost:8080"
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
   
    return config
})