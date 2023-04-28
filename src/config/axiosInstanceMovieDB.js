import axios from "axios"
/**
 * @type {import('axios').AxiosInstance}
 */
const axiosInstanceMovieDB = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    timeout: 2000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axiosInstanceMovieDB