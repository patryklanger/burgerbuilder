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
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    purchasing: 0,
    loading: false,
    error: false,
  };

  componentDidMount() {
    /* axios
      .get(
        "https://burgerbuilder-6ffb7-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json"
      )
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((err) => this.setState({ error: true })); */
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  cancelPurchaseHandler = () => {
    this.setState({ purchasing: false });
  };

  continuePurchaseHandler = () => {
    // const queryParams = [];
    // for (let i in this.props.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.props.ingredients[i])
    //   );
    //   queryParams.push("price=" + this.props.totalPrice);
    // }
    // const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      // search: "?" + queryString,
    });
  };
  componentDidMount() {
    this.props.fetchDataFromServerHandler();
  }

  updatePurchaseState(ingredientsNew) {
    const ingredients = { ...ingredientsNew };
    const purchasable = Object.values(ingredients).reduce(
      (arr, next) => arr + next,
      0
    );
    return purchasable > 0;
  }

  // addIngredientHandler = (type) => {
  //   const newCount = this.state.ingredients[type] + 1;
  //   const transformedIng = { ...this.state.ingredients };
  //   transformedIng[type] = newCount;
  //   const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
  //   this.setState({ totalPrice: newPrice, ingredients: transformedIng });
  //   this.updatePurchaseState(transformedIng);
  // };

  // removeIngredientHandler = (type) => {
  //   if (this.state.ingredients[type] <= 0) return;
  //   const newCount = this.state.ingredients[type] - 1;
  //   const transformedIng = { ...this.state.ingredients };
  //   transformedIng[type] = newCount;
  //   const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
  //   this.setState({ totalPrice: newPrice, ingredients: transformedIng });
  //   this.updatePurchaseState(transformedIng);
  // };

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    if (this.state.loading) orderSummary = <Spinner />;
    let burger = <Spinner />;
    if (this.props.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.addIngredientHandler}
            ingredientRemoved={this.props.removeIngredientHandler}
            disabled={disabledInfo}
            totalPrice={this.props.totalPrice}
            orderDisabled={this.updatePurchaseState(this.props.ingredients)}
            ordered={this.purchaseHandler}
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.totalPrice}
          ingredients={this.props.ingredients}
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.price,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addIngredientHandler: (ing) => dispatch(actionCreators.addIngredients(ing)),
    removeIngredientHandler: (ing) =>
      dispatch(actionCreators.removeIngredients(ing)),
    fetchDataFromServerHandler: () =>
      dispatch(actionCreators.fetchDataFromServer()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withErrorHandler(BurgerBuilder, axios)));
