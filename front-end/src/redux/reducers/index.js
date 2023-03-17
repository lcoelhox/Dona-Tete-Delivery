import { combineReducers } from 'redux';
import cart from './cart';
import controls from './controls';
import order from './order';
import user from './user';

const rootReducer = combineReducers({
  cart,
  controls,
  order,
  user,
});

export default rootReducer;
