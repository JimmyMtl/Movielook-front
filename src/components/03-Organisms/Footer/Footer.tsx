import style from './Footer.module.scss';
import Image from "next/image";
import logo from "@components/00-Base/logo.png";
import Link from "next/link";
import Icon from "@components/01-Atoms/Icon/Icon";

const Footer = () => {
    return (
        <footer className={style.container}>
            <p>FOLLOW US</p>
            <div className={style.socialWrapper}>
                <Link href={"/"} className={style.link}><Icon classNames={style.icon} icon="faFacebookF"/></Link>
                <Link href={"/"} className={style.link}><Icon classNames={style.icon} icon="faInstagram"/></Link>
                <Link href={"/"} className={style.link}><Icon classNames={style.icon} icon="faTwitter"/></Link>
                <Link href={"/"} className={style.link}><Icon classNames={style.icon} icon="faEnvelope"/></Link>
            </div>

            <div className={style.linksWrapper}>
                <Link href={"/"}>Contact</Link>
                <Link href={"/"}>Who are we</Link>
                <Link href={"/"}>Recrutment</Link>
                <Link href={"/"}>CGU</Link>
                <Link href={"/"}>RGPD</Link>
            </div>
            <Link href={"/"} className={style.logoWrapper}>
                <Image src={logo.src}
                       width={0} height={0}
                       sizes={"100vw"}
                       className={style.logo} alt={"logo"}
                />
            </Link>
            <p>Copyright NeoMovie - 2023 ©</p>
        </footer>
    );
};

export default Footer;