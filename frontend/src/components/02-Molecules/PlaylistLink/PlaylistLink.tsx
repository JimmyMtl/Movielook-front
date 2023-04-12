import style from './PlaylistLink.module.scss';
import Link from "next/link";
import Icon from "@components/01-Atoms/Icon/Icon";

const PlaylistLink = ({playlist}) => {
    const getIcon = () => {
        switch (playlist?.attributes?.type) {
            case "seen":
                return "faEye";
            case "liked":
                return "faHeart";
            default:
                return "faChevronRight"
        }
    }
    return (
        <Link className={style.container} href={`/playlists/${playlist?.id}`}>

            <span>{playlist?.attributes?.name}</span>
            <Icon icon={getIcon()}/>
        </Link>
    );
};

export default PlaylistLink;