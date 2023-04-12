export type Props = {

    movieID: number | string,
    setPlaylists: (playlists: playlists) => void,
    playlists: playlists,
    fetchPlaylists: () => void
}
export type playlists = {
    id: number | string,
    attributes: {
        name: string,
        type: string,
    }
}[]