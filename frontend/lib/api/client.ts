import axios, { AxiosRequestConfig } from "axios"
import { error } from "console"

export const api = axios.create({
    baseURL: process.env.BACKEND_URL || "http://localhost:8080"
})
export const apiClient = {
  get: <T,>(url: string, config: AxiosRequestConfig<T> | undefined) => api.get(url, config),
  post: <T,>(url: string, data: T, config: AxiosRequestConfig<T> | undefined) => api.post(url, data, config),
  patch: <T,>(url: string, data: T, config: AxiosRequestConfig<T> | undefined) => api.patch(url, data, config),
  delete: <T,>(url: string, config: AxiosRequestConfig<T> | undefined) => api.delete(url, config),
}
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
   
    return config
})