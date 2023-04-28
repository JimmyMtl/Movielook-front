import style from './PlaylistDropdownButton.module.scss';
import React, {useEffect, useRef, useState} from "react";
import Icon from "@components/01-Atoms/Icon/Icon";
import MyPlaylistsWithActions from "@components/03-Organisms/MyPlaylistsWithActions/MyPlaylistsWithActions";
import {Props} from "./PlaylistDropdownButtonType"

const PlaylistDropdownButton = ({movieID, playlists, setPlaylists, fetchPlaylists}: Props) => {
    const [isDropdownShow, setIsDropdownShow] = useState(false);
    const handleTriggerShow = () => setIsDropdownShow(prevState => !prevState)
    const refBtn = useRef<any | null>(null)
    const handleOutsideClick = (e: any) => {

        if (refBtn.current && !refBtn?.current.contains(e.target)) {
            setIsDropdownShow(false)
        }
    }
    useEffect(() => {
        document.addEventListener("click", handleOutsideClick)
        return () => {
            document.removeEventListener("click", handleOutsideClick)
        }
    }, []);
    return (
        <div className={style.container} ref={refBtn}
        >
            <button className={style.showBtn}
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