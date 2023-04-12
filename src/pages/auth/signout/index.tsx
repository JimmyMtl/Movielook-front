import React, {useContext, useEffect} from 'react';
import {AuthContext} from "@reducer/Auth/AuthContext";
import {useRouter} from "next/router";

const Index = () => {
    const {dispatch} = useContext(AuthContext)
    const router = useRouter()
    useEffect(() => {
        dispatch({type: "SIGN_OUT"})
        // TODO : Vérifier si le header est bien supprimé
        router.push("/auth/signin")
    }, []);
    return (
        <>
        </>
    );
};

export default Index;