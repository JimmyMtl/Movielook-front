import style from './InputGroup.module.scss';
import Label from "@components/01-Atoms/Label/Label";
import Input from "@components/01-Atoms/Input/Input";
import React from "react";

type Props = {
    id: string,
    name: string,
    htmlFor: string,
    label: string,
    defaultValue?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value?: string,
    placeholder: string,
    classNames?: string,
    type?: string,
    icon?: string,
    required?: boolean,
    disabled?: boolean
}
const InputGroup = ({
                        id,
                        name,
                        htmlFor,
                        label,
                        onChange,
                        value,
                        placeholder,
                        classNames,
                        type,
                        icon,
                        required,
                        ...props
                    }: Props) => {
    return (
        <div className={`${style.container} ${classNames}`}>
            <Label htmlFor={htmlFor}>{label}</Label>
            <Input icon={icon} id={id} name={name} onChange={onChange} value={value} placeholder={placeholder}
                   required={required} type={type} {...props}/>
        </div>
    );
};

export default InputGroup;