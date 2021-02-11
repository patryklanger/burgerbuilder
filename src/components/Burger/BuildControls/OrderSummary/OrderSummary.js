import React from "react";
import Button from "../../../UI/Button/Button";

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((objEl) => {
    return (
      <li key={objEl}>
        <span style={{ textTransform: "capitalize" }}>{objEl}</span>:{" "}
        {props.ingredients[objEl]}
      </li>
    );
  });
  return (
    <React.Fragment>
      <h3>Your order</h3>
      <p>Delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <Button action={props.cancel}>order</Button>
      <Button action={props.cancel}>cancel</Button>
    </React.Fragment>
  );
};

export default OrderSummary;
