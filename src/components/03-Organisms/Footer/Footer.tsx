import style from './Footer.module.scss';
import Image from "next/image";
import logo from "@components/00-Base/logo.png";
import logoMovieDB from "@components/00-Base/logoMovieDB.svg";
import Link from "next/link";
import Icon from "@components/01-Atoms/Icon/Icon";

const Footer = () => {
    return (
        <footer className={style.container} role={"contentinfo"}>
            <h2 className={style.h2}>FOLLOW US</h2>
            <div className={style.socialWrapper}>
                <Link href={"/"} className={style.link}><Icon classNames={style.icon} icon="faFacebookF"/></Link>
                <Link href={"/"} className={style.link}><Icon classNames={style.icon} icon="faInstagram"/></Link>
                <Link href={"/"} className={style.link}><Icon classNames={style.icon} icon="faTwitter"/></Link>
                <Link href={"/"} className={style.link}><Icon classNames={style.icon} icon="faEnvelope"/></Link>
            </div>

            <ul className={style.linksWrapper}>
                <li><Link href={"/"}>Contact</Link></li>
                <li><Link href={"/"}>Who are we</Link></li>
                <li><Link href={"/"}>Recrutment</Link></li>
                <li><Link href={"/"}>CGU</Link></li>
                <li><Link href={"/"}>RGPD</Link></li>
            </ul>
            <Link href={"/"} className={style.logoWrapper}>
                <Image src={logo.src}
                       width={0} height={0}
                       sizes={"100vw"}
                       className={style.logo} alt={"logo"}
                />
            </Link>
            <a href={"https://www.themoviedb.org"} target={"_blank"} className={style.logoWrapper}>
                <Image src={logoMovieDB.src}
                       width={0} height={0}
                       sizes={"100vw"}
                       className={style.logo} alt={"logo"}
                />
            </a>
            <p>Copyright MovieLook - 2023 ©</p>
        </footer>
    );
};

export default Footer;