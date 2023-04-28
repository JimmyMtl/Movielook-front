import style from './MovieCard.module.scss';
import Link from "next/link";
import {useRouter} from "next/router";

type Movie = {
    movie: {
        id: number,
        title: string,
        backdrop_path: string,
        poster_path: string
    }
}
const MovieCard = ({movie}: Movie) => {
    const router = useRouter()
    return (
        <Link href={`/movie/${movie?.id}?${new URLSearchParams(JSON.parse(JSON.stringify(router?.query)))}`}
              className={style.container}>
            <span className={style.splashCard}
                  style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie?.backdrop_path || movie?.poster_path})`}}/>
            <p className={style.title}>{movie?.title}</p>
        </Link>
    );
};

export default MovieCard;