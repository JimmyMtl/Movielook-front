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
    setPlaylists: (playlists: {
        id: number | string,
        attributes: {
            name: string,
            type: string
        }
    }[]) => void,
    fetchPlaylists: () => void
}