import style from './MovieCard.module.scss';
import Link from "next/link";
import {useRouter} from "next/router";
import Image from "next/image";
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
            <Image className={style.splashCard} width={300} height={300} alt={movie.title} src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path || movie?.poster_path}`}/>
            <p className={style.title}>{movie?.title}</p>
        </Link>
    );
};

export default MovieCard;