import style from './MovieCard.module.scss';
import Link from "next/link";
import {useRouter} from "next/router";

const MovieCard = ({movie}) => {
    const router = useRouter()
    return (
        <Link href={`/movie/${movie?.id}?${new URLSearchParams(router?.query)}`} className={style.container}>
            <span className={style.splashCard}
                  style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie?.backdrop_path || movie?.poster_path})`}}/>
            <p className={style.title}>{movie?.title}</p>
        </Link>
    );
};

export default MovieCard;