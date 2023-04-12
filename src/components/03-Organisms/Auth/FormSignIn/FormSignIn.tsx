import style from '../CommonForm.module.scss';
import InputGroup from "../../../02-Molecules/InputGroup/InputGroup";
import Link from "next/link";
import {Props} from "../AuthType";
const FormSignIn = ({handleSubmit, email, password, rememberme, onChange}: Props) => {
    return (
        <form className={style.container} onSubmit={handleSubmit}>
            <h1 className={style.title}>Sign In</h1>

            <InputGroup htmlFor={"email"}
                        value={email} onChange={onChange}
                        id={"email"} name={"email"}
                        label={"Email"} type={"email"}
                        placeholder={"Your email"} required={true}
            />
            <InputGroup htmlFor={"password"}
                        value={password} onChange={onChange}
                        id={"password"} name={"password"}
                        label={"Password"} type={"password"}
                        placeholder={"Your password"} required={true}
            />
            <div className={style.wrapperRememberAndPassword}>
                <div className={style.wrapperRememberMe}>
                    <input type="checkbox" id={"rememberme"} checked={rememberme} onChange={onChange} name={"rememberme"}/>
                    <label htmlFor="rememberme">Remember me</label>
                </div>
                <Link href={"/auth/forgot-password"}>Forgot password?</Link>
            </div>
            <button className={style.submitBtn} type={"submit"}>Sign-In</button>
            <p>Not registered? <Link href={"/auth/signup"}>Sign-up now</Link></p>
        </form>
    );
};

export default FormSignIn;