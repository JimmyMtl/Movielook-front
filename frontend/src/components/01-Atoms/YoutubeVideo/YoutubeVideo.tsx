import style from './YoutubeVideo.module.scss';

const YoutubeVideo = ({...props}) => {
    return (
        <iframe className={style.container} width="480" height="270"
                src={`https://www.youtube.com/embed/${props.video.key}`} frameBorder="0" allow={"fullscreen;"}/>
    );
};

export default YoutubeVideo;