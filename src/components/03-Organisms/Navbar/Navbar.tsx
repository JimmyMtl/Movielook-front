import style from './Navbar.module.scss';
import Image from "next/image"
import logo from "@components/00-Base/logo.png"
import Link from "next/link";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@reducer/Auth/AuthContext";
import defaultAvatar from "@components/00-Base/defaultAvatar.png";
import {user} from "./NavbarType"
import MobileSidebar from "@components/02-Molecules/MobileSidebar/MobileSidebar";

const Navbar = () => {
    const {user} = useContext(AuthContext)
    const [currentUser, setCurrentUser] = useState<user | null>(null);
    useEffect(() => {
        if (user) {
            setCurrentUser(user)
        }
    }, [user]);

    return (
        <nav className={style.container} role={"navigation"}>
            <div className={style.logoContainer}>
                <Link href={"/"} className={style.logoWrapper}>
                    <Image src={logo.src}
                           width={0} height={0}
                           sizes={"100vw"}
                           className={style.logo} alt={"logo"}
                    />
                </Link>
            </div>
            <div className={style.linksWrapper}>
                <Link href={"/movies/search"}>Home</Link>
                {currentUser ? <Link href={"/discover"}>Discover</Link> : null}
            </div>
            <div className={style.profileWrapper}>
                {currentUser ? <Link href={"/profile"} className={style.profileBtn}>
                        <span>{currentUser?.username || currentUser?.email}</span>
                        <div className={style.avatarContainer}>
                            <Image src={defaultAvatar.src}
                                   width={0} height={0}
                                   sizes={"100vw"}
                                   className={style.avatar} alt={"logo"}
                            />
                        </div>
                    </Link>

                    :
                    <>
                        <Link href={"/auth/signin"} className={style.signinBtn}>Sign In</Link>
                        <Link href={"/auth/signup"} className={style.signupBtn}>Sign Up</Link>
                    </>
                }
            </div>
            <MobileSidebar/>
        </nav>
    );
};

export default Navbar;