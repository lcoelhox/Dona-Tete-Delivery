import { SET_ORDER } from '../actions/actionTypes';

const INITIAL_STATE = {
  orderId: 0,
  totalPrice: '',
  seller: '',
  saleDate: '',
  status: '',
  products: [],
};

const order = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SET_ORDER:
    return {
      ...state,
      ...payload,
    };
  default:
    return state;
  }
};

export default order;
