import React, { Component } from "react";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";

class Layout extends Component {
  state = {
    sideDrawerOpened: false,
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpened: !prevState.sideDrawerOpened };
    });
  };

  render() {
    return (
      <React.Fragment>
        <Toolbar toggle={this.sideDrawerToggleHandler} />
        <SideDrawer
          opened={this.state.sideDrawerOpened}
          toggle={this.sideDrawerToggleHandler}
        />
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Layout;
