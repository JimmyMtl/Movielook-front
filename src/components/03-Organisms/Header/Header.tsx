import style from './Header.module.scss';
import defaultBackground from "@components/00-Base/supermanbatman.jpg";

const Header = ({imgSrc = defaultBackground.src}) => {
    return (
        <header className={style.container} style={{backgroundImage: `url(${imgSrc})`}}/>
    );
};

export default Header;