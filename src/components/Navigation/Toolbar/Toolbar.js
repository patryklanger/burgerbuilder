import React from "react";
import Logo from "../../Logo/Logo";
import ToggleDrawer from "../../UI/ToggleDrawer/ToggleDrawer";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./Toolbar.module.css";

const Toolbar = (props) => (
  <header className={classes.Toolbar}>
    <ToggleDrawer toggle={props.toggle} />
    <Logo height="80%" />
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default Toolbar;
