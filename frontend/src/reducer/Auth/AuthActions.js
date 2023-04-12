import axiosInstance from "@config/axiosInstance";

export const signUp = async (state) => {
    const url = "/auth/local/register"
    return await axiosInstance.post(url, state)
}
export const signIn = async (state) => {
    const url = "/auth/local"
    return await axiosInstance.post(url,state)
}