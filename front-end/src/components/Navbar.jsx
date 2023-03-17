import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import {
  CUSTOMER_PRODUCTS,
  ELM_NAV_LOGOUT,
  ELM_NAV_ORDERS,
  ELM_NAV_PRODUCTS,
  ELM_NAV_USERNAME,
  PATH_ADMIN,
  PATH_CUSTOMER,
  PATH_LOGIN,
  PATH_MANAGE,
  PATH_ORDERS,
  PATH_SELLER,
  ROLE_ADMIN,
  ROLE_CUSTOMER,
  ROLE_SELLER,
} from '../constants';
import { saveCartAcion, userLoginAction } from '../redux/actions';
import {
  getCartOnLocalStorage,
  getUserDataOnLocalStorage,
} from '../services/handleLocalStorage';
import '../styles/Navbar.css';
import { executeLogout } from '../utils';

function Navbar({ children }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

  // Validation
  useEffect(() => {
    const restoreUserAndCart = (userFromLocalStorage) => {
      dispatch(userLoginAction(userFromLocalStorage));
      const isCustomer = userFromLocalStorage.role === ROLE_CUSTOMER;
      if (isCustomer) {
        const cartFromLocalStorage = getCartOnLocalStorage();
        dispatch(saveCartAcion(cartFromLocalStorage));
      }
    };

    const verifyIfUserIsLogged = () => {
      const isUserReducerEmpty = user.token.length === 0;
      if (isUserReducerEmpty) {
        const userFromLocalStorage = getUserDataOnLocalStorage();
        const isUserNotFound = Object.keys(userFromLocalStorage).length === 0;
        if (isUserNotFound) return history.push(`/${PATH_LOGIN}`);
        restoreUserAndCart(userFromLocalStorage);
      }
    };
    verifyIfUserIsLogged();
  }, []);

  const isNotLogged = user.token.length === 0;

  const currentUser = {
    isAdmin: user.role === ROLE_ADMIN,
    isCustomer: user.role === ROLE_CUSTOMER,
    isSeller: user.role === ROLE_SELLER,
  };

  // Handlers
  const handleLogoutButtonClick = () => {
    executeLogout(history, dispatch);
  };

  // Rendering
  const renderLinks = (
    <div className="nav-link">
      <NavLink
        className="nav-link a"
        id="5"
        data-testid={ `${CUSTOMER_PRODUCTS}${ELM_NAV_ORDERS}` }
        to={
          (currentUser.isCustomer && `/${PATH_CUSTOMER}/${PATH_ORDERS}`)
          || (currentUser.isSeller && `/${PATH_SELLER}/${PATH_ORDERS}`)
          || (currentUser.isAdmin && `/${PATH_ADMIN}/${PATH_MANAGE}`)
        }
      >
        { currentUser.isCustomer && 'Meus pedidos' }
        { currentUser.isSeller && 'Pedidos' }
        { currentUser.isAdmin && 'Gerenciar Usuários' }
      </NavLink>
      { currentUser.isCustomer && (
        <NavLink
          data-testid={ `${CUSTOMER_PRODUCTS}${ELM_NAV_PRODUCTS}` }
          to="/customer/products"
          className="nav-link a"
          id="6"
        >
          Produtos
        </NavLink>) }
    </div>
  );

  const renderLogoutButton = (
    <button
      className="nav-button"
      data-testid={ `${CUSTOMER_PRODUCTS}${ELM_NAV_LOGOUT}` }
      type="button"
      onClick={ handleLogoutButtonClick }
    >
      Sair
    </button>
  );

  const renderUserName = (
    <div
      className="nav-name"
      data-testid={ `${CUSTOMER_PRODUCTS}${ELM_NAV_USERNAME}` }
    >
      { user.name }
    </div>
  );

  if (isNotLogged) return null;
  return (
    <>
      <header className="navbar">
        { renderLinks }
        <div className="nav-empty" />
        { renderUserName }
        { renderLogoutButton }
      </header>
      { children }
    </>
  );
}

Navbar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Navbar;
