import style from './LikeButton.module.scss';
import Icon from "@components/01-Atoms/Icon/Icon";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@reducer/Auth/AuthContext";
import axiosInstance from "@config/axiosInstance";
import {toast} from "react-toastify";

type Props = {
    playlists:
        {
            id: number | string,
            attributes: {
                type: string
            }
        }[],
    movieID: number | string,
    fetchPlaylists: () => void
}
type likedMovie = {
    id: number | string,
    attributes: {
        movie_id: number | string,
        playlist: {
            id: number | string,
        }
    }
}
type likePlaylist = {
    id: number | string,
    attributes: {
        type: string
    }
}
const LikeButton = ({playlists, movieID, fetchPlaylists}: Props) => {
    const [isLiked, setIsLiked] = useState<likedMovie | null>(null);
    const [likePlaylist, setLikePlaylist] = useState<likePlaylist | null>(null);
    const [likedMovies, setLikedMovies] = useState<likedMovie[] | []>([]);
    const {user} = useContext(AuthContext)
    const fetchLikePlaylist = async () => {
        try {
            const liked = playlists?.filter((playlist) => playlist?.attributes?.type === "liked")
            if (liked && liked.length > 0) {
                setLikePlaylist(liked[0])

                const likedPlaylistMovies = await axiosInstance.get(`/join-movie-playlists?filters[playlist][id][$eq]=${liked[0]?.id}`)
                if (typeof likedPlaylistMovies.data === "undefined") {
                    throw Error("Cannot fetch liked playlist movies")
                }
                const {data: likedPlaylistMoviesData} = likedPlaylistMovies?.data
                setLikedMovies(likedPlaylistMoviesData)
            }
        } catch (e: any) {
            const errorMessage = e?.response ? e?.response?.data?.error?.message : e?.message
            console.error(e)
            toast.error(errorMessage)
        }
    }
    useEffect(() => {
        fetchLikePlaylist()
    }, [movieID, user, playlists]);
    useEffect(() => {
        if (!likedMovies) return
        // @ts-ignore
        setIsLiked(likedMovies.find((likedMovie): boolean => likedMovie?.attributes?.movie_id === movieID.toString()) || null)
    }, [likedMovies]);
    const onClick = async () => {
        try {
            if (isLiked) {
                await axiosInstance.delete(`/join-movie-playlists/${isLiked?.id}`)
            } else {
                await axiosInstance.post(`/join-movie-playlists`, {
                    data: {
                        movie_id: movieID.toString(),
                        playlist: {id: likePlaylist?.id}
                    }
                })
            }
            fetchPlaylists()

        } catch (e: any) {
            const errorMessage = e?.response ? e?.response?.data?.error?.message : e?.message
            console.error(e)
            toast.error(errorMessage)
        } finally {
            fetchPlaylists()
        }
    }
    return (
        <button className={`${style.container} ${isLiked ? style.liked : style.notLiked}`}
                onClick={onClick}
                title={"Mark as liked"}
        >
            <Icon icon={"faHeart"} classNames={style.icon}/>
        </button>
    );
};

export default LikeButton;