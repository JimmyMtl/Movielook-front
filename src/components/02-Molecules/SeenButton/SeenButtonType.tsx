export type Props = {
    movieID: number | string,
    playlists:
        {
            id: number | string,
            attributes: {
                name: string,
                type: string
            }
        }[],
    fetchPlaylists: () => void
}
export type seenPlaylist = {
    id: number | string,
}
export type seenMovie ={
    id: number | string,
    attributes: {
        movie_id: number | string
    }
}