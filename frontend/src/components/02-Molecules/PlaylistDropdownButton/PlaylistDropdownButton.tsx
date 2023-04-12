import style from './PlaylistDropdownButton.module.scss';
import {useEffect, useRef, useState} from "react";
import Icon from "@components/01-Atoms/Icon/Icon";
import MyPlaylistsWithActions from "@components/03-Organisms/MyPlaylistsWithActions/MyPlaylistsWithActions";

const PlaylistDropdownButton = ({movieID, playlists, setPlaylists, fetchPlaylists}) => {
    const [isDropdownShow, setIsDropdownShow] = useState(false);
    const handleTriggerShow = () => setIsDropdownShow(prevState => !prevState)
    const handleOutsideClick = (e) => {
        if (!refBtn.current.contains(e.target)) {
            setIsDropdownShow(false)
        }
    }
    const refBtn = useRef(null)
    useEffect(() => {
        document.addEventListener("click", handleOutsideClick)
        return () => {
            document.removeEventListener("click", handleOutsideClick)
        }
    }, []);
    return (
        <div className={style.container}>
            <button className={style.showBtn}
                    ref={refBtn}
                    id={"playlistDropdown"}
                    title={"Playlists"}
                    onClick={handleTriggerShow}>
                <Icon icon={"faEllipsisVertical"} id={"playlistDropdownIcon"} classNames={style.icon}/>
            </button>
            <div className={`${style.content} ${isDropdownShow ? style.showContent : ""}`}>
                <MyPlaylistsWithActions playlists={playlists} setPlaylists={setPlaylists}
                                        fetchPlaylists={fetchPlaylists} movieID={movieID}/>
            </div>
        </div>
    );
};

export default PlaylistDropdownButton;