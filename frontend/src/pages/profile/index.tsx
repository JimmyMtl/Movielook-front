import React, {useContext, useEffect} from 'react';
import Profile from "@components/05-Pages/Profile/Profile";
import {AuthContext} from "@reducer/Auth/AuthContext";
import {useRouter} from "next/router";
import Head from "next/head";

const Index = (props) => {
    const {user} = useContext(AuthContext)
    const router = useRouter()
    useEffect(() => {
        if (!user) {
            router.push("/auth/signin")
        }
    }, [user]);
    return (
        <>

            <Head>
                <title>{user?.username || user?.email} - Profile</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Profile {...props}/>
        </>
    );
};

export default Index;
