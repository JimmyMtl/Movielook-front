export type PlaylistProps = {
    playlist: {
        id: number | string,
        attributes: {
            name: string,
            type: string,
        }
    },
    moviesList: {
        id: number | string,
        attributes: {
            title: string,
            movie_id: number | string,
        }
    }[]
}