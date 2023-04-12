import React, {useContext, useEffect, useState} from 'react';
import axiosInstanceMovieDB from "@config/axiosInstanceMovieDB";
import Head from "next/head";
import Discover from "@components/05-Pages/Movies/Discover/Discover";
import {AuthContext} from "@reducer/Auth/AuthContext";
import {useRouter} from "next/router";
import {genreList} from "@components/00-Base/GenreList/genreList";

type datas = {
    results: Movie[],
    page: number,
    total_pages: number,
    total_results: number,
}
type Movie = {
    id: number,
    title: string,
    poster_path: string,
    release_date: string,
    vote_average: number,
    overview: string,
    genre_ids: number[],
    backdrop_path: string,
}
const Index = () => {
    const {user, dispatch} = useContext(AuthContext);
    const router = useRouter();
    const [datas, setDatas] = useState<datas>({
        results: [],
        page: 0,
        total_pages: 0,
        total_results: 0,
    });
    const fetchDiscoverMovies = async () => {
        try {

            dispatch({type: "SET_LOADING"})
            const api_key = "55bb5aeea2538b26cf848582959d4fc8"
            console.log(genreList?.find(genre => genre.genre === user.preferedGenre)?.id)
            const baseParams = {
                api_key,
                with_genres: genreList?.find(genre => genre.genre === user.preferedGenre)?.id,
                ...router.query
            }
            // console.log(query)
            const discoverMovieUrl = "/discover/movie?"
            const resMovies = await axiosInstanceMovieDB.get(discoverMovieUrl + new URLSearchParams(JSON.parse(JSON.stringify(baseParams))))
            if (typeof resMovies?.data === "undefined") {
                throw Error("Cannot fetch themoviedb API for discover movies")
            }
            console.log('resMovies', resMovies.data)
            setDatas(resMovies?.data)
        } catch (e) {
            console.error(e)
        } finally {
            dispatch({type: "RESET_LOADING"})
        }
    }
    useEffect(() => {

        fetchDiscoverMovies()
    }, [user, router]);
    return (
        <>
            <Head>
                <title>Discover {user?.preferedGenre} - NeoMovie</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Discover hasQuery={true} {...datas}/>
        </>
    );
};


export default Index;
