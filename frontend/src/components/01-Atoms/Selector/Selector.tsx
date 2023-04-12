import style from './Selector.module.scss';

type Props = {
    options: [
        { label: string, value: string }
    ],
    name: string,
    required: boolean,
    value: string
}
const Selector = ({
                      options = [], name, onChange, required, value, ...props
                  }: Props) => {
    return (
        <select className={style.container} name={name} id={name} {...props} onChange={onChange} value={value}
                required={required}>
            {options?.map((option, key) => (<option key={key} value={option?.value}>{option?.label}</option>))}
        </select>);

};

export default Selector;