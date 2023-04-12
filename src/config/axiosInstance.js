import axios from "axios"

/**
 * @type {import('axios').AxiosInstance}
 */
const axiosInstance = axios.create({
    // baseURL: process.env.NODE_ENV === "development" ? `http://${process.env.API_HOST}/api` : "https://production.fr",
    baseURL: process.env.NODE_ENV === "development" ? `/api` : "https://vps-84d4448b.vps.ovh.net/api",
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axiosInstance