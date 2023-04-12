import axios from "axios"

/**
 * @type {import('axios').AxiosInstance}
 */
const axiosInstance = axios.create({
    // baseURL: process.env.NODE_ENV === "development" ? `http://${process.env.API_HOST}/api` : "https://production.fr",
    baseURL: process.env.NODE_ENV === "development" ? `/api` : "https://mtlk.fr/api",
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axiosInstance