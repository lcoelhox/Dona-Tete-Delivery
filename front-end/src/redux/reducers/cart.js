import {
  CART_DELETE, CART_SAVE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  currentCart: {},
};

const cart = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case CART_SAVE:
    return {
      ...state,
      currentCart: { ...payload },
    };
  case CART_DELETE:
    return {
      ...state,
      ...INITIAL_STATE,
    };
  default:
    return state;
  }
};

export default cart;
