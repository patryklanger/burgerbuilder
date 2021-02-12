import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { withRouter } from "react-router-dom";

class Checkout extends Component {
  state = {
    ingredients: {
      bacon: 1,
      cheese: 1,
      meat: 1,
      salad: 1,
    },
  };
  constructor(props) {
    super(props);
    this.burgerBuilderIngredientsHandler();
  }
  burgerBuilderIngredientsHandler() {
    if (this.props.location.state?.ingredients) {
      this.setState({ ingredients: this.props.location.state.ingredients });
    }
  }

  componentDidMount() {
    this.burgerBuilderIngredientsHandler();
  }

  render() {
    console.log(this.props.location.state.ingredients);
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} />
      </div>
    );
  }
}

export default withRouter(Checkout);
