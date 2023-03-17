import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { HTTP_CREATED } from '../constants';
import { getUsersAction } from '../redux/actions';
import { postUser } from '../services/handleAdmin';
import { saveUserDataOnLocalStorage } from '../services/handleLocalStorage';
import postRegister from '../services/handleRegisterRequest';
import '../styles/Admin.css';

export default function FormRegister({ register }) {
  const history = useHistory();
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [existingUser, setExistingUser] = useState(false);
  const [role, setRole] = useState('seller');
  const [messageError, setMessageError] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const { token } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const validEmailRegex = /\S+@\S+\.\S+/i;
    const minPassword = 6;
    const minName = 12;
    const isPasswordValid = user.password.length >= minPassword;
    const isNameValid = user.name.length >= minName;

    if (validEmailRegex.test(user.email) && isPasswordValid && isNameValid) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const handleInputChange = async ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const singUp = async (e) => {
    e.preventDefault();
    const response = await postRegister(user);
    if (response.status === HTTP_CREATED) {
      saveUserDataOnLocalStorage(response.data);
      history.push('/customer/products');
    } else {
      setExistingUser(true);
      setMessageError(response.data);
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    const userData = { ...user, role };
    const response = await postUser(userData, token);
    if (response.status === HTTP_CREATED) {
      dispatch(getUsersAction(true));
    } else {
      setExistingUser(true);
      setMessageError(response.data);
    }
  };

  return (
    <>
      {!register && (
        <button
          onClick={ () => setOpen(!open) }
          type="button"
          className="accordion"
        >
          <div className={ `accordion-${open}` }>
            <p>Cadastrar novo usuário</p>
            <AiOutlineRight />
          </div>
        </button>
      )}
      {register && (
        <header className="lr-header">
          <div className="header-content">
            <img src="https://i.imgur.com/3Xxs1BG.png" alt="logo" className="logo-img" />
          </div>
        </header>
      )}
      <div className={ register ? 'lr-content' : `adm-form-${open}` }>
        {register
          ? (<h1>Cadastro</h1>)
          : (<h3 className="adm-form-title">Cadastrar novo usuário</h3>) }
        <form
          className={ register ? 'lr-form' : 'adm-form' }
          onSubmit={ (e) => (register ? singUp(e) : createUser(e)) }
        >
          <label htmlFor="Nome">
            <input
              className="txt-box"
              id="name"
              type="text"
              onChange={ (e) => handleInputChange(e) }
              data-testid={ register
                ? 'common_register__input-name'
                : 'admin_manage__input-name' }
              name="name"
              placeholder={ register ? 'Seu nome' : 'Nome do usuário' }
            />
          </label>
          <label htmlFor="email">
            <input
              className="txt-box"
              type="text"
              id="email"
              data-testid={ register
                ? 'common_register__input-email'
                : 'admin_manage__input-email' }
              name="email"
              onChange={ (e) => handleInputChange(e) }
              placeholder={ register ? 'Seu e-mail' : 'E-mail do usuário' }
            />
          </label>
          <label htmlFor="password">
            <input
              placeholder="senha"
              className="txt-box"
              id="password"
              type="password"
              onChange={ (e) => handleInputChange(e) }
              data-testid={ register
                ? 'common_register__input-password'
                : 'admin_manage__input-password' }
              name="password"
            />
          </label>
          {!register && (
            <label htmlFor="role">
              <select
                name="role"
                id="role"
                data-testid="admin_manage__select-role"
                value={ role }
                onChange={ (e) => setRole(e.target.value) }
              >
                <option value="seller">Vendedor</option>
                <option value="customer">Cliente</option>
                <option value="administrator">Administrador</option>
              </select>
            </label>
          )}
          <button
            disabled={ isButtonDisabled }
            type="submit"
            className="finish-btn"
            data-testid={ register
              ? 'common_register__button-register'
              : 'admin_manage__button-register' }
          >
            Cadastrar
          </button>
        </form>
      </div>
      { existingUser && (
        <h2
          data-testid={ register
            ? 'common_register__element-invalid_register'
            : 'admin_manage__element-invalid-register' }
        >
          {messageError}
        </h2>
      )}
    </>
  );
}

FormRegister.propTypes = {
  register: PropTypes.bool.isRequired,
};
