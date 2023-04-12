import style from './Selector.module.scss';
import React from "react";

type Props = {
    options:
        { label: string | undefined, value: string | undefined }[],
    name: string,
    id: string,
    required?: boolean,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    props?: any
}
const Selector = ({
                      options = [{label: "", value: ""}], id, name, onChange, required, value, ...props
                  }: Props) => {
    return (
        <select className={style.container} name={name} id={id} {...props} onChange={onChange} value={value}
                required={required}>
            {options?.map((option, key) => (<option key={key} value={option?.value}>{option?.label}</option>))}
        </select>);

};

export default Selector;