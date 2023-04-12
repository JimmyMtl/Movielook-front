import React, {createContext, useReducer} from 'react';

import AuthReducer from './AuthReducer'

import axiosInstance from "@config/axiosInstance";
import LoadingSpinner from "@components/01-Atoms/LoadingSpinner/LoadingSpinner";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const initialState = {
        user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("user")) : {} || {},
        jwt: typeof window !== 'undefined' ? localStorage.getItem("jwt") : "" || "",
        loading: false
    }

    axiosInstance.interceptors.request.use(config => {
        const excludedRoutes = ["/auth/signin", "/auth/signup"]
        if (!excludedRoutes.includes(window.location.pathname)) {
            const jwt = state?.jwt
            if (jwt) {
                config.headers['Authorization'] = "Bearer " + jwt
            }
        }

        return config
    }, error => {
        Promise.reject(error)
    })

    // axiosInstance.interceptors.response.use(async response => response, async error => {
    //     const exception = ["/sign-in", "/sign-up", "/"]
    //     if (error?.response?.status === 403 && !exception.includes(window.location.pathname)) {
    //         return window.location = '/unauthorized';
    //     }
    //     const originalConfig = error.config
    //     if (error?.response?.status === 401 && !originalConfig._retry && !exception.includes(window.location.pathname)) {
    //         originalConfig._retry = true
    //         try {
    //             console.log('refreshing')
    //             const res = await refreshJwtToken(state?.refreshToken)
    //             console.log('res', res)
    //             if (!res?.data) {
    //                 throw new Error('Refresh token is expired')
    //             }
    //             dispatch({type: 'REFRESH_TOKEN', payload: res?.data})
    //             return axiosInstance(originalConfig)
    //         } catch (e) {
    //             return window.location = '/sign-in';
    //         }
    //     }
    // })

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    return <AuthContext.Provider
        value={{...state, dispatch}}
    >
        {state.loading ? <LoadingSpinner/> : null}
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;
