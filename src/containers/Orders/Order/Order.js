import React from "react";
import classes from "./Order.module.css";

const Order = (props) => {
  const ingredients = Object.keys(props.ingredients).map((key) => (
    <div key={key} className={classes.Ingredient}>
      {key}({props.ingredients[key]})
    </div>
  ));

  return (
    <div className={classes.Order}>
      <div className={classes.Ingredients}>
        <p>Ingredients:</p> {ingredients}
      </div>
      <div className={classes.Price}>
        <p>
          Price: <strong>USD {(+props.price).toFixed(2)}</strong>
        </p>
      </div>
      <div style={{ display: "flex", alignItems: "center", margin: "0" }}>
        <span
          style={{
            float: "left",
          }}
        >
          <p>Customer:</p>
        </span>
        <span
          style={{
            display: "inline-block",
            border: "1px solid #eee",
            padding: "8px",
            boxSizing: "border-box",
            marginLeft: "10px",
            boxShadow: "0 2px 3px #ccc",
          }}
        >
          <p style={{ margin: "0" }}>{props.customerName}</p>
        </span>
      </div>
    </div>
  );
};

export default Order;
