import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import postRegister from '../services/handleRegisterRequest';

describe('Testando a pagina /register', () => {
  it('Testando a renderização do titulo', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/register');

    const title = screen.getByRole('heading', {
      name: /Cadastro/i });

    expect(title).toBeInTheDocument();
  });

  it('Testando se o botão "cadastrar" é renderizado corretamente ', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/register');

    const button = screen.getByRole('button', { name: /Cadastrar/i });
    expect(button).toBeInTheDocument();
  });

  it(
    `Testando se o botão "cadastrar" é renderizado desabilitado,
     e após inserir os dados corretamente ele é habilitado`,
    async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      history.push('/register');

      const button = screen.getByRole('button', { name: /Cadastrar/i });
      expect(button).toBeDisabled();

      const name = screen.getByTestId('common_register__input-name');
      const email = screen.getByTestId('common_register__input-email');
      const password = screen.getByTestId('common_register__input-password');

      userEvent.type(name, 'Marcos de Andrade');
      userEvent.type(email, 'marcos@hotmail.com');
      userEvent.type(password, '123456');

      expect(button).toBeEnabled();

      userEvent.click(button);

      await waitFor(() => postRegister.postRegister);
    },
  );
});
