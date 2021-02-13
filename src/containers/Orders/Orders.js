import React, { Component } from "react";
import Order from "./Order/Order";
import classes from "./Orders.module.css";
import axios from "../../axios-orders";

class Orders extends Component {
  state = {
    orders: null,
  };

  getOrdersHandler() {
    axios.get("/orders.json").then((response) => {
      if (response.data !== this.state.orders) {
        this.setState({ orders: response.data });
      }
    });
  }

  componentDidMount() {
    this.getOrdersHandler();
  }

  render() {
    let orders = {};
    if (this.state.orders) {
      orders = Object.keys(this.state.orders).map((key) => (
        <Order
          ingredients={this.state.orders[key].ingredients}
          price={this.state.orders[key].price}
          customerName={this.state.orders[key].customer.name}
          key={key}
        />
      ));
    } else orders = null;
    return <div className={classes.Orders}>{orders}</div>;
  }
}

export default Orders;
