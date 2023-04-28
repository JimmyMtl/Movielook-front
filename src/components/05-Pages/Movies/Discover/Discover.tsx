import style from './Discover.module.scss';
import Header from "@components/03-Organisms/Header/Header";

import MovieCard from "@components/02-Molecules/MovieCard/MovieCard";
import Paginate from "@components/02-Molecules/Paginate/Paginate";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "@reducer/Auth/AuthContext";
import {Props} from "./DiscoverType";

const Discover = ({results = [], page, total_pages, total_results, hasQuery}: Props) => {
    const {user} = useContext(AuthContext);
    const [defaultPreferedGenre, setDefaultPreferedGenre] = useState("Action");
    useEffect(() => {
        if (user) {
            setDefaultPreferedGenre(user?.preferedGenre)
        }
    }, [user]);

    return (
        <div className={style.container}>
            <Header/>
            <div className={style.contentWrapper}>
                <h1>Discover movies {defaultPreferedGenre}</h1>
                <div className={style.resultsList}>
                    {results?.length > 0 ? results?.map((movie, idx) => (
                        <MovieCard key={idx} movie={movie}/>
                    )) : <p>There is no results..</p>}
                </div>
                <Paginate hasQuery={hasQuery} page={page} total_pages={total_pages} total_results={total_results}/>
            </div>
        </div>
    );
};

export default Discover;