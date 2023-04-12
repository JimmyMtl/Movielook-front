import style from './InputGroup.module.scss';
import Label from "@components/01-Atoms/Label/Label";
import Input from "@components/01-Atoms/Input/Input";

const InputGroup = ({id, name, htmlFor, label, onChange, value, placeholder, classNames, type, icon, required,...props}) => {
    return (
        <div className={`${style.container} ${classNames}`}>
            <Label htmlFor={htmlFor}>{label}</Label>
            <Input icon={icon} id={id} name={name} onChange={onChange} value={value} placeholder={placeholder}
                  required={required} type={type} {...props}/>
        </div>
    );
};

export default InputGroup;