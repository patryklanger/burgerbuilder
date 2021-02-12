import React from "react";
import Logo from "../../Logo/Logo";
import Backdrop from "../../UI/Backdrop/Backdrop";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";

const SideDrawer = (props) => {
  // ...

  return (
    <React.Fragment>
      <Backdrop show={props.opened} cancel={props.toggle} />
      <div
        className={[
          classes.SideDrawer,
          classes[props.opened ? "Open" : "Close"],
        ].join(" ")}
      >
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default SideDrawer;
