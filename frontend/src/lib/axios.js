import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://notestack-backend-sdoj.onrender.com/api/v1",
    withCredentials: true
})