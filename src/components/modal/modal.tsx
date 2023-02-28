import React, { FC } from "react";
import ReactDOM from "react-dom";
import modalStyle from "./modal.module.css";
import { ModalOverlay } from "../modal-overlay/modal-overlay";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals")!;


interface IModal {
    onClose: () => void;
    header: string;
    children?: React.ReactNode;
}
export const Modal: FC<IModal> = (props) => {
    const escClose = (e: KeyboardEvent) => {
        console.log(e);
    if (e.key === "Escape") {
      props.onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", escClose);
    return () => {
      document.removeEventListener("keydown", escClose);
    };
  }, []);

  //console.log(props.onClose);

  return ReactDOM.createPortal(
      <div>
        <ModalOverlay onClose={props.onClose}/>
         <div className={modalStyle.popup} onClick={(e) => e.stopPropagation()}>
              <div className={"pl-10 pt-10 pr-10 " + modalStyle.header__box}>
            <h2 className={"text text_type_main-large " + modalStyle.header}>
              {props.header}
            </h2>
            <div className={modalStyle.close}>
              <CloseIcon type="primary" onClick={props.onClose}/>
            </div>
          </div>
          {props.children}
        </div>
      </div>,
      modalRoot
  );
};

