import React from "react";
// import PropTypes from "prop-types";
// import ReactDOM from "react-dom";
import modalOverlayStyle from "./modal-overlay.module.css";

export const ModalOverlay = (props) => {
  //console.log(props);
  return (
      <div className={modalOverlayStyle.modalOverlay}
           onClick={props.onClose}>
    </div>
  );
};




// class Modal extends React.Component {
//   render() {
//     const { children, header, onClose } = this.props;
//     // Возвращаем ReactDOM.createPortal,
//     // который поместит дочерние элементы в modalRoot
//     return ReactDOM.createPortal(
//         <>
//           <div className="Modal">
//             <ModalHeader onClose={onClose}>{header}</ModalHeader>
//             {children}
//           </div>
//           <ModalBackDrop onClose={onClose} />
//         </>,
//         modalRoot
//     );
//   }
// }