import {
  CART_DELETE,
  CART_SAVE,
  GET_ORDER,
  GET_USERS,
  ORDER_ID,
  SET_ORDER,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
} from './actionTypes';

// Cart actions
export const saveCartAcion = (payload) => ({
  type: CART_SAVE,
  payload,
});

export const deleteCartAcion = () => ({
  type: CART_DELETE,
});

// Controls actions
export const getUsersAction = (payload) => ({
  type: GET_USERS,
  payload,
});

export const orderIdAction = (payload) => ({
  type: ORDER_ID,
  payload,
});

export const getOrderAction = (payload) => ({
  type: GET_ORDER,
  payload,
});

// Order actions
export const orderAction = (payload) => ({
  type: SET_ORDER,
  payload,
});

// User actions
export const userLoginAction = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const userRegisterAction = (payload) => ({
  type: USER_REGISTER,
  payload,
});

export const userLogoutAction = () => ({
  type: USER_LOGOUT,
});
