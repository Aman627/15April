import {
  ADD_NEW_SHIPPING_ADDRESS_FAIL,
  ADD_NEW_SHIPPING_ADDRESS_REQUEST,
  ADD_NEW_SHIPPING_ADDRESS_SUCCESS,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    default:
      return state;
  }
};

export const addNewShppingAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_SHIPPING_ADDRESS_REQUEST:
      return { lodaing: true };
    case ADD_NEW_SHIPPING_ADDRESS_SUCCESS:
      return { loading: false, address: action.payload };
    case ADD_NEW_SHIPPING_ADDRESS_FAIL:
      return { lodaing: false, error: action.payload };
    default:
      return state;
  }
};
