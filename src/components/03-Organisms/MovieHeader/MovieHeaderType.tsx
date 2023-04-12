export type Props = {
    movieID: number | string,
    title: string,
    genres: {
        name: string
    }[],
    voteAverage: number | string,
    releaseDate: string,
    posterPath: string,
    spokenLanguages: {
        name: string
    }[]

}
export type playlists = {
    id: number | string,
    attributes: {
        name: string,
        type: string
    }
}[]