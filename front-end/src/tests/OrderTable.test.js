import React from 'react';
// import axios from 'axios';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import OrderTable from '../components/OrderTable';
import { getOrderById } from '../services/handleOrders';

const funcFetchOrder = OrderTable.fetchOrderById;
jest.mock('../services/handleOrders');
jest.mock(funcFetchOrder);

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const token = 'mocked-token';

describe('OrderTable Component', () => {
  let storeCustomer;
  let storeSeller;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('testando OrderTable como customer', async () => {
    storeCustomer = mockStore({
      user: {
        token,
        role: 'customer',
      },
      controls: {
        orderId: 1,
        getOrder: false,
      },
      order: {
        products: [
          {
            product: {
              id: 1,
              name: 'Product 1',
              price: '10.00',
            },
            quantity: 2,
          },
        ],
        totalPrice: '20.00',
      },
    });

    getOrderById.mockResolvedValueOnce({ data: {}, status: 200 });

    const { getByTestId, findByRole } = render(
      <Provider store={ storeCustomer }>
        <BrowserRouter>
          <OrderTable />
        </BrowserRouter>
      </Provider>,
    );

    const element0 = await findByRole('cell', { name: '1' });
    const element1 = await findByRole('cell', { name: 'Product 1' });

    expect(element0).toHaveTextContent('1');
    expect(element1).toHaveTextContent('Product 1');
    expect(getByTestId('customer_order_details__element-order-table-quantity-0'))
      .toHaveTextContent('2');
    expect(getByTestId('customer_order_details__element-order-table-unit-price-0'))
      .toHaveTextContent('10,00');
    expect(getByTestId('customer_order_details__element-order-table-sub-total-0'))
      .toHaveTextContent('20,00');
    expect(getByTestId('customer_order_details__element-order-total-price'))
      .toHaveTextContent('20,00');
  });

  it('testando OrderTable como Seller', async () => {
    storeSeller = mockStore({
      user: {
        token,
        role: 'seller',
      },
      controls: {
        orderId: 1,
        getOrder: false,
      },
      order: {
        products: [
          {
            product: {
              id: 1,
              name: 'Product 1',
              price: '10.00',
            },
            quantity: 2,
          },
        ],
        totalPrice: '20.00',
      },
    });

    getOrderById.mockResolvedValueOnce({ data: {}, status: 200 });

    const { getByTestId, findByRole } = render(
      <Provider store={ storeSeller }>
        <BrowserRouter>
          <OrderTable />
        </BrowserRouter>
      </Provider>,
    );

    const element0 = await findByRole('cell', { name: '1' });
    const element1 = await findByRole('cell', { name: 'Product 1' });

    expect(element0).toHaveTextContent('1');
    expect(element1).toHaveTextContent('Product 1');

    expect(getByTestId('seller_order_details__element-order-table-quantity-0'))
      .toHaveTextContent('2');
    expect(getByTestId('seller_order_details__element-order-table-unit-price-0'))
      .toHaveTextContent('10,00');
    expect(getByTestId('seller_order_details__element-order-table-sub-total-0'))
      .toHaveTextContent('20,00');
    expect(getByTestId('seller_order_details__element-order-total-price'))
      .toHaveTextContent('20,00');
  });
});
