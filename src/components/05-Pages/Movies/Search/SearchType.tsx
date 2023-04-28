export type Props = {
    results: Movie[],
    page: number,
    total_pages: number,
    total_results: number,
    hasQuery: boolean
    languages: Language[]
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
type Language = {
    iso_639_1: string,
    name: string,
    english_name: string
}