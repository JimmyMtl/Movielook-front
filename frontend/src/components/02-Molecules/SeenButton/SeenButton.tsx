import style from './SeenButton.module.scss';
import {useContext, useEffect, useState} from "react";
import Icon from "@components/01-Atoms/Icon/Icon";
import {AuthContext} from "@reducer/Auth/AuthContext";
import axiosInstance from "@config/axiosInstance";
import {toast} from "react-toastify";

const SeenButton = ({movieID, playlists, fetchPlaylists}) => {
    const [isSeen, setIsSeen] = useState(false);
    const [seenPlaylist, setSeenPlaylist] = useState({});
    const [seenMovies, setSeenMovies] = useState([]);
    const {user} = useContext(AuthContext)
    const fetchSeenPlaylist = async () => {
        try {
            const seen = playlists?.filter((playlist) => playlist?.attributes?.type === "seen")
            if (seen.length > 0) {
                console.log('seen', playlists, seen[0]?.id)
                setSeenPlaylist(seen[0])

                const seenPlaylistMovies = await axiosInstance.get(`/join-movie-playlists?filters[playlist][id][$eq]=${seen[0]?.id}`)
                if (typeof seenPlaylistMovies.data === "undefined") {
                    throw Error("Cannot fetch seen playlist movies")
                }
                const {data: seenPlaylistMoviesData} = seenPlaylistMovies?.data
                setSeenMovies(seenPlaylistMoviesData)
            }
        } catch (e) {
            const errorMessage = e.response ? e.response.data.error.message : e.message
            console.error(e)
            toast.error(errorMessage)
        }

    }
    useEffect(() => {
        fetchSeenPlaylist()
    }, [movieID, user, isSeen, playlists]);
    useEffect(() => {
        setIsSeen(!!seenMovies.find(seenMovie => seenMovie?.attributes?.movie_id === movieID.toString()))
    }, [seenMovies]);
    const onClick = async () => {
        try {
            if (isSeen) {
                await axiosInstance.delete(`/join-movie-playlists/${seenMovies.find(seenMovie => seenMovie?.attributes?.movie_id === movieID.toString())?.id}`)
                // toast.success("Movie removed from seen playlist")
            } else {
                await axiosInstance.post(`/join-movie-playlists`, {
                    data: {
                        movie_id: movieID.toString(),
                        playlist: {id: seenPlaylist?.id}
                    }
                })
                // toast.success("Movie added to seen playlist")
            }
            setIsSeen(prevState => !prevState)

        } catch (e) {
            const errorMessage = e.response ? e.response.data.error.message : e.message
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