import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import OrderInfo from '../components/OrderInfo';
import { getOrderAction } from '../redux/actions';
import { changeStatus } from '../services/handleOrders';
import {
  BUTTON_DELIVERY_CHECK,
  BUTTON_DISPATCH_CHECK,
  BUTTON_PREPARING_CHECK,
  CUSTOMER_ORDER_DETAILS,
  DELIVERY_DELIVERED,
  ELM_DETAILS_DELIVERY_STATUS,
  ELM_DETAILS_ORDER_DATE,
  ELM_DETAILS_ORDER_ID,
  ELM_DETAILS_SELLER_NAME,
  HTTP_UPDATED,
  DELIVERY_IN_TRANSIT,
  DELIVERY_PENDING,
  DELIVERY_PREPARING,
  ROLE_SELLER,
  SELLER_ORDER_DETAILS,
} from '../constants';

jest.mock('react-redux');
jest.mock('../redux/actions');
jest.mock('../services/handleOrders');

const number10 = 10;

describe('OrderInfo', () => {
  const useSelectorMock = useSelector;
  const useDispatchMock = useDispatch;

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
    getOrderAction.mockClear();
    changeStatus.mockClear();
  });
  const date = '2022-02-22T22:22:22.000Z';
  test('renders order details for customer', () => {
    useSelectorMock.mockReturnValueOnce({
      role: '',
      token: '',
    }).mockReturnValueOnce({
      seller: 'John Doe',
      orderId: 1,
      saleDate: date,
      status: DELIVERY_PENDING,
    });

    render(<OrderInfo />);

    expect(screen.getByTestId(`${CUSTOMER_ORDER_DETAILS}${ELM_DETAILS_ORDER_ID}`))
      .toHaveTextContent('PEDIDO 0001');
    expect(screen.getByTestId(`${CUSTOMER_ORDER_DETAILS}${ELM_DETAILS_SELLER_NAME}`))
      .toHaveTextContent('P. Vend: John Doe');
    expect(screen.getByTestId(`${CUSTOMER_ORDER_DETAILS}${ELM_DETAILS_ORDER_DATE}`))
      .toHaveTextContent('22/02/2022');
    expect(screen.getByTestId(`${CUSTOMER_ORDER_DETAILS}${ELM_DETAILS_DELIVERY_STATUS}`))
      .toHaveTextContent(DELIVERY_PENDING);
    expect(screen.getByTestId(`${CUSTOMER_ORDER_DETAILS}${BUTTON_DELIVERY_CHECK}`))
      .toBeInTheDocument();
  });

  test('renders order details for seller', () => {
    useSelectorMock.mockReturnValueOnce({
      role: ROLE_SELLER,
      token: '',
    }).mockReturnValueOnce({
      seller: '',
      orderId: 10,
      saleDate: date,
      status: DELIVERY_PENDING,
    });

    render(<OrderInfo />);

    expect(screen.getByTestId(`${SELLER_ORDER_DETAILS}${ELM_DETAILS_ORDER_ID}`))
      .toHaveTextContent('PEDIDO 0010');
    expect(screen.getByTestId(`${SELLER_ORDER_DETAILS}${ELM_DETAILS_ORDER_DATE}`))
      .toHaveTextContent('22/02/2022');
    expect(screen.getByTestId(`${SELLER_ORDER_DETAILS}${ELM_DETAILS_DELIVERY_STATUS}`))
      .toHaveTextContent(DELIVERY_PENDING);
    expect(screen.getByTestId(`${SELLER_ORDER_DETAILS}${BUTTON_PREPARING_CHECK}`))
      .toBeInTheDocument();
    expect(screen.getByTestId(`${SELLER_ORDER_DETAILS}${BUTTON_DISPATCH_CHECK}`))
      .toBeInTheDocument();
  });

  test('clicar em preparar pedidos chamar as funcoes', async () => {
    useSelectorMock.mockReturnValueOnce({
      role: ROLE_SELLER,
      token: '123',
    }).mockReturnValueOnce({
      seller: '',
      orderId: 10,
      saleDate: date,
      status: DELIVERY_PENDING,
    });

    const dispatchMock = jest.fn();
    useDispatchMock.mockReturnValue(dispatchMock);

    changeStatus.mockResolvedValueOnce({ status: HTTP_UPDATED });

    render(<OrderInfo />);

    const preparingButton = screen
      .getByTestId(`${SELLER_ORDER_DETAILS}${BUTTON_PREPARING_CHECK}`);
    fireEvent.click(preparingButton);

    expect(changeStatus)
      .toHaveBeenCalledWith({ status: DELIVERY_PREPARING }, number10, '123');
    // expect(dispatchMock).toHaveBeenCalledWith(getOrderAction(true));
  });

  test('saiu para entrega chama as funcoes', async () => {
    useSelectorMock.mockReturnValueOnce({
      role: ROLE_SELLER,
      token: '123',
    }).mockReturnValueOnce({
      seller: '',
      orderId: 10,
      saleDate: date,
      status: DELIVERY_PREPARING,
    });

    const dispatchMock = jest.fn();
    useDispatchMock.mockReturnValue(dispatchMock);

    changeStatus.mockResolvedValueOnce({ status: HTTP_UPDATED });

    render(<OrderInfo />);

    const dispatchButton = screen
      .getByTestId(`${SELLER_ORDER_DETAILS}${BUTTON_DISPATCH_CHECK}`);
    fireEvent.click(dispatchButton);

    expect(changeStatus)
      .toHaveBeenCalledWith({ status: DELIVERY_IN_TRANSIT }, number10, '123');
    // expect(dispatchMock).toHaveBeenCalledWith(getOrderAction(true));
  });

  test('marcar como entregue chama as funcoes', async () => {
    useSelectorMock.mockReturnValueOnce({
      role: '',
      token: '123',
    }).mockReturnValueOnce({
      seller: 'John Doe',
      orderId: 1,
      saleDate: date,
      status: DELIVERY_IN_TRANSIT,
    });

    const dispatchMock = jest.fn();
    useDispatchMock.mockReturnValue(dispatchMock);

    changeStatus.mockResolvedValueOnce({ status: HTTP_UPDATED });

    render(<OrderInfo />);

    const deliveryButton = screen
      .getByTestId(`${CUSTOMER_ORDER_DETAILS}${BUTTON_DELIVERY_CHECK}`);
    fireEvent.click(deliveryButton);

    expect(changeStatus).toHaveBeenCalledWith({ status: DELIVERY_DELIVERED }, 1, '123');
    // expect(dispatchMock).toHaveBeenCalledWith(getOrderAction(true));
  });
});
