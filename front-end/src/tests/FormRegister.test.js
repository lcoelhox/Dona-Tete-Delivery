import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { LS_KEY_USER } from '../constants';
import Admin from '../pages/Admin/Admin';
import Register from '../pages/Common/Register';

const emailMock = 'zebirita@email.com';
const nameMock = 'Cliente Zé Birita';

describe('Testando O componente FormRegister', () => {
  it(
    'Testando que acontece um erro caso tente cadastrar um email já cadastrado',
    async () => {
      jest.spyOn(window, 'fetch').mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve({
          status: 201,
          userData: { name: 'customer', role: 'customer' },
        }),
      }));
      localStorage.clear();
      localStorage.setItem(LS_KEY_USER, JSON.stringify([
        {
          email: emailMock,
          name: nameMock,
          role: 'customer',
        }]));

      renderWithRouterAndRedux(<Register />);
      // history.push('/admin/manage');

      const nameInput = screen.getByTestId('common_register__input-name');
      const emailInput = screen.getByTestId('common_register__input-email');
      const passwordInput = screen.getByTestId('common_register__input-password');

      const buttonCadastr = screen.getByTestId('common_register__button-register');

      userEvent.type(nameInput, 'Cliente Zé Birita');
      userEvent.type(emailInput, 'zebirita@email.com');
      userEvent.type(passwordInput, '123456');

      fireEvent.click(buttonCadastr);

      await waitFor(() => {
        const error = screen.getByTestId('common_register__element-invalid_register');
        expect(error).toBeInTheDocument();
      });
    },
  );

  it(
    'Testando que acontece um erro caso tente cadastrar um email já cadastrado como adm',
    async () => {
      jest.spyOn(window, 'fetch').mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve({
          status: 201,
          userData: { name: 'admin', role: 'admin' },
        }),
      }));
      localStorage.clear();
      localStorage.setItem(LS_KEY_USER, JSON.stringify([
        {
          email: 'adm@deliveryapp.com',
          name: 'Delivery App Admin',
          role: 'customer',
        }]));

      renderWithRouterAndRedux(<Admin />);

      const nameInput = screen.getByTestId('admin_manage__input-name');
      const emailInput = screen.getByTestId('admin_manage__input-email');
      const passwordInput = screen.getByTestId('admin_manage__input-password');
      const roleInput = screen.getByTestId('admin_manage__select-role');

      const buttonCadastr = screen.getByTestId('admin_manage__button-register');

      userEvent.type(nameInput, nameMock);
      userEvent.type(emailInput, emailMock);
      userEvent.type(passwordInput, '123456');
      userEvent.type(roleInput, 'customer');

      fireEvent.click(buttonCadastr);

      await waitFor(() => {
        const error = screen.getByTestId('admin_manage__element-invalid-register');
        expect(error).toBeInTheDocument();
      });
    },
  );
});
