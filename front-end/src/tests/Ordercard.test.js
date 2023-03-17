import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import OrdersCard from '../components/OrdersCard';
import { orderIdAction } from '../redux/actions';
import { getOrders } from '../services/handleOrders';
import {
  ELM_ORDER_ID,
  HTTP_OK,
  ROLE_SELLER,
  SELLER_ORDERS,
} from '../constants';

jest.mock('react-redux');
jest.mock('react-router-dom');
jest.mock('../redux/actions');
jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}));
jest.mock('../services/handleOrders');

describe('OrdersCard', () => {
  const sales = [
    {
      id: 1,
      deliveryAddress: 'Rua A',
      deliveryNumber: '123',
      status: 'Entregue',
      saleDate: '2022-02-01T00:00:00.000Z',
      totalPrice: '10.00',
    },
    {
      id: 2,
      deliveryAddress: 'Rua B',
      deliveryNumber: '456',
      status: 'Em trânsito',
      saleDate: '2022-02-02T00:00:00.000Z',
      totalPrice: '20.00',
    },
  ];

  beforeEach(() => {
    useSelector.mockImplementation((callback) => callback({
      user: {
        role: ROLE_SELLER,
        token: 'token',
      },
    }));
    useDispatch.mockReturnValue(jest.fn());
    useHistory.mockReturnValue({
      push: jest.fn(),
    });
    getOrders.mockResolvedValue({
      status: HTTP_OK,
      data: sales,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render sales cards', async () => {
    render(<OrdersCard />);
    const saleCards = await screen.findAllByRole('button', { name: /pedido/i });
    expect(saleCards).toHaveLength(2);
  });

  it('should render sale queue', async () => {
    render(<OrdersCard />);
    const saleQueue = await screen.findByTestId(`${SELLER_ORDERS}${ELM_ORDER_ID}-1`);
    expect(saleQueue).toBeInTheDocument();
    expect(saleQueue).toHaveTextContent('Pedido');
    expect(saleQueue).toHaveTextContent('0001');
  });

  it('should render sale details', async () => {
    render(<OrdersCard />);
    const saleDetails = await screen.findAllByRole('button', { name: /pedido/i });
    expect(saleDetails[0]).toHaveTextContent('Entregue');
    expect(saleDetails[0])
      .toHaveTextContent('Pedido0001Entregue31/01/202210,00Rua A, 123');

    expect(saleDetails[1]).toHaveTextContent('Em trânsito');
    expect(saleDetails[1])
      .toHaveTextContent('Pedido0002Em trânsito01/02/202220,00Rua B, 456');
  });

  it('should handle click on sale card', async () => {
    render(<OrdersCard />);
    const saleCard = await screen.findByRole('button', { name: /pedido 0001/i });
    fireEvent.click(saleCard);
    expect(orderIdAction).toHaveBeenCalledWith(1);
    expect(useHistory().push).toHaveBeenCalledWith('/seller/orders/1');
  });
});
