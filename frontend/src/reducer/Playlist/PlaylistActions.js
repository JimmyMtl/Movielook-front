import axiosInstance from "@config/axiosInstance";

export const getAllPlaylists = async (userID) => {
    // const urlold = `/playlists?filters[user][id][$eq]=${userID}&populate=*`
    const url = `/playlists?filters[user][id][$eq]=${userID}`
    return await axiosInstance.get(url)
}
export const createNewPlaylist = async (name, user) => {
    const url = `/playlists`
    console.log(name, user)
    console.log({data: {name, user}})
    return await axiosInstance.post(url, {data: {name, user}})
}