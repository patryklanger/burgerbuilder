import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

class Checkout extends Component {
  componentDidMount() {
    // const query = new URLSearchParams(this.props.location.search);
    // const ingredients = {};
    // for (let param of query.entries()) {
    //   if (param[0] === "price") {
    //     this.setState({ price: param[1] });
    //     continue;
    //   }
    //   ingredients[param[0]] = +param[1];
    // }
    // this.setState({ ingredients });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />

        <Route path="/checkout/contact-data" exact>
          <ContactData />
        </Route>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    price: state.price,
  };
};

export default connect(mapStateToProps)(Checkout);
