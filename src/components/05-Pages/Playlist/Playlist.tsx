import style from './Playlist.module.scss';
import Header from "@components/03-Organisms/Header/Header";
import PlaylistMovieLink from "@components/02-Molecules/PlaylistMovieLink/PlaylistMovieLink";
import Link from "next/link";
import {PlaylistProps} from "./PlaylistType"
import {toast} from "react-toastify";
import {deletePlaylist} from "@reducer/Playlist/PlaylistActions";
import {useRouter} from "next/router";

const Playlist = ({playlist, moviesList}: PlaylistProps) => {
    const router = useRouter()
    const onCLick = async () => {
        try {
            const res = await deletePlaylist(playlist.id);
            if (res?.status !== 200) {
                throw Error("Cannot delete playlist")
            }
            router.push("/profile")
        } catch (e: any) {
            let errorMessage = e?.response ? e?.response?.data?.error?.message : e?.message
            toast.error(errorMessage)
            console.error(e)
        }
    }
    return (
        <div className={style.container}>
            <Header/>

            <div className={style.playlistMovies}>
                <h1>{playlist?.attributes?.name}</h1>
                {moviesList?.length === 0 ?
                    <Link href={"/movies/search"} className={style.emptyPlaylist}>Playlist is empty, add some
                        movies</Link> :
                    moviesList?.map((movie, idx) => (
                        <PlaylistMovieLink movie={movie} key={idx}/>
                    ))
                }
                {playlist?.attributes?.type === "other" ?
                    <button onClick={onCLick} className={style.deleteBtn}>Delete this playlist</button> : null}
            </div>
        </div>
    );
};

export default Playlist;