import style from './SeenButton.module.scss';
import {useContext, useEffect, useState} from "react";
import Icon from "@components/01-Atoms/Icon/Icon";
import {AuthContext} from "@reducer/Auth/AuthContext";
import axiosInstance from "@config/axiosInstance";
import {toast} from "react-toastify";
import {Props, seenMovie, seenPlaylist} from "./SeenButtonType"

const SeenButton = ({movieID, playlists, fetchPlaylists}: Props) => {
    const [isSeen, setIsSeen] = useState<seenMovie | null>(null);
    const [seenPlaylist, setSeenPlaylist] = useState<seenPlaylist | null>(null);
    const [seenMovies, setSeenMovies] = useState<seenMovie[] | null>(null);
    const {user} = useContext(AuthContext)
    const fetchSeenPlaylist = async () => {
        try {
            const seen = playlists?.filter((playlist) => playlist?.attributes?.type === "seen")
            if (seen && seen.length > 0) {
                setSeenPlaylist(seen[0])

                const seenPlaylistMovies = await axiosInstance.get(`/join-movie-playlists?filters[playlist][id][$eq]=${seen[0]?.id}`)
                if (typeof seenPlaylistMovies.data === "undefined") {
                    throw Error("Cannot fetch seen playlist movies")
                }
                const {data: seenPlaylistMoviesData} = seenPlaylistMovies?.data
                setSeenMovies(seenPlaylistMoviesData)
            }
        } catch (e: any) {
            const errorMessage = e?.response ? e?.response?.data?.error?.message : e?.message
            console.error(e)
            toast.error(errorMessage)
        }

    }
    useEffect(() => {
        fetchSeenPlaylist()
    }, [movieID, user, playlists]);
    useEffect(() => {
        // @ts-ignore
        setIsSeen(seenMovies?.find((seenMovie: seenMovie) => seenMovie?.attributes?.movie_id === movieID.toString()))
    }, [seenMovies]);
    const onClick = async () => {
        try {
            if (isSeen) {
                await axiosInstance.delete(`/join-movie-playlists/${isSeen?.id}`)
            } else {
                await axiosInstance.post(`/join-movie-playlists`, {
                    data: {
                        movie_id: movieID.toString(),
                        playlist: {id: seenPlaylist?.id}
                    }
                })
            }

        } catch (e: any) {
            const errorMessage = e?.response ? e?.response?.data?.error?.message : e?.message
            console.error(e)
            toast.error(errorMessage)
        } finally {
            fetchPlaylists()
        }
    }
    return (
        <button className={`${style.container}  ${isSeen ? style.seen : style.notSeen}`}
                onClick={onClick}
                title={"Mark as seen"}
        >
            <Icon icon={"faEye"} classNames={style.icon}/>
        </button>
    );
};

export default SeenButton;