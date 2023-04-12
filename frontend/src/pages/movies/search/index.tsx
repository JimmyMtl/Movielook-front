import React from 'react';
import Search from "@components/05-Pages/Movies/Search/Search";
import axiosInstanceMovieDB from "@config/axiosInstanceMovieDB";
import Head from "next/head";

const Index = ({results, page, total_pages, total_results, hasQuery, genres, languages}) => {
    return (
        <>
            <Head>
                <title>Search Movie - NeoMovie</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Search hasQuery={hasQuery} results={results} page={page} total_pages={total_pages}
                    total_results={total_results} genres={genres} languages={languages}/>
        </>
    );
};

export const getServerSideProps = async ({query}) => {
    try {

        if (typeof query.api_key !== "undefined") {
            delete query.api_key
        }
        const api_key = "55bb5aeea2538b26cf848582959d4fc8"
        const hasQuery = (typeof query.query !== "undefined" && query.query !== "")
        const baseParams = {
            api_key
        }
        console.log(query)
        const paramsWithQuery = {
            ...baseParams,
            ...query
        }
        const popularMovieUrl = "/movie/popular?"
        const movieUrl = "/search/movie?"
        const url = hasQuery ? movieUrl : popularMovieUrl
        console.log(url + new URLSearchParams(paramsWithQuery))
        const resMovies = await axiosInstanceMovieDB.get(url + new URLSearchParams(paramsWithQuery))
        console.log(resMovies.data)
        if (typeof resMovies.data === "undefined") {
            throw Error("Cannot fetch themoviedb API for movies")
        }

        const genresUrl = "/genre/movie/list?" + new URLSearchParams(baseParams)
        const resGenres = await axiosInstanceMovieDB.get(genresUrl)
        if (typeof resGenres.data === "undefined") {
            throw Error("Cannot fetch themoviedb API for genres")
        }
        const genres = resGenres?.data?.genres
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
                genres,
                languages: resLanguages.data
            }
        }
    } catch (e) {
        console.error(e)
        return {props: {}}
    }
}
export default Index;