import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controlLabels = [
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
];
const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current price is <strong>${props.totalPrice.toFixed(2)}</strong>
      </p>
      {controlLabels.map((el) => (
        <BuildControl
          label={el.label}
          key={el.type}
          added={() => props.ingredientAdded(el.type)}
          removed={() => props.ingredientRemoved(el.type)}
          disabled={props.disabled[el.type]}
        />
      ))}
    </div>
  );
};
export default BuildControls;
