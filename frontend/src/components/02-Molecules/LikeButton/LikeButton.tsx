import style from './LikeButton.module.scss';
import Icon from "@components/01-Atoms/Icon/Icon";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@reducer/Auth/AuthContext";
import axiosInstance from "@config/axiosInstance";
import {toast} from "react-toastify";

const LikeButton = ({playlists, movieID, fetchPlaylists}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likePlaylist, setLikePlaylist] = useState({});
    const [likedMovies, setLikedMovies] = useState([]);
    const {user} = useContext(AuthContext)
    const fetchLikePlaylist = async () => {
        try {
            const liked = playlists?.filter((playlist) => playlist?.attributes?.type === "liked")
            if (liked.length > 0) {
                setLikePlaylist(liked[0])

                const likedPlaylistMovies = await axiosInstance.get(`/join-movie-playlists?filters[playlist][id][$eq]=${liked[0]?.id}`)
                if (typeof likedPlaylistMovies.data === "undefined") {
                    throw Error("Cannot fetch liked playlist movies")
                }
                const {data: likedPlaylistMoviesData} = likedPlaylistMovies?.data
                setLikedMovies(likedPlaylistMoviesData)
            }
        } catch (e) {
            const errorMessage = e.response ? e.response.data.error.message : e.message
            console.error(e)
            toast.error(errorMessage)
        }
    }
    useEffect(() => {
        fetchLikePlaylist()
    }, [movieID, user, isLiked, playlists]);
    useEffect(() => {
        setIsLiked(!!likedMovies.find(likedMovie => likedMovie?.attributes?.movie_id === movieID.toString()))
    }, [likedMovies]);
    const onClick = async () => {
        try {
            if (isLiked) {
                await axiosInstance.delete(`/join-movie-playlists/${likedMovies.find(likedMovie => likedMovie?.attributes?.movie_id === movieID.toString())?.id}`)
                // toast.success("Movie removed from liked playlist")
            } else {
                await axiosInstance.post(`/join-movie-playlists`, {
                    data: {
                        movie_id: movieID.toString(),
                        playlist: {id: likePlaylist?.id}
                    }
                })
                // toast.success("Movie added to liked playlist")
            }
            setIsLiked(prevState => !prevState)

        } catch (e) {
            const errorMessage = e.response ? e.response.data.error.message : e.message
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