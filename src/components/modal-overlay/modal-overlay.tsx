import React from "react";
import modalOverlayStyle from "./modal-overlay.module.css";
import { FC } from "react";

interface IModalOverlay {
  onClose: () => any;
  children?: React.ReactNode;
}

export const ModalOverlay: FC<IModalOverlay> = ({ onClose, children }) => {
  return (
      <div className={modalOverlayStyle.modalOverlay} onClick={onClose}>
        {children}
      </div>
  );
};

