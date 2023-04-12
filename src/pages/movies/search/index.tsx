import React from 'react';
import Search from "@components/05-Pages/Movies/Search/Search";
import axiosInstanceMovieDB from "@config/axiosInstanceMovieDB";
import Head from "next/head";
type Props = {
    results: Movie[],
    page: number,
    total_pages: number,
    total_results: number,
    hasQuery: boolean,
    genres: Genre[],
    languages: Language[]
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
type Genre = {
    id: number,
    name: string
}
type Language = {
    english_name: string,
    iso_639_1: string,
    name: string
}
const Index = ({results, page, total_pages, total_results, hasQuery, genres, languages}: Props) => {
    return (
        <>
            <Head>
                <title>Search Movie - NeoMovie</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Search hasQuery={hasQuery} results={results} page={page} total_pages={total_pages}
                    total_results={total_results} languages={languages}/>
        </>
    );
};

export const getServerSideProps = async ({query}: any) => {
    try {

        if (typeof query.api_key !== "undefined") {
            delete query.api_key
        }
        const api_key = "55bb5aeea2538b26cf848582959d4fc8"
        const hasQuery = (typeof query.query !== "undefined" && query.query !== "")
        const baseParams = {
            api_key
        }
        const paramsWithQuery = {
            ...baseParams,
            ...query
        }
        const popularMovieUrl = "/movie/popular?"
        const movieUrl = "/search/movie?"
        const url = hasQuery ? movieUrl : popularMovieUrl
        const resMovies = await axiosInstanceMovieDB.get(url + new URLSearchParams(paramsWithQuery))
        if (typeof resMovies.data === "undefined") {
            throw Error("Cannot fetch themoviedb API for movies")
        }

        const languagesUrl = "/configuration/languages?"
        const resLanguages = await axiosInstanceMovieDB.get(languagesUrl + new URLSearchParams(baseParams))

        if (typeof resLanguages.data === "undefined") {
            throw Error("Cannot fetch themoviedb API for languages")
        }
        console.log(resLanguages?.data)
        // console.log(hasQuery)
        return {
            props: {
                ...resMovies.data,
                hasQuery,
                languages: resLanguages.data
            }
        }
    } catch (e: any) {
        console.error(e)
        return {props: {}}
    }
}
export default Index;