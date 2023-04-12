import style from './SelectorGroup.module.scss';
import Label from "@components/01-Atoms/Label/Label";
import Selector from "@components/01-Atoms/Selector/Selector";

const SelectorGroup = ({id, name, htmlFor, label, onChange, value, placeholder, classNames, options, ...props}) => {
    return (
        <div className={`${style.container} ${classNames}`}>
            <Label htmlFor={htmlFor}>{label}</Label>
            <Selector id={id} name={name} options={options} onChange={onChange} value={value} placeholder={placeholder}
                      {...props}/>
        </div>
    );
};

export default SelectorGroup;