import { GET_ORDER, GET_USERS, ORDER_ID } from '../actions/actionTypes';

const INITIAL_STATE = {
  getUsers: false,
  getOrder: false,
  orderId: 0,
};

const controls = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_USERS:
    return {
      ...state,
      getUsers: payload,
    };
  case ORDER_ID:
    return {
      ...state,
      orderId: payload,
    };
  case GET_ORDER:
    return {
      ...state,
      getOrder: payload,
    };
  default:
    return state;
  }
};

export default controls;
