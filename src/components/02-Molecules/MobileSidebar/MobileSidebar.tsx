import React, {useContext, useEffect, useState} from 'react';
import style from './MobileSidebar.module.scss';
import Icon from "../../01-atoms/Icon/Icon";
import {useRouter} from "next/router";
import {AuthContext} from "@reducer/Auth/AuthContext";
import {user} from "./MobileSidebarType"
import Link from "next/link";
import logo from "@components/00-Base/defaultAvatar.png";
import Image from "next/image";

const MobileSidebar = () => {
    const router = useRouter();
    const [isSidebarOpened, setIsSidebarOpened] = useState(false);
    const {user} = useContext(AuthContext)
    const [currentUser, setCurrentUser] = useState<user | null>(null);
    useEffect(() => {
        if (user) {
            setCurrentUser(user)
        }
    }, [user]);
    useEffect(() => {
        setIsSidebarOpened(false)
    }, [router.pathname]);
    return (
        <>
            <button type={"button"} className={style.openBtn} onClick={() => setIsSidebarOpened(!isSidebarOpened)}>
                <Icon icon={"faBurger"} classNames={style.openIcon}/>
            </button>
            <div className={`${style.container} ${!isSidebarOpened ? style.sidebarClosed : ""}`}
            >
                <div className={style.sidebarWrapper} id={"mobileBackground"}>
                    <button type={"button"} className={style.closeBtn}
                            onClick={() => setIsSidebarOpened(!isSidebarOpened)}>
                        <Icon icon={"faXmark"} classNames={style.openIcon}/>
                    </button>
                    <Link href={"/movies/search"}>Home</Link>
                    {currentUser ? <>
                        <Link href={"/discover"}>Discover</Link>
                        <Link href={"/profile"} className={style.profile}>
                            <div className={style.avatarWrapper}>
                                <Image src={logo.src}
                                       width={0} height={0}
                                       sizes={"100vw"}
                                       className={style.logo} alt={"logo"}
                                />
                            </div>
                            <span>{currentUser?.username || currentUser?.email}</span>
                        </Link>
                    </> : <>
                        <Link href={"/auth/signin"}>SignIn</Link>
                        <Link href={"/auth/signup"}>SignUp</Link>
                    </>}
                    {/*<SidebarLinksList isSidebarOpened={true}/>*/}
                </div>
            </div>
        </>
    );
};

export default MobileSidebar;