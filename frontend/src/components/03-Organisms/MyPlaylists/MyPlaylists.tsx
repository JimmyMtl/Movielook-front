import style from './MyPlaylists.module.scss';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@reducer/Auth/AuthContext";
import {toast} from "react-toastify";
import {getAllPlaylists} from "@reducer/Playlist/PlaylistActions";
import PlaylistLink from "@components/02-Molecules/PlaylistLink/PlaylistLink";
import NewPlaylistBtn from "@components/02-Molecules/NewPlaylistBtn/NewPlaylistBtn";

const MyPlaylists = () => {
    const {user, dispatch} = useContext(AuthContext)
    const [playlists, setPlaylists] = useState([]);
    useEffect(() => {
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
        fetchPlaylists()
    }, []);
    return (
        <div className={style.container}>
            <h4>My playlists</h4>
            {playlists.map((playlist, idx) => (
                <PlaylistLink key={idx} playlist={playlist}/>)
            )}
            <NewPlaylistBtn playlists={playlists} setPlaylists={setPlaylists}/>
        </div>
    );
};

export default MyPlaylists;