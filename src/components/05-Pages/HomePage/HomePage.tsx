import style from './HomePage.module.scss';
import Header from "@components/03-Organisms/Header/Header";
import backgroundHeader from "@components/00-Base/defaultMovieBackSplash.jpg"
import Link from "next/link";
import logo from "@components/00-Base/logo.png";
import Image from "next/image";

const HomePage = () => {
    return (
        <div className={style.container}>
            <Header imgSrc={backgroundHeader.src}/>
            <div className={style.contentWrapper}>
                <h1>NeoMovie</h1>
                <div className={style.imgTextWrapper}>
                    <div className={style.textWrapper}>
                        <p>NeoMovie is a movie database website. You can search for movies, discover movies based on
                            your
                            prefered genre.
                        </p>
                        <p>You can also create an account to save your playlists and your prefered genre.</p>
                        <div className={style.authWrapper}>
                            <Link href={"/auth/signup"} className={style.btnSignUp}>SignUp now</Link>
                        </div>
                    </div>
                    <div className={style.imgContainer}>
                        <div className={style.imgWrapper}>
                            <Image src={logo.src}
                                   width={0} height={0}
                                   sizes={"100vw"}
                                   className={style.img} alt={"logo"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;