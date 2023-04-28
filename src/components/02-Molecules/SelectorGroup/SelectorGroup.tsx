import style from './SelectorGroup.module.scss';
import Label from "@components/01-Atoms/Label/Label";
import Selector from "@components/01-Atoms/Selector/Selector";
import {Props} from "./SelectorGroupType";
const SelectorGroup = ({id, name, htmlFor, label, onChange, value,  classNames, options, ...props}: Props) => {
    return (
        <div className={`${style.container} ${classNames}`}>
            <Label htmlFor={htmlFor}>{label}</Label>
            <Selector id={id} name={name} options={options} onChange={onChange} value={value}
                      {...props}/>
        </div>
    );
};

export default SelectorGroup;