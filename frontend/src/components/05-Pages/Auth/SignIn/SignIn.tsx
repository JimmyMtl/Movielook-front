import style from "@components/05-Pages/Auth/Auth.module.scss";
import defaultBackground from "@components/00-Base/supermanbatman.jpg";
import FormSignIn from "@components/03-Organisms/Auth/FormSignIn/FormSignIn";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@reducer/Auth/AuthContext";
import {toast} from "react-toastify"
import {signIn} from "@reducer/Auth/AuthActions"
import {useRouter} from "next/router";

const SignIn = () => {
    const {dispatch, user} = useContext(AuthContext)
    const router = useRouter()
    const [states, setStates] = useState({
        email: "",
        password: "",
        rememberme: false
    });
    const onInputChange = (e) => setStates(prevState => ({
        ...prevState,
        [e.target.id]: e.target.value
    }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({type: "SET_LOADING"})
        try {
            // TODO: Change any type
            const res: any = await signIn({...states, identifier: states?.email})
            console.log('res', res)
            if (typeof res?.error !== "undefined") {
                throw Error(res?.error?.message)
            }
            const {data} = res
            dispatch({type: "SET_AUTH", payload: data})
            toast.success(`Welcome ${data?.user?.username || data?.user?.email}`)

        } catch (e) {
            let errorMessage = e.response ? e.response.data.error.message : e.message
            toast.error(errorMessage)
            console.error(e)
        } finally {
            dispatch({type: "RESET_LOADING"})
        }
    }
    useEffect(() => {
        if (user) {
            user?.isFirstConnection ? router.push("/first-connection") :
                router.push("/discover")
        }
    }, [user]);
    return (
        <div className={style.container}>
            <span className={style.darkenFilter} style={{backgroundImage: `url(${defaultBackground.src})`}}/>
            <FormSignIn handleSubmit={handleSubmit} onChange={onInputChange} {...states}/>
        </div>
    );
};

export default SignIn;