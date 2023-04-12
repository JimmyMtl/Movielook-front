import style from './Paginate.module.scss';
import ReactPaginate from 'react-paginate';
import {useRouter} from "next/router";

const Paginate = ({page, total_pages, total_results, hasQuery}) => {
    const router = useRouter()
    const handlePageChange = ({selected}) => {
        const updatedQuery = {
            ...router?.query,
            page: selected + 1
        }
        const url = router?.pathname + "?" + (new URLSearchParams(updatedQuery)).toString()
        router.push(url)
    }
    if (!hasQuery) {
        return null;
    }
    return (
        <ReactPaginate pageCount={total_pages > 500 ? 500 : total_pages}
                       initialPage={page - 1 || 0}
                       breakLabel={"..."}
                       className={style.container}
                       onPageChange={handlePageChange}
                       activeLinkClassName={style.active}
        >
        </ReactPaginate>
    );
};

export default Paginate;