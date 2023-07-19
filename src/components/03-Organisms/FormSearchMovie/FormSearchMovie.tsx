import style from './FormSearchMovie.module.scss';
import InputGroup from "@components/02-Molecules/InputGroup/InputGroup";
import Icon from "@components/01-Atoms/Icon/Icon";
import SelectorGroup from "@components/02-Molecules/SelectorGroup/SelectorGroup";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Props, States, language, languageFiltered} from "./FormSearchMovieType";

const FormSearchMovie = ({languages}: Props) => {
    const router = useRouter()
    const [states, setStates] = useState<States>({
        query: router?.query?.query?.toString() || '',
        primary_release_year: router?.query?.primary_release_year?.toString() || '',
        language: router?.query?.language?.toString() || 'en'
    })
    const {query, primary_release_year, language} = states
    const [languagesFiltered, setLanguagesFiltered] = useState<languageFiltered>([]);
    useEffect(() => {
        if (languages) {
            setLanguagesFiltered(languages.map((language: language) => ({
                label: language?.name || language?.english_name,
                value: language?.iso_639_1
            })).sort((a, b) => a.label.toString().localeCompare(b.label.toString())))
        }
    }, [languages]);
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const cleanedStates = JSON.parse(
            JSON.stringify(
                states,
                (key, value) => (value !== "" && value !== null && value !== undefined) ? value : undefined
            )
        )
        const query = (new URLSearchParams(cleanedStates)).toString()
        const url = router?.pathname + "?" + query
        router.push(url)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => setStates((prevState: States) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))

    const [showFilters, setShowFilters] = useState<boolean | undefined>(false);
    const handleShowFilters = () => setShowFilters(precState => !precState)

    return (
        <form onSubmit={onSubmit} className={style.container} role={"search"}>
            <h1 className={style.h1}>Find a movie</h1>
            <InputGroup icon={"faSearch"} type={"text"} id={"query"} name={"query"} htmlFor={"query"}
                        label={"Search"} placeholder={"Western spaghetti, zombies..."}
                        classNames={style.inputQuery}
                        onChange={handleInputChange}
                        value={query}
                        required={true}
            />
            <button className={style.filtersBtn} onClick={handleShowFilters} type={"button"}
                    aria-expanded={showFilters}><span>{showFilters ? "Hide filters" : "Show filters"}</span><Icon
                icon="faSliders"/></button>
            <div className={`${style.wrapperFilter} ${showFilters ? style.show : style.hide}`}>
                {/*<SelectorGroup label={"Ge nre"} classNames={style.fullSized}/>*/}
                <InputGroup type={"number"} id={"primary_release_year"} name={"primary_release_year"}
                            htmlFor={"primary_release_year"}
                            label={"Release year"} placeholder={"1971"}
                    // classNames={style.inputGroup}
                            classNames={style.halfSized}
                            onChange={handleInputChange}
                            value={primary_release_year}
                />
                <SelectorGroup label={"Language"} value={language} name={"language"} id={"language"}
                               onChange={handleInputChange} htmlFor={"language"}
                               options={languagesFiltered} classNames={style.halfSized}/>
            </div>
            <button type={"submit"} className={style.submitBtn}>Search</button>
        </form>
    );
};

export default FormSearchMovie;