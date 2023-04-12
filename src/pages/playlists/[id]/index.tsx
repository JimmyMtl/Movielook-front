import React, {useContext, useEffect, useState} from 'react';
import axiosInstance from "@config/axiosInstance";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import {AuthContext} from "@reducer/Auth/AuthContext";
import Playlist from "@components/05-Pages/Playlist/Playlist";
import Head from "next/head";

type PlaylistType = {
    id: number,
    attributes: {
        name: string,
        type: string,
    }
}
const Index = () => {
    const router = useRouter()
    const {id} = router.query
    const {dispatch} = useContext(AuthContext)
    const [playlist, setPlaylist] = useState<PlaylistType>({
        id: 0,
        attributes: {
            name: "",
            type: "",
        }
    });
    const [moviesPlaylist, setMoviesPlaylist] = useState([]);

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                dispatch({type: "SET_LOADING"})
                const playlist = await axiosInstance.get(`/playlists/${id}`)
                if (typeof playlist.data === "undefined") {
                    throw Error("Cannot fetch playlist")
                }
                setPlaylist(playlist.data.data)

                const moviesFromPlaylist = await axiosInstance.get(`/join-movie-playlists?filters[playlist][id][$eq]=${id}`)
                if (typeof moviesFromPlaylist.data === "undefined") {
                    throw Error("Cannot fetch movies from playlist")
                }
                setMoviesPlaylist(moviesFromPlaylist.data.data)

            } catch (e: any) {
                const errorMessage = e?.response ? e?.response?.data?.error?.message : e?.message
                toast.error(errorMessage)
                console.error(e)
                if (e?.response && e?.response.status === 404) {
                    router.push("/404")
                }
            } finally {
                dispatch({type: "RESET_LOADING"})
            }


        }
        if (id) {
            fetchPlaylist()
        }
    }, [id]);
    return (
        <>
            <Head>
                <title>{playlist?.attributes?.name} - NeoMovie</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Playlist playlist={playlist} moviesList={moviesPlaylist}/>
        </>
    );
};

export default Index;
