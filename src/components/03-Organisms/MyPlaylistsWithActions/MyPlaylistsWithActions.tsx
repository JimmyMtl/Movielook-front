import style from './MyPlaylistsWithActions.module.scss';
import NewPlaylistBtn from "@components/02-Molecules/NewPlaylistBtn/NewPlaylistBtn";
import PlaylistButton from "@components/02-Molecules/PlaylistButton/PlaylistButton";
import {Props} from "./MyPlatlistsWithActionsType";
const MyPlaylistsWithActions = ({movieID, setPlaylists, playlists, fetchPlaylists}: Props) => {
    return (
        <ul className={style.container}>
            <h4>My playlists</h4>
            {playlists.map((playlist, idx) => (
                <PlaylistButton key={idx} playlist={playlist} fetchPlaylists={fetchPlaylists} movieID={movieID}/>)
            )}
            <NewPlaylistBtn setPlaylists={setPlaylists}/>
        </ul>
    );
};

export default MyPlaylistsWithActions;