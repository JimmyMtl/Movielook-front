import style from './Profile.module.scss';
import Header from "@components/03-Organisms/Header/Header";
import FormProfile from "@components/03-Organisms/FormProfile/FormProfile";
import MyPlaylists from "@components/03-Organisms/MyPlaylists/MyPlaylists";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "@reducer/Auth/AuthContext";
import {toast} from "react-toastify";
import axiosInstance from "@config/axiosInstance";
import {user} from "./ProfileType"
const Profile = () => {
    const {user, dispatch} = useContext(AuthContext)
    const [currentUser, setCurrentUser] = useState<user>(user);
    useEffect(() => setCurrentUser(user), [user]);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setCurrentUser(prevState => ({
        ...prevState,
        [e.target.id]: e.target.value
    }))
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({type: "SET_LOADING"})
        try {
            const res = await axiosInstance.put(`/users/${currentUser?.id}`,
                {
                    ...currentUser,
                });
            if (typeof res?.data === "undefined") {
                throw Error("Cannot update user")
            }
            const {data} = res
            dispatch({type: "UPDATE_USER", payload: data})
            toast.success("User updated")
        } catch (e: any) {
            console.error(e?.message)
            toast.error(e?.message)
        } finally {
            dispatch({type: "RESET_LOADING"})
        }
    }
    return (
        <div className={style.container}>
            <Header/>
            <FormProfile username={currentUser?.username} email={currentUser?.email}
                         preferedGenre={currentUser?.preferedGenre} onChange={onChange}
                         handleSubmit={handleSubmit}/>
            <div className={style.containerContent}>
                <MyPlaylists/>
            </div>
        </div>
    );
};

export default Profile;