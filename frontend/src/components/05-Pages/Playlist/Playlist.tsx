import style from './Playlist.module.scss';
import Header from "@components/03-Organisms/Header/Header";
import PlaylistMovieLink from "@components/02-Molecules/PlaylistMovieLink/PlaylistMovieLink";
import Link from "next/link";

const Playlist = ({playlist, moviesList}) => {
    return (
        <div className={style.container}>
            <Header/>

            <div className={style.playlistMovies}>
                <h1>{playlist?.attributes?.name}</h1>
                {moviesList?.length === 0 ? <Link href={"/movies/search"} className={style.emptyPlaylist}>Playlist is empty, add some movies</Link> :
                    moviesList?.map((movie, idx) => (
                        <PlaylistMovieLink movie={movie} key={idx}/>
                    ))
                }
            </div>
        </div>
    );
};

export default Playlist;