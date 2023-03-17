import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import { saveCartAcion, userLoginAction } from '../redux/actions';
import {
  getCartOnLocalStorage,
  getUserDataOnLocalStorage,
} from '../services/handleLocalStorage';
import {
  CUSTOMER_PRODUCTS,
  ELM_NAV_LOGOUT,
  ELM_NAV_ORDERS,
  ELM_NAV_PRODUCTS,
  ELM_NAV_USERNAME,
  ROLE_CUSTOMER,
} from '../constants';

jest.mock('react-redux');
jest.mock('../services/handleLocalStorage');
jest.mock('../utils');

describe('Navbar', () => {
  const dispatch = jest.fn();
  const user = {
    token: '123',
    role: ROLE_CUSTOMER,
    name: 'John Doe',
  };

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation((callback) => callback({ user }));
    getUserDataOnLocalStorage.mockReturnValue(user);
    getCartOnLocalStorage.mockReturnValue([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('não renderizar se nao estiver logado', () => {
    useSelector.mockImplementation((callback) => callback({ user: { token: '' } }));
    render(
      <BrowserRouter>
        <Navbar>
          <div>Child component</div>
        </Navbar>
      </BrowserRouter>,
    );

    expect(screen.queryByText('Child component')).not.toBeInTheDocument();
  });

  it('restaurar o carrinho do locar storage', () => {
    useSelector.mockImplementation((callback) => callback({ user: { token: '' } }));
    render(
      <BrowserRouter>
        <Navbar>
          <div>Child component</div>
        </Navbar>
      </BrowserRouter>,
    );

    expect(getUserDataOnLocalStorage).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(userLoginAction(user));
    expect(dispatch).toHaveBeenCalledWith(saveCartAcion([]));
  });

  it('renderizar os links de acordo com a role do usuario', () => {
    render(
      <BrowserRouter>
        <Navbar>
          <div>Child component</div>
        </Navbar>
      </BrowserRouter>,
    );

    const ordersLink = screen.getByTestId(`${CUSTOMER_PRODUCTS}${ELM_NAV_ORDERS}`);
    const productsLink = screen.getByTestId(`${CUSTOMER_PRODUCTS}${ELM_NAV_PRODUCTS}`);

    expect(ordersLink).toHaveTextContent('Meus pedidos');
    expect(productsLink).toHaveTextContent('Produtos');
  });

  it('renderizar o botao de logout', () => {
    render(
      <BrowserRouter>
        <Navbar>
          <div>Child component</div>
        </Navbar>
      </BrowserRouter>,
    );

    const logoutButton = screen.getByTestId(`${CUSTOMER_PRODUCTS}${ELM_NAV_LOGOUT}`);

    expect(logoutButton).toHaveTextContent('Sair');
  });

  it('renderizar o nome', () => {
    render(
      <BrowserRouter>
        <Navbar>
          <div>Child component</div>
        </Navbar>
      </BrowserRouter>,
    );

    const userName = screen.getByTestId(`${CUSTOMER_PRODUCTS}${ELM_NAV_USERNAME}`);

    expect(userName).toHaveTextContent(user.name);
  });
});
