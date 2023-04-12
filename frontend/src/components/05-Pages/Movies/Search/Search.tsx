import style from './Search.module.scss';
import Header from "@components/03-Organisms/Header/Header";
import MovieCard from "@components/02-Molecules/MovieCard/MovieCard";
import Paginate from "@components/02-Molecules/Paginate/Paginate";
import FormSearchMovie from "@components/03-Organisms/FormSearchMovie/FormSearchMovie";

const Search = ({results = [], page, total_pages, total_results, hasQuery, genres, languages}) => {


    return (
        <div className={style.container}>
            <Header/>
            <FormSearchMovie genres={genres} languages={languages}/>
            <div className={style.resultsList}>
                {results?.length > 0 ? results?.map((movie, idx) => (
                    <MovieCard key={idx} movie={movie}/>
                )) : <p>There is no results..</p>}
            </div>
            <Paginate hasQuery={hasQuery} page={page} total_pages={total_pages} total_results={total_results}/>
        </div>
    );
};

export default Search;