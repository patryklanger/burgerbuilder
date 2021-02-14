import * as actionType from "../actions/actionTypes";
import { updateObject } from "../utility";

const INITIAL_STATE = {
  ingredients: null,
  price: 4,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
const addIngredients = (state, action) => {
  const updatedIngredients = { ...state.ingredients };
  updatedIngredients[action.ingredient] =
    state.ingredients[action.ingredient] + 1;
  const updatedPrice = state.price + INGREDIENT_PRICES[action.ingredient];
  return updateObject(state, {
    ingredients: updatedIngredients,
    price: updatedPrice,
  });
};

const removeIngredients = (state, action) => {
  const updatedIngredients = { ...state.ingredients };
  updatedIngredients[action.ingredient] =
    state.ingredients[action.ingredient] - 1;
  const updatedPrice = state.price - INGREDIENT_PRICES[action.ingredient];
  return updateObject(state, {
    ingredients: updatedIngredients,
    price: updatedPrice,
  });
};

const fetchDataFromServer = (state, action) => {
  const updatedIng = {
    meat: action.ingredients.meat,
    cheese: action.ingredients.cheese,
    salad: action.ingredients.salad,
    bacon: action.ingredients.bacon,
  };
  return updateObject(state, { ingredients: updatedIng });
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENS:
      return addIngredients(state, action);
    case actionType.REMOVE_INGREDIENTS:
      return removeIngredients(state, action);
    case actionType.FETCH_DATA_FROM_SERVER:
      return fetchDataFromServer(state, action);
    default:
      return state;
  }
};

export default reducer;
