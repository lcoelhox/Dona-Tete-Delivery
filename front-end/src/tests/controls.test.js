import controls from '../redux/reducers/controls';
import { GET_ORDER, GET_USERS, ORDER_ID } from '../redux/actions/actionTypes';

describe('controls reducer', () => {
  it('should return the initial state', () => {
    expect(controls(undefined, {})).toEqual({
      getUsers: false,
      getOrder: false,
      orderId: 0,
    });
  });

  it('should handle GET_USERS', () => {
    const payload = true;
    const action = { type: GET_USERS, payload };
    expect(controls(undefined, action)).toEqual({
      getUsers: true,
      getOrder: false,
      orderId: 0,
    });
  });

  it('should handle ORDER_ID', () => {
    const payload = 123;
    const action = { type: ORDER_ID, payload };
    expect(controls(undefined, action)).toEqual({
      getUsers: false,
      getOrder: false,
      orderId: 123,
    });
  });

  it('should handle GET_ORDER', () => {
    const payload = true;
    const action = { type: GET_ORDER, payload };
    expect(controls(undefined, action)).toEqual({
      getUsers: false,
      getOrder: true,
      orderId: 0,
    });
  });
});
