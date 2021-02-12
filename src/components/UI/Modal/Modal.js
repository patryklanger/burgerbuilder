import React, { Component } from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";

class Modal extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.opacity !== this.props.opacity;
  }

  render() {
    console.log("render");
    return (
      <React.Fragment>
        <Backdrop show={this.props.opacity} cancel={this.props.cancel} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.opacity
              ? "translateY(0)"
              : "translateY(-100vh)",
            opacity: this.props.opacity ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;
