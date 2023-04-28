export type Props = {
    id: number,
    title: string,
    genres: Array<{ id: number, name: string }>,
    vote_average: number,
    status: string,
    spoken_languages: Array<{ english_name: string, iso_639_1: string, name: string }>,
    release_date: string,
    production_companies: Array<{ id: number, logo_path: string, name: string, origin_country: string }>,
    backdrop_path: string,
    poster_path: string,
    overview: string,
    budget: number,
    videos: Array<{ id: string, key: string, name: string, site: string, type: string }>
}