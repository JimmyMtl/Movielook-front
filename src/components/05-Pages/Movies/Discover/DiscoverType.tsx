export type Props = {
    results: Movie[],
    page: number,
    total_pages: number,
    total_results: number,
    hasQuery: boolean
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