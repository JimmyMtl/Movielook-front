import style from './Label.module.scss';

const Label = ({children, htmlFor, classNames, ...props}) => {
    return (
        <label htmlFor={htmlFor} className={`${style.label} ${classNames}`} {...props}>{children}</label>
    );
};

export default Label;