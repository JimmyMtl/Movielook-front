import style from './Profile.module.scss';
import Header from "@components/03-Organisms/Header/Header";
import FormProfile from "@components/03-Organisms/FormProfile/FormProfile";
import MyPlaylists from "@components/03-Organisms/MyPlaylists/MyPlaylists";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@reducer/Auth/AuthContext";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import axiosInstance from "@config/axiosInstance";

const Profile = () => {
    const router = useRouter()
    const {user, dispatch} = useContext(AuthContext)
    const [currentUser, setCurrentUser] = useState(user);
    useEffect(() => setCurrentUser(user), [user]);
    const onChange = (e) => setCurrentUser(prevState => ({...prevState, [e.target.id]: e.target.value}))
    const handleSubmit = async (e) => {
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
        } catch (e) {
            console.error(e.message)
            toast.error(e.message)
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