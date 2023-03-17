import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import Login from '../pages/Common/Login';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { LS_KEY_USER } from '../constants';

describe('Login component', () => {
  const emailImputID = 'common_login__input-email';
  const passwordInputID = 'common_login__input-password';
  const loginButtonID = 'common_login__button-login';

  test('renderiza o formulário de login ', () => {
    const { getByTestId } = renderWithRouterAndRedux(<Login />);
    const emailInput = getByTestId(emailImputID);
    const passwordInput = getByTestId(passwordInputID);
    const loginButton = getByTestId(loginButtonID);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('não envia o formulário quando as entradas são inválidas', async () => {
    const { getByTestId } = renderWithRouterAndRedux(<Login />);
    const loginButton = getByTestId(loginButtonID);
    const emailInput = getByTestId(emailImputID);
    const passwordInput = getByTestId(passwordInputID);

    fireEvent.change(emailInput, { target: { value: 'invalidEmail' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(loginButton).toBeDisabled();
    });
  });

  test('mostra mensagem de erro quando o login falha', async () => {
    jest.spyOn(window, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({
        status: 401,
        userData: null,
      }),
    }));

    const { getByTestId } = renderWithRouterAndRedux(<Login />);
    const loginButton = getByTestId(loginButtonID);
    const emailInput = getByTestId(emailImputID);
    const passwordInput = getByTestId(passwordInputID);

    fireEvent.change(emailInput, { target: { value: 'validEmail@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validPassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(getByTestId('common_login__element-invalid-email')).toBeInTheDocument();
    });
  });

  test('deve ter um botão de registro para redirecionar para "/register', () => {
    const { getByTestId, history } = renderWithRouterAndRedux(<Login />);
    const register = getByTestId('common_login__button-register');
    fireEvent.click(register);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/register');
  });

  test('redireciona para a página customer', async () => {
    jest.spyOn(window, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({
        status: 200,
        userData: { name: 'customer', role: 'customer' },
      }),
    }));
    localStorage.clear();
    localStorage.setItem(LS_KEY_USER, JSON.stringify([
      {
        email: 'zebirita@email.com',
        name: 'Cliente Zé Birita',
        role: 'customer',
      }]));
    const { getByTestId, history } = renderWithRouterAndRedux(<Login />);
    const loginButton = getByTestId(loginButtonID);
    const emailInput = getByTestId(emailImputID);
    const passwordInput = getByTestId(passwordInputID);

    fireEvent.change(emailInput, { target: { value: 'zebirita@email.com' } });
    fireEvent.change(passwordInput, { target: { value: '$#zebirita#$' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(history.location.pathname).toEqual('/customer/products');
    });
  });

  test('redireciona para a página admin', async () => {
    jest.spyOn(window, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({
        status: 200,
        userData: { name: 'admin', role: 'administrator' },
      }),
    }));
    localStorage.clear();
    localStorage.setItem(LS_KEY_USER, JSON.stringify([
      {
        email: 'adm@deliveryapp.com',
        name: 'Delivery App Admin',
        role: 'administrator',
      }]));
    const { getByTestId, history } = renderWithRouterAndRedux(<Login />);
    const loginButton = getByTestId(loginButtonID);
    const emailInput = getByTestId(emailImputID);
    const passwordInput = getByTestId(passwordInputID);

    fireEvent.change(emailInput, { target: { value: 'adm@deliveryapp.com' } });
    fireEvent.change(passwordInput, { target: { value: '--adm2@21!!--' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(history.location.pathname).toEqual('/admin/manage');
    });
  });

  test('redireciona para a página seller', async () => {
    jest.spyOn(window, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({
        status: 200,
        userData: { name: 'seller', role: 'seller' },
      }),
    }));
    localStorage.clear();
    localStorage.setItem(LS_KEY_USER, JSON.stringify([
      {
        email: 'fulana@deliveryapp.com',
        name: 'Fulana Pereira',
        role: 'seller',
      }]));
    const { getByTestId, history } = renderWithRouterAndRedux(<Login />);
    const loginButton = getByTestId(loginButtonID);
    const emailInput = getByTestId(emailImputID);
    const passwordInput = getByTestId(passwordInputID);

    fireEvent.change(emailInput, { target: { value: 'fulana@deliveryapp.com' } });
    fireEvent.change(passwordInput, { target: { value: 'fulana@123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(history.location.pathname).toEqual('/seller/orders');
    });
  });
});
