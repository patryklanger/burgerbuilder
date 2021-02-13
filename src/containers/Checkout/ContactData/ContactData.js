import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Name",
          label: "Your name:",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
        },
        isValid: false,
        isTouched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "E-mail address",
          label: "E-mail:",
        },
        value: "",
        validation: {
          required: true,
        },
        isValid: false,
        isTouched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
          label: "Your street:",
        },
        value: "",
        validation: {
          required: true,
        },
        isValid: false,
        isTouched: false,
      },
      postal: {
        elementType: "input",
        elementConfig: {
          type: "tel",
          placeholder: "Postal code",
          label: "Your postal code:",
        },
        value: "",
        validation: {
          minLength: 6,
          maxLength: 6,
          required: true,
          pattern: "[0-9-]+",
        },
        isValid: false,
        isTouched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
          label: "Delivery method:",
        },
        isValid: true,
        value: "fastest",
      },
    },
    ingredients: null,
    price: null,
    loading: false,
  };

  validityCheck(element, rules) {
    let isValid = true;
    if (rules?.required) isValid = element.trim() !== "" && isValid;
    if (rules?.minLength)
      isValid = element.length >= rules.minLength && isValid;
    if (rules?.maxLength)
      isValid = element.length <= rules.maxLength && isValid;
    return isValid;
  }

  componentDidMount() {
    this.setState({
      price: this.props.price,
      ingredients: this.props.ingredients,
    });
  }

  formValidityCheck() {
    return Object.keys(this.state.orderForm).reduce(
      (prev, cur) => prev && this.state.orderForm[cur].isValid,
      true
    );
  }

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      customer: formData,
      ingredients: this.state.ingredients,
      price: this.state.price,
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        console.log(response);
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
      });
  };

  inputChangedHanler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.isValid = this.validityCheck(
      updatedFormElement.value,
      updatedOrderForm[inputIdentifier].validation
    );
    updatedFormElement.isTouched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
  };

  render() {
    const inputs = Object.keys(this.state.orderForm).map((key) => {
      return (
        <Input
          key={key}
          elementType={this.state.orderForm[key].elementType}
          name={key}
          elementConfig={this.state.orderForm[key].elementConfig}
          defaultValue={this.state.orderForm[key].value}
          changed={(event) => this.inputChangedHanler(event, key)}
          submited={this.formSubmitHandler}
          validation={this.state.orderForm[key].validation}
          invalid={!this.state.orderForm[key].isValid}
          isTouched={!this.state.orderForm[key].isTouched}
        />
      );
    });
    return (
      <div className={classes.ContactData}>
        <h4>Entry your Contact Data</h4>
        <form onSubmit={this.orderHandler}>
          {inputs}
          <Button
            btnType="Success"
            type="submit"
            disabled={!this.formValidityCheck()}
          >
            ORDER
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
