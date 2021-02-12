import { Component } from "react";
import React, { Componenet } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/BuildControls/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    purchasable: false,
    totalPrice: 4,
    purchasing: 0,
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  cancelPurchaseHandler = () => {
    this.setState({ purchasing: false });
  };

  continuePurchaseHandler = () => {
    alert("Continue!");
  };

  updatePurchaseState(ingredientsNew) {
    const ingredients = { ...ingredientsNew };
    const purchasable = Object.values(ingredients).reduce(
      (arr, next) => arr + next,
      0
    );
    this.setState({ purchasable: purchasable > 0 });
  }

  addIngredientHandler = (type) => {
    const newCount = this.state.ingredients[type] + 1;
    const transformedIng = { ...this.state.ingredients };
    transformedIng[type] = newCount;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: transformedIng });
    this.updatePurchaseState(transformedIng);
  };

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] <= 0) return;
    const newCount = this.state.ingredients[type] - 1;
    const transformedIng = { ...this.state.ingredients };
    transformedIng[type] = newCount;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: transformedIng });
    this.updatePurchaseState(transformedIng);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <React.Fragment>
        <Modal
          opacity={this.state.purchasing}
          cancel={this.cancelPurchaseHandler}
        >
          <OrderSummary
            price={this.state.totalPrice}
            ingredients={this.state.ingredients}
            cancel={this.cancelPurchaseHandler}
            continue={this.continuePurchaseHandler}
            update={this.state.purchasing}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          totalPrice={this.state.totalPrice}
          orderDisabled={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
