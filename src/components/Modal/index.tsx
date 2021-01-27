import React, { FC } from "react";
import "./Modal.css";

const Modal: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="modal-container">
      <div className="modal">{children}</div>
    </div>
  );
};

export default Modal;
