import style from './MovieHeader.module.scss';
import Icon from "@components/01-Atoms/Icon/Icon";
import Image from "next/image";
import LikeButton from "@components/02-Molecules/LikeButton/LikeButton";
import SeenButton from "@components/02-Molecules/SeenButton/SeenButton";
import PlaylistDropdownButton from "@components/02-Molecules/PlaylistDropdownButton/PlaylistDropdownButton";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@reducer/Auth/AuthContext";
import {getAllPlaylists} from "@reducer/Playlist/PlaylistActions";
import {toast} from "react-toastify";

const MovieHeader = ({
                         movieID,
                         title,
                         genres,
                         voteAverage,
                         spokenLanguages,
                         releaseDate,
                         posterPath
                     }) => {
    const genresList = genres?.map((genre) => genre?.name).join(", ");
    const languagesList = spokenLanguages?.map((language) => language?.name).join(" - ");

    const {user, dispatch} = useContext(AuthContext)
    const [currentUser, setCurrentUser] = useState({});
    const [playlists, setPlaylists] = useState([]);
    const fetchPlaylists = async () => {
        dispatch({type: "SET_LOADING"})
        try {
            const res = await getAllPlaylists(user.id);
            if (typeof res?.data === "undefined") {
                throw Error("Cannot get playlists")
            }
            console.log('res', res)
            const {data} = res
            setPlaylists(data.data)
        } catch (e) {
            let errorMessage = e.response ? e.response.data.error.message : e.message
            toast.error(errorMessage)
            console.error(e)
        } finally {
            dispatch({type: "RESET_LOADING"})
        }
    }
    useEffect(() => {
        if (user) {
            setCurrentUser(user)
            fetchPlaylists()
        }
    }, [user]);
    return (
        <div className={style.container}>
            <div className={style.posterContainer}>
                <Image src={posterPath}
                       width={0} height={0}
                       sizes={"100vw"}
                       className={style.poster} alt={"logo"}
                />
            </div>
            <div className={style.infoContainer}>
                <h1>{title}</h1>

                <p className={style.genres}>{genresList}</p>
                <div className={style.alternateInfos}>
                    <span>{releaseDate}</span>
                    <span className={style.averageWrapper}><Icon icon="faStar"
                                                                 classNames={style.star}/>{voteAverage}</span>
                </div>
                <div className={style.langActionsWrapper}>
                    <span className={style.languages}>{languagesList}</span>
                    {currentUser ?
                        <div className={style.actionsContainer}>
                            <SeenButton movieID={movieID} playlists={playlists} fetchPlaylists={fetchPlaylists}/>
                            <LikeButton movieID={movieID} playlists={playlists} fetchPlaylists={fetchPlaylists}/>
                            <PlaylistDropdownButton movieID={movieID} playlists={playlists}
                                                    fetchPlaylists={fetchPlaylists} setPlaylists={setPlaylists}/>
                        </div>
                        : null}

                </div>
            </div>
        </div>
    );
};

export default MovieHeader;