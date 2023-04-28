export type Props = {
    playlist:
        {
            id: number | string,
            attributes: {
                name: string,
                type: string
            }
        },
    movieID: number | string,
    fetchPlaylists: () => void
}
export type movie = {
    id: number | string,
    attributes: {

        movie_id: number | string,
        playlist: {
            id: number | string,
            name: string,
        }
    }
}
