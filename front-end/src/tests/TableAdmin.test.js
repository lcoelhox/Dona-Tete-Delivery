import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import TableAdmin from '../components/TableAdmin';
import { getUsersAction } from '../redux/actions/index';
import { deleteUser, getUsers } from '../services/handleAdmin';
import { HTTP_DELETED, HTTP_OK, ROLE_CUSTOMER, ROLE_SELLER } from '../constants';

jest.mock('react-redux');
jest.mock('../redux/actions');
jest.mock('../services/handleAdmin');

describe('TableAdmin', () => {
  beforeEach(() => {
    useSelector.mockImplementation((callback) => callback({
      user: { token: 'token',
        role: 'administrator',
        email: 'adm@deliveryapp.com',
        name: 'Delivery App Admin' },
      controls: { getUsers: false },
    }));
  });

  afterEach(() => {
    useSelector.mockClear();
    getUsersAction.mockClear();
    deleteUser.mockClear();
    getUsers.mockClear();
  });
  const email1 = 'robertocarlos@example.com';
  const email2 = 'ronaldonazario@example.com';
  const roberto = 'Roberto Carlos';
  const ronaldo = 'Ronaldo Nazario';

  it('renderizar a tabela com usuarios', async () => {
    const users = [
      { id: 1, name: roberto, email: email1, role: ROLE_SELLER },
      { id: 2, name: ronaldo, email: email2, role: ROLE_CUSTOMER },
    ];
    getUsers.mockResolvedValue({ status: HTTP_OK, data: users });

    render(<TableAdmin />);

    expect(getUsers).toHaveBeenCalledWith('token');
    expect(await screen.findByTestId('admin_manage__element-user-table-item-number-0'))
      .toHaveTextContent('1');
    expect(screen.getByTestId('admin_manage__element-user-table-name-0'))
      .toHaveTextContent(roberto);
    expect(screen.getByTestId('admin_manage__element-user-table-email-0'))
      .toHaveTextContent(email1);
    expect(screen.getByTestId('admin_manage__element-user-table-role-0'))
      .toHaveTextContent('P. Vendedora');
    expect(screen.getByTestId('admin_manage__element-user-table-item-number-1'))
      .toHaveTextContent('2');
    expect(screen.getByTestId('admin_manage__element-user-table-name-1'))
      .toHaveTextContent(ronaldo);
    expect(screen.getByTestId('admin_manage__element-user-table-email-1'))
      .toHaveTextContent(email2);
    expect(screen.getByTestId('admin_manage__element-user-table-role-1'))
      .toHaveTextContent('Cliente');
  });

  it('deletar um usuario ao clicar no botão excluir', async () => {
    const users = [
      { id: 1, name: roberto, email: email1, role: ROLE_SELLER },
      { id: 2, name: ronaldo, email: email2, role: ROLE_CUSTOMER },
    ];
    getUsers.mockResolvedValue({ status: HTTP_OK, data: users });
    deleteUser.mockResolvedValue({ status: HTTP_DELETED });
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    render(<TableAdmin />);

    const deleteButton = await screen
      .findByTestId('admin_manage__element-user-table-remove-1');
    fireEvent.click(deleteButton);

    expect(deleteUser).toHaveBeenCalledWith(2, 'token');
    expect(getUsers).toHaveBeenCalledWith('token');
    // console.log(deleteUser);
    // const name = await screen.findByTestId('admin_manage__element-user-table-name-1');
    // await waitFor(() => expect(name).not.toBeInTheDocument());
    // expect(dispatch).toHaveBeenCalledWith(getUsersAction(false));
  });
});
