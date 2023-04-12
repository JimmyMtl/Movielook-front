import style from './FormProfile.module.scss';
import InputGroup from "@components/02-Molecules/InputGroup/InputGroup";
import Image from "next/image";
import defaultAvatar from "@components/00-Base/defaultAvatar.png";
import Link from "next/link";

const FormProfile = ({handleSubmit, username, email, preferedGenre, onChange}) => {
    return (
        <form onSubmit={handleSubmit} className={style.container}>
            <div className={style.avatarContainer}>
                <Image src={defaultAvatar.src}
                       width={0} height={0}
                       sizes={"100vw"}
                       className={style.avatar} alt={"logo"}
                />
            </div>
            <h1 className={style.title}>Profile</h1>
            <InputGroup htmlFor={"username"}
                        value={username} onChange={onChange}
                        id={"username"} name={"username"}
                        label={"Username"}
                        placeholder={"Your username"}
            />
            <InputGroup htmlFor={"email"}
                        value={email} onChange={onChange}
                        id={"email"} name={"email"}
                        label={"Email"} type={"email"}
                        placeholder={"Your email"}
            />
            <InputGroup htmlFor={"genre"}
                        defaultValue={preferedGenre}
                        id={"genre"} name={"genre"}
                        label={"Prefered genre"} type={"text"}
                        disabled={true}
                        placeholder={"Prefered genre"}
            />
            <button className={style.submitBtn} type={"submit"}>Update</button>
            <Link href={"/auth/signout"} className={style.signOutBtn}>Sign Out</Link>
        </form>
    );
};

export default FormProfile;