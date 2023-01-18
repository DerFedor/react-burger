import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import modalStyle from "./modal.module.css";
import { ModalOverlay } from "../modalOverlay/modal-overlay";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals")as HTMLElement;

export const Modal = (props) => {
  const escClose = (e) => {
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

  console.log(props.onClose);

  return ReactDOM.createPortal(
      <ModalOverlay onClose={props.onClose}>
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
      </ModalOverlay>,
      modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  header: PropTypes.string,
  children: PropTypes.element
};