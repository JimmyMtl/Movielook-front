import style from './YoutubeVideosList.module.scss';
import YoutubeVideo from "@components/01-Atoms/YoutubeVideo/YoutubeVideo";
import {useState} from "react";

const YoutubeVideosList = ({videos}) => {
    const [activeVideo, setActiveVideo] = useState(0);
    const handleShowMore = () => {
        setActiveVideo(prevState => prevState + 1)
    }
    const handleShowLess = () => setActiveVideo(0)
    return (
        <div className={style.container}>
            {/*// maps videos from videos index to activeVideo index*/}
            <h4>Related videos</h4>
            {videos.map((video, idx) => (
                idx <= activeVideo ?
                    <YoutubeVideo video={video} key={idx}/> : null
            ))}
            {videos.length > 1 ?
                (
                    activeVideo < videos.length - 1 ?
                        <button onClick={handleShowMore} className={style.showMoreBtn}>Show More</button> :
                        <button onClick={handleShowLess} className={style.showLessBtn}>Show Less</button>
                )
                : null}
        </div>
    );
};

export default YoutubeVideosList;