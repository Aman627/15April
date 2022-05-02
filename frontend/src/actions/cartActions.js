import axios from "axios";
import {
  ADD_NEW_SHIPPING_ADDRESS_FAIL,
  ADD_NEW_SHIPPING_ADDRESS_REQUEST,
  ADD_NEW_SHIPPING_ADDRESS_SUCCESS,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
} from "../constants/cartConstants";
import { USER_LOGIN_SUCCESS } from "../constants/userConstansts";
// import { USER_LOGIN_SUCCESS } from "../constants/userConstansts";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.images[1],
      stock: data.stock,
      price: data.price,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const newShppingAddress = (address) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_NEW_SHIPPING_ADDRESS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const updateAddress = await axios.put(
      `/api/users/profile/addresses/new`,
      address,
      config
    );

    dispatch({
      type: ADD_NEW_SHIPPING_ADDRESS_SUCCESS,
      payload: updateAddress.data,
    });

    const { data } = await axios.get("/api/users/profile", config);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ADD_NEW_SHIPPING_ADDRESS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
