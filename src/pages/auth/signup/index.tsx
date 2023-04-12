import React from 'react';
import Head from "next/head";
import SignUp from "@components/05-Pages/Auth/SignUp/SignUp";

const Index = () => {
    return (
        <>
            <Head>
                <title>Sign Up - NeoMovie</title>
                <meta name="description" content="SignUp on NeoMovie"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <SignUp/>
        </>
    );
};

export default Index;