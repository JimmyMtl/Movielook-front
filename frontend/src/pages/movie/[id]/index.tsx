import React from 'react';
import axios from "axios";
import Movie from "@components/05-Pages/Movie/Movie";
import Head from "next/head";
import axiosInstanceMovieDB from "@config/axiosInstanceMovieDB";

const Index = (props) => {
    return (
        <>

            <Head>
                <title>{props?.title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Movie {...props}/>
        </>
    );
};

export default Index;

export const getServerSideProps = async ({query}) => {
    try {

        const params = {
            api_key: "55bb5aeea2538b26cf848582959d4fc8",
            language: query?.language || "en"
        }
        const urlMovie = `/movie/${query?.id}?` + new URLSearchParams(params)
        const getMovie = await axiosInstanceMovieDB.get(urlMovie)
        if (typeof getMovie.data === "undefined") {
            throw Error("Cannot fetch themoviedb API for movie")
        }
        // console.log(getMovie.data)
        const urlVideo = `/movie/${query?.id}/videos?` + new URLSearchParams(params)
        const getVideos = await axiosInstanceMovieDB.get(urlVideo)
        if (typeof getVideos.data === "undefined") {
            throw Error("Cannot fetch themoviedb API for videos")
        }

        return {
            props: {
                ...getMovie.data,
                videos: getVideos.data.results
            }
        }
    } catch (e) {
        console.error(e)
        return {
            redirect: {
                permanent: false,
                destination: "/404"
            }
        }
    }
}
