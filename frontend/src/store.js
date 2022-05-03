import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import {
  addNewShppingAddressReducer,
  cartReducer,
} from "./reducers/cartReducers";
import {
  userUpdateProfileReducer,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  //product
  productList: productListReducer,
  productDetails: productDetailsReducer,
  //cart
  cart: cartReducer,
  addNewShppingAddress: addNewShppingAddressReducer,
  //user
  userLogin: userLoginReducer,
  userResigter: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
});

//storing cart item to local storage
const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

//storing user Info to local storage
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

//storing shipping address to local storage
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

//initialState is use for loading of intial state
const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
  },
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
