import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HTTP_DELETED, HTTP_OK, ROLE_CUSTOMER, ROLE_SELLER } from '../constants';
import { getUsersAction } from '../redux/actions';
import { deleteUser, getUsers } from '../services/handleAdmin';

export default function TableAdmin() {
  const { token } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const { controls } = useSelector((state) => state);
  const dispatch = useDispatch();

  const fetchUsers = async () => {
    const response = await getUsers(token);
    if (response.status === HTTP_OK) setUsers(response.data);
  };

  const handleClick = async (id) => {
    const response = await deleteUser(id, token);
    if (response.status === HTTP_DELETED) fetchUsers();
  };

  const setRole = (role) => {
    switch (role) {
    case ROLE_SELLER:
      return 'P. Vendedora';
    case ROLE_CUSTOMER:
      return 'Cliente';
    default:
      return null;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (controls.getUsers) {
      fetchUsers();
      dispatch(getUsersAction(false));
    }
  }, [controls]);

  return (
    <section className="table-adm-container">
      <h3>Lista de usuários</h3>
      <table className="table-adm">
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, name, email, role }, index) => (
            <tr key={ id }>
              <td
                className="td-item"
                data-testid={ `admin_manage__element-user-table-item-number-${index}` }
              >
                {index + 1}
              </td>
              <td
                className="td-name"
                data-testid={ `admin_manage__element-user-table-name-${index}` }
              >
                {name}
              </td>
              <td
                className="td-email"
                data-testid={ `admin_manage__element-user-table-email-${index}` }
              >
                {email}
              </td>
              <td
                className="td-role"
                data-testid={ `admin_manage__element-user-table-role-${index}` }
              >
                {setRole(role)}
              </td>
              <td
                className="td-button"
              >
                <button
                  type="button"
                  data-testid={ `admin_manage__element-user-table-remove-${index}` }
                  onClick={ () => handleClick(id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
