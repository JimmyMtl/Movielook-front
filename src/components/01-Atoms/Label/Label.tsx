import style from './Label.module.scss';
import React from "react";

type Props = {
    htmlFor: string,
    classNames?: string,
    children: React.ReactNode
}
const Label = ({children, htmlFor, classNames, ...props}: Props) => {
    return (
        <label htmlFor={htmlFor} className={`${style.label} ${classNames}`} {...props}>{children}</label>
    );
};

export default Label;