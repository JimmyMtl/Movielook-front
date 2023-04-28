import style from './Input.module.scss';
import Icon from "@components/01-Atoms/Icon/Icon";
import React from "react";

type Props = {
    id?: string,
    name?: string,
    type?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value?: string,
    classNames?: string,
    placeholder?: string,
    icon?: string,
    required?: boolean
}
const Input = ({type = "text", onChange, value, classNames, placeholder, icon, required, ...props}: Props) => {
    const BaseInput = <input type={type} className={`${style.input} ${classNames}`}
                             onChange={onChange} value={value}
                             placeholder={placeholder}
                             required={required}
                             {...props}/>
    if (icon) {
        return <div className={style.container}>
            {BaseInput}
            <Icon icon={icon} classNames={style.icon}/>
        </div>
    }
    return BaseInput;
};

export default Input;