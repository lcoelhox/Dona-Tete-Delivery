import {
  USER_LOGIN, USER_LOGOUT,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  email: '',
  role: '',
  token: '',
};

const user = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case USER_LOGIN:
    return {
      ...state,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      token: payload.token,
    };
  case USER_LOGOUT:
    return {
      ...state,
      ...INITIAL_STATE,
    };
  default:
    return state;
  }
};

export default user;
