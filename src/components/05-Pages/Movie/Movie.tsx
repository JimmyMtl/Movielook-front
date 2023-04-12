import style from './Movie.module.scss';
import Header from "@components/03-Organisms/Header/Header";
import defaultMovieBackSplash from "@components/00-Base/defaultMovieBackSplash.jpg"
import MovieHeader from "@components/03-Organisms/MovieHeader/MovieHeader";
import YoutubeVideosList from "@components/02-Molecules/YoutubeVideosList/YoutubeVideosList";
import {Props} from "./MovieType";
const Movie = ({
                   id,
                   title,
                   genres,
                   vote_average,
                   status,
                   spoken_languages,
                   release_date,
                   production_companies,
                   backdrop_path,
                   poster_path,
                   overview,
                   budget,
                   videos,
                   ...props
               }: Props) => {
    const backdropURL = backdrop_path ? `https://image.tmdb.org/t/p/original${backdrop_path}` : defaultMovieBackSplash.src
    const posterPath = `https://image.tmdb.org/t/p/w500${poster_path}`
    return (
        <div className={style.container}>
            <Header imgSrc={backdropURL}/>
            <MovieHeader movieID={id} title={title} genres={genres} releaseDate={release_date}
                         spokenLanguages={spoken_languages}
                         voteAverage={vote_average}
                         posterPath={posterPath}/>
            <div className={style.contentWrapper}>
                <p>{overview}</p>
                {videos?.length > 0 ? <YoutubeVideosList videos={videos}/> : null}
            </div>
        </div>
    );
};

export default Movie;