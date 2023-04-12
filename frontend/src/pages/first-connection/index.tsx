import React, {useEffect} from 'react';
import FirstConnection from "@components/05-Pages/FirstConnection/FirstConnection";
import axiosInstance from "@config/axiosInstance";

const Index = () => {
    useEffect(() => {
        const fetchTest = async () => {
            try {
                const res = await axiosInstance.get("/auth/local/user")
                if (typeof res?.data === "undefined") {
                    throw Error("Cannot fetch")
                }
            } catch (e) {
                console.error(e)
            }


        }
        // fetchTest()
    }, []);
    return (
        <>
            <FirstConnection/>
        </>
    );
};

export default Index;