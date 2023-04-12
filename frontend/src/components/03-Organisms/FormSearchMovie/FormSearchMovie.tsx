import style from './FormSearchMovie.module.scss';
import InputGroup from "@components/02-Molecules/InputGroup/InputGroup";
import Icon from "@components/01-Atoms/Icon/Icon";
import SelectorGroup from "@components/02-Molecules/SelectorGroup/SelectorGroup";
import {useState} from "react";
import {useRouter} from "next/router";

const FormSearchMovie = ({genres, languages}) => {
    const router = useRouter()
    const [states, setStates] = useState({
        query: router?.query?.query || '',
        genre: '',
        primary_release_year: router?.query?.primary_release_year || '',
        language: router?.query?.language || 'en'
    })
    const {query, primary_release_year, language} = states

    const onSubmit = (e) => {
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


    const handleInputChange = (e) => setStates(prevState => ({...prevState, [e.target.name]: e.target.value}))

    const [showFilters, setShowFilters] = useState(false);
    const handleShowFilters = () => setShowFilters(precState => !precState)

    return (
        <form onSubmit={onSubmit} className={style.container}>
            <InputGroup icon={"faSearch"} type={"text"} id={"query"} name={"query"} htmlFor={"query"}
                        label={"Search a movie"} placeholder={"Western spaghetti, zombies..."}
                        classNames={style.inputQuery}
                        onChange={handleInputChange}
                        value={query}
                        required={true}
            />
            <button className={style.filtersBtn} onClick={handleShowFilters} type={"button"}><Icon
                icon="faSliders"/></button>
            {showFilters ? <div className={style.wrapperFilter}>
                {/*<SelectorGroup label={"Genre"} classNames={style.fullSized}/>*/}
                <InputGroup type={"number"} id={"primary_release_year"} name={"primary_release_year"}
                            htmlFor={"primary_release_year"}
                            label={"Release year"} placeholder={"1971"}
                    // classNames={style.inputGroup}
                            classNames={style.halfSized}
                            onChange={handleInputChange}
                            value={primary_release_year}
                />
                <SelectorGroup label={"Language"} value={language} name={"language"} id={"language"}
                               onChange={handleInputChange} htmlFor={"language"} options={languages.map((language) => ({
                    label: language?.name || language?.english_name,
                    value: language?.iso_639_1
                }))} classNames={style.halfSized}/>
            </div> : null}
            <button type={"submit"} className={style.submitBtn}>Search</button>
        </form>
    );
};

export default FormSearchMovie;