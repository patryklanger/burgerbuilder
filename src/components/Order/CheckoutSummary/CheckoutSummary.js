import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div className={classes.Burger}>
        <Burger
          className={classes.BurgerComponent}
          ingredients={props.ingredients}
        />
      </div>
      <div>
        <Button btnType="Success" action={props.checkoutContinued}>
          Continue
        </Button>
        <Button btnType="Danger" action={props.checkoutCancelled}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
