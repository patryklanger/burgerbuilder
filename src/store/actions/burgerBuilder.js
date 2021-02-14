import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredients = (ingredient) => {
  return {
    type: actionTypes.ADD_INGREDIENS,
    ingredient: ingredient,
  };
};

export const removeIngredients = (ingredient) => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    ingredient: ingredient,
  };
};

export const fetchDataFromServerHelper = (ingredients) => {
  return {
    type: actionTypes.FETCH_DATA_FROM_SERVER,
    ingredients: ingredients,
  };
};

export const fetchDataFromServer = () => {
  return (dispatch) => {
    axios
      .get("ingredients.json")
      .then((response) => {
        dispatch(fetchDataFromServerHelper(response.data));
      })
      .catch((error) => console.error(error));
  };
};
