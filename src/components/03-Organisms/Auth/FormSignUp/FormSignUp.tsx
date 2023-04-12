import style from '../CommonForm.module.scss';
import InputGroup from "@components/02-Molecules/InputGroup/InputGroup";
import Link from "next/link";
import React, {useContext, useEffect, useState} from "react";
import {signUp} from "@reducer/Auth/AuthActions";
import {toast} from "react-toastify";
import {AuthContext} from "@reducer/Auth/AuthContext";
import {useRouter} from "next/router";
import {states} from "../AuthType";

const FormSignUp = () => {
    const router = useRouter()
    const {dispatch, user} = useContext(AuthContext)
    const [states, setStates] = useState<states>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        rememberme: false
    });
    const {username, email, password, confirmPassword} = states
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setStates(prevState => ({
        ...prevState,
        [e.target.id]: e.target.value
    }))
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({type: "SET_LOADING"})
        try {
            // TODO: Change any type
            const res: any = await signUp({...states, identifier: states?.email})
            console.log('res', res)
            if (typeof res?.error !== "undefined") {
                throw Error(res?.error?.message)
            }
            const {data} = res
            dispatch({type: "SET_AUTH", payload: data})
            toast.success(`Welcome ${data?.user?.username || data?.user?.email}`)

        } catch (e: any) {
            let errorMessage = e?.response ? e?.response?.data?.error?.message : e?.message
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
        <form onSubmit={handleSubmit} className={style.container}>
            <h1 className={style.title}>Sign Up</h1>
            <InputGroup htmlFor={"username"}
                        value={username} onChange={onChange}
                        id={"username"} name={"username"}
                        label={"Username"}
                        placeholder={"Your username"}
                        required={true}
            />
            <InputGroup htmlFor={"email"}
                        value={email} onChange={onChange}
                        id={"email"} name={"email"}
                        label={"Email"} type={"email"}
                        placeholder={"Your email"}
                        required={true}
            />
            <InputGroup htmlFor={"password"}
                        value={password} onChange={onChange}
                        id={"password"} name={"password"}
                        label={"Password"} type={"password"}
                        placeholder={"Your password"}
                        required={true}
            />
            <InputGroup htmlFor={"confirmpassword"}
                        value={confirmPassword} onChange={onChange}
                        id={"confirmpassword"} name={"confirmpassword"}
                        label={"Confirm password"}
                        placeholder={"Confirm your password"}
                        type={"password"}
                        required={true}
            />
            <button className={style.submitBtn} type={"submit"}>Register</button>
            <p>Already registered? <Link href={"/auth/signin"}>Sign In</Link></p>
        </form>
    );
};

export default FormSignUp;