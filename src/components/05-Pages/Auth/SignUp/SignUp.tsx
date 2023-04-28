import style from '../Auth.module.scss';
import FormSignUp from "@components/03-Organisms/Auth/FormSignUp/FormSignUp";
import defaultBackground from "@components/00-Base/supermanbatman.jpg"

const SignUp = () => {
    return (
            <div className={style.container}>
                <span className={style.darkenFilter} style={{backgroundImage: `url(${defaultBackground.src})`}}/>
                <FormSignUp/>
            </div>
    );
};

export default SignUp;