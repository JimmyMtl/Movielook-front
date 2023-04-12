import style from './PlaylistMovieLink.module.scss';
import {useEffect, useState} from "react";
import axiosInstanceMovieDB from "@config/axiosInstanceMovieDB";
import {toast} from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import {movieFromAPI, Props} from "./PlaylistMovieLinkType"

const PlaylistMovieLink = ({movie}: Props) => {
    const [movieFromAPI, setMovieFromAPI] = useState<movieFromAPI | null>(null);
    const fetchMovie = async () => {
        try {

            const res = await axiosInstanceMovieDB.get(`/movie/${movie?.attributes?.movie_id}?api_key=55bb5aeea2538b26cf848582959d4fc8`)
            if (typeof res.data === "undefined") {
                throw Error("Cannot fetch movie")
            }
            setMovieFromAPI(res.data)
            console.log(res.data)
        } catch (e: any) {
            const errorMessage = e?.response ? e?.response?.data?.error?.message : e?.message
            console.error(e)
            toast.error(errorMessage)
        }
    }
    const posterPath = `https://image.tmdb.org/t/p/w500${movieFromAPI?.poster_path}`

    useEffect(() => {
        if (movie) {
            fetchMovie()
        }
    }, [movie]);
    return (
        <Link className={style.container} href={`/movie/${movieFromAPI?.id || movie?.attributes?.movie_id}`}>
            {/*{JSON.stringify(movieFromAPI)}*/}
            <span>{movieFromAPI?.title}</span>
            <div className={style.posterContainer}>
                <Image src={posterPath}
                       width={0} height={0}
                       sizes={"100vw"}
                       className={style.poster} alt={"logo"}
                />
            </div>
        </Link>
    );
};

export default PlaylistMovieLink;