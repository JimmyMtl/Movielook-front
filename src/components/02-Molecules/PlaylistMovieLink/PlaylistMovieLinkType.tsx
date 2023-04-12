export type Props = {
    movie: {
        id: number | string,
        attributes: {
            title: string,
            movie_id: number | string,

        }
    }
}
export type movieFromAPI = {
    id: number | string,
    poster_path: string,
    title: string,
}