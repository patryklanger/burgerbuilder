import { Component } from "react";
import React, { Componenet } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/BuildControls/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import { withRouter } from "react-router-dom";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    purchasable: false,
    totalPrice: 4,
    purchasing: 0,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get(
        "https://burgerbuilder-6ffb7-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json"
      )
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((err) => this.setState({ error: true }));
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  cancelPurchaseHandler = () => {
    this.setState({ purchasing: false });
  };

  continuePurchaseHandler = () => {
    /* this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Patryk Langer",
        address: {
          street: "Witosa 10",
          zipCode: "41351",
          country: "Poland",
        },
        email: "patryklanger@icloud.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({
          purchasing: false,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          purchasing: false,
          loading: false,
        });
      }); */
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
      queryParams.push("price=" + this.state.totalPrice);
    }
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
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
    let orderSummary = null;
    if (this.state.loading) orderSummary = <Spinner />;
    let burger = <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <React.Fragment>
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
      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice}
          ingredients={this.state.ingredients}
          cancel={this.cancelPurchaseHandler}
          continue={this.continuePurchaseHandler}
          update={this.state.purchasing}
        />
      );
    }
    if (this.state.error) burger = <p>Cannot load ingredients!</p>;
    return (
      <React.Fragment>
        <Modal
          opacity={this.state.purchasing}
          cancel={this.cancelPurchaseHandler}
          loading={this.state.loading}
        >
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

export default withRouter(withErrorHandler(BurgerBuilder, axios));
