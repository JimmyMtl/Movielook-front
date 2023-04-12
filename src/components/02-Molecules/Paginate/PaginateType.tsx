import React from "react";

export type Props = {
    page: number,
    total_pages: number,
    total_results: number,
    hasQuery: boolean,
    children?: React.ReactNode | React.ReactNode[] | never[]
}