export type Props = {
    languages:
        {
            name: string,
            english_name: string,
            iso_639_1: string

        }[]
}
export type States = {
    query: string,
    primary_release_year: string,
    language: string
}
export type language = {
    name: string,
    english_name: string,
    iso_639_1: string
}
export type languageFiltered = {
    label: string | undefined,
    value: string | undefined
}[]