import style from './Input.module.scss';
import Icon from "@components/01-Atoms/Icon/Icon";

const Input = ({type = "text", onChange, value, classNames, placeholder, icon,required, ...props}) => {
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