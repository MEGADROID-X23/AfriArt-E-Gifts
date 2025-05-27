export const userDataReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART": {
      return { ...state, cartProducts: [...action.payload] };
    }

    case "SET_ADDRESS": {
  // Ensure action.payload is an array if it isn't already
  const payloadArray = Array.isArray(action.payload) 
    ? [...action.payload] 
    : [action.payload];
    
  return { ...state, addressList: payloadArray };
}

    case "SET_WISHLIST": {
      return { ...state, wishlistProducts: [...action.payload] };
    }

    case "SET_ORDER": {
      return {
        ...state,
        orderDetails: {
          ...state.orderDetails,
          ...action.payload,
        },
      };
    }

    case "SET_ORDERS": {
      return { ...state, orders: [...state.orders, { ...action.payload }] };
    }

    default:
      return state;
  }
};

export const initialUserData = {
  cartProducts: [],
  wishlistProducts: [],
  addressList: [],
  orders: [],
  orderDetails: {
    cartItemsTotal: "",
    cartItemsDiscountTotal: "",
    couponDiscountTotal: "",
    orderAddress: "",
    orderId: "",
  },
};
