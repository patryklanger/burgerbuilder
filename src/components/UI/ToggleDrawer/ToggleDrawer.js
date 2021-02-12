import { MenuOutline } from "react-ionicons";
import classes from "./ToggleDrawer.module.css";
import PropTypes from "prop-types";

const ToggleDrawer = (props) => (
  //   <MenuOutline
  //     color={"#fff"}
  //     height={"30px"}
  //     width={"30px"}
  //     onClick={props.toggle}
  //   />
  <div onClick={props.toggle} className={classes.DrawerToggle}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default ToggleDrawer;
