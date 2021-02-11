import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <React.Fragment>
      <Backdrop show={props.opacity} cancel={props.cancel} />
      <div
        className={classes.Modal}
        style={{
          transform: props.opacity ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.opacity ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default Modal;
