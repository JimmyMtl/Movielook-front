import style from './Modal.module.scss';
import React, {ReactNode, useState} from "react";

type Props = {
    children: ReactNode,
    titleBaseBtn: ReactNode,
    classNameBaseBtn: string,
    onValidation: () => void
}
const Modal = ({children, titleBaseBtn, classNameBaseBtn, onValidation}: Props) => {
    const [show, setShow] = useState(false);
    const showModal = () => {
        setShow(true)
    }
    const closeModal = () => {
        setShow(false)
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onValidation();
        closeModal();
        return
    }
    return (
        <>
            <button type={"button"} className={classNameBaseBtn} onClick={showModal}>{titleBaseBtn}</button>
            <div className={`${style.modalContainer}  ${show ? style.showModal : style.hideModal}`}>
                <div className={style.backgroundModal}>
                    <form className={style.wrapperModal} onSubmit={handleSubmit}>
                        <div className={style.containerChildren}>
                            {children}
                        </div>
                        <div className={style.wrapperActionsBtn}>
                            <button className={style.closeBtn} type={"button"} onClick={closeModal}>Annuler</button>
                            <button type={"submit"} className={style.validationBtn}>Valider
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Modal;


