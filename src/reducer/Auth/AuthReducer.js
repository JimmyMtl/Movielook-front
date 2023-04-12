const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'SET_AUTH':
            localStorage.setItem("user", JSON.stringify(action.payload?.user))
            localStorage.setItem("jwt", action.payload?.jwt)
            return {
                ...state,
                user: action.payload?.user || {},
                jwt: action.payload?.jwt || "",
                loading: false
            }
        case 'UPDATE_USER':
            localStorage.setItem("user", JSON.stringify(action.payload))
            return {
                ...state,
                user: action.payload || {},
            }
        // case 'REFRESH_TOKEN':
        //     localStorage.setItem("jwt", action.payload.jwt)
        //     localStorage.setItem("refreshToken", action.payload.refreshToken)
        //     return {
        //         ...state,
        //         jwt: action.payload.jwt || "",
        //         refreshToken: action.payload.refreshToken || "",
        //     }
        case 'SET_LOADING':
            return {
                ...state,
                loading: true
            }
        case 'RESET_LOADING':
            return {
                ...state,
                loading: false
            }
        case 'SIGN_OUT':
            localStorage.removeItem("user")
            localStorage.removeItem("jwt")
            return {
                ...state,
                user: null,
                jwt: "",
                loading: false
            }

        default:
            return state
    }
}
export default AuthReducer;
