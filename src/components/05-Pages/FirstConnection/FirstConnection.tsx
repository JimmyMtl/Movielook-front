import style from './FirstConnection.module.scss';
import {genreList} from "@components/00-Base/GenreList/genreList";
import Icon from "@components/01-Atoms/Icon/Icon";
import React, {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {AuthContext} from "@reducer/Auth/AuthContext";
import axiosInstance from "@config/axiosInstance";
import {toast} from "react-toastify";

const FirstConnection = () => {
    const router = useRouter()
    const {user, dispatch} = useContext(AuthContext)
    const [currentUser, setCurrentUser] = useState(user);
    const [selectedGenre, setSelectedGenre] = useState("");


    const handleSelectGenre = (genre: string) => setSelectedGenre(genre)
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (selectedGenre !== "") {
            try {
                const resUpdateUser = await axiosInstance.put(`/users/${currentUser?.id}`,
                    {
                        // ...currentUser,
                        preferedGenre: selectedGenre,
                        isFirstConnection: false
                    });
                if (typeof resUpdateUser?.data === "undefined") {
                    throw Error("Cannot update user")
                }
                const {data} = resUpdateUser
                console.log(data)
                dispatch({type: "UPDATE_USER", payload: data})
                toast.success("User updated")
            } catch (e: any) {
                console.error(e?.message)
                toast.error(e?.message)
            }
        } else {
            toast.error("Please select a genre")
        }
    }
    useEffect(() => {
        setCurrentUser(user)
        if (!user?.isFirstConnection) {
            router.push("/profile")
        }

    }, [user]);
    return (
        <form onSubmit={onSubmit} className={style.container}>
            <h3>Tell us about the movie type you like</h3>
            <div className={style.genreList}>
                {genreList.map((genre, idx) => (
                    <button type={"button"} key={idx}
                            className={`${style.genreBtn} ${genre.genre === selectedGenre ? style.genreSelected : ""}`}
                            onClick={() => handleSelectGenre(genre.genre)}
                    >
                        <Icon icon={genre.icon} classNames={style.genreIcon}/>
                        <span>{genre.genre}</span>
                    </button>))}
            </div>
            <button type={"submit"} className={style.nextBtn}>Next</button>
        </form>
    );
};

export default FirstConnection;