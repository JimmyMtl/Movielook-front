export type Props = {
    setPlaylists: (prevState: any) => void
}
export type prevStateType =  [{
    id: string,
    attributes: {
        name: string,

    }
}] | []