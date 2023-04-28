import style from './NewPlaylistBtn.module.scss';
import React, {ChangeEvent, useContext, useState} from "react";
import {AuthContext} from "@reducer/Auth/AuthContext";
import Icon from "@components/01-Atoms/Icon/Icon";
import Modal from "@components/02-Molecules/Modal/Modal";
import InputGroup from "@components/02-Molecules/InputGroup/InputGroup";
import {toast} from "react-toastify";
import {createNewPlaylist} from "@reducer/Playlist/PlaylistActions";
import {prevStateType, Props} from "./NewPlaylistType"

const NewPlaylistBtn = ({setPlaylists}: Props) => {
    const {user, dispatch} = useContext(AuthContext)
    const [playlistName, setPlaylistName] = useState("");
    const ShowButtonContent = <>
        <span>Create new playlist</span><Icon
        icon={"faPlus"}/>
    </>
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setPlaylistName(e.target.value)


    const onValidation = async () => {
        try {
            dispatch({type: "SET_LOADING"})
            const newPlaylist = await createNewPlaylist(playlistName, user)
            if (typeof newPlaylist?.data === "undefined") {
                throw Error("Cannot create new playlist")
            }
            setPlaylists((prevState: prevStateType) => [...prevState, newPlaylist.data.data])
            toast.success("Playlist created")
        } catch (e: any) {
            let errorMessage = e?.response ? e?.response?.data?.error?.message : e.message
            toast.error(errorMessage)
            console.error(e)
        } finally {
            setPlaylistName("")
            dispatch({type: "RESET_LOADING"})
        }
    }
    return (
        <Modal onValidation={onValidation} titleBaseBtn={ShowButtonContent} classNameBaseBtn={style.defaultBtn}>
            <InputGroup name={"name"} id={"name"} htmlFor={"name"} label={"Name of your new playlist"}
                        placeholder={"To look.."} value={playlistName} type={"text"} required={true}
                        onChange={onChange}/>
        </Modal>
    );
};

export default NewPlaylistBtn;