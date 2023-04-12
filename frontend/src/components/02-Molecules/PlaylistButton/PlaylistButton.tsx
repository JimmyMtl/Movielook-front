import style from './PlaylistButton.module.scss';
import Icon from "@components/01-Atoms/Icon/Icon";
import {useEffect, useState} from "react";
import axiosInstance from "@config/axiosInstance";
import {toast} from "react-toastify";
import Link from "next/link";

const PlaylistButton = ({playlist, movieID, fetchPlaylists}) => {
    const [isAlreadyIn, setIsAlreadyIn] = useState(false);
    const fetchListMoviesIn = async () => {
        try {
            const listMovies = await axiosInstance.get(`/join-movie-playlists?filters[playlist][id][$eq]=${playlist?.id}`)
            if (typeof listMovies.data === "undefined") {
                throw Error("Cannot get liked movies")
            }
            const {data} = listMovies?.data
            setIsAlreadyIn(data.find((movieInPlaylist) => movieInPlaylist?.attributes?.movie_id === movieID?.toString()))
        } catch (e) {
            const errorMessage = e.response ? e.response.data.error.message : e.message
            console.error(e)
            toast.error(errorMessage)
        }
    }
    useEffect(() => {
        fetchListMoviesIn()
    }, [movieID, playlist]);
    const handleClick = async () => {
        try {
            if (isAlreadyIn) {
                await axiosInstance.delete(`/join-movie-playlists/${isAlreadyIn?.id}`)
            } else {
                await axiosInstance.post(`/join-movie-playlists`, {
                    "data": {
                        "movie_id": movieID.toString(),
                        "playlist": {
                            id: playlist?.id
                        }
                    }
                })
            }
        } catch (e) {
            const errorMessage = e.response ? e.response.data.error.message : e.message
            console.error(e)
            toast.error(errorMessage)
        } finally {
            fetchListMoviesIn()
            fetchPlaylists()
        }
    }
    return (
        <div className={style.container}>
            <Link href={`/playlists/${playlist?.id}`} className={style.link}>{playlist?.attributes?.name}</Link>
            <button type={"button"} title={isAlreadyIn ? "Remove from playlist" : "Add to playlist"}
                    className={style.btn} onClick={handleClick}>
                <span>
                    <Icon icon={isAlreadyIn ? "faMinus" : "faPlus"} classNames={style.icon}/>
                </span>
            </button>
        </div>
    );
};

export default PlaylistButton;