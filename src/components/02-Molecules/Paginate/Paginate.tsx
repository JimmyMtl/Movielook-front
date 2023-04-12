import style from './Paginate.module.scss';
import ReactPaginate from 'react-paginate';
import {useRouter} from "next/router";
import React from "react";
import {Props} from "./PaginateType"

const Paginate = ({page, total_pages, total_results, hasQuery, ...props}: Props) => {
    const router = useRouter()
    const handlePageChange = ({selected}: { selected: number }) => {
        const updatedQuery = {
            ...router?.query,
            page: selected + 1
        }
        const url = router?.pathname + "?" + (new URLSearchParams(JSON.parse(JSON.stringify(updatedQuery)))).toString()
        router.push(url)
    }
    if (!hasQuery) {
        return null;
    }
    return (
        //@ts-ignore
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