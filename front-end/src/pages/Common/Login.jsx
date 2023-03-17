import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  HTTP_OK,
  NUM_PASSWORD_MIN_LENGTH,
  PATH_ADMIN,
  PATH_CUSTOMER, PATH_MANAGE,
  PATH_ORDERS,
  PATH_PRODUCTS,
  PATH_REGISTER,
  PATH_SELLER,
  REGEX_EMAIL,
  ROLE_ADMIN,
  ROLE_CUSTOMER,
  ROLE_SELLER,
} from '../../constants';
import { userLoginAction } from '../../redux/actions';
import {
  getUserDataOnLocalStorage,
  saveUserDataOnLocalStorage,
} from '../../services/handleLocalStorage';
import postLogin from '../../services/handleLoginRequests';
import '../../styles/Common.css';

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isUserNotFound, setUserIsNotFound] = useState(false);

  // Validation
  const validateInputFields = () => {
    const isEmailValid = REGEX_EMAIL.test(emailInput);
    const isPasswordValid = passwordInput.length > NUM_PASSWORD_MIN_LENGTH;
    const areAllInputsValid = isEmailValid && isPasswordValid;

    return areAllInputsValid;
  };

  const isDisabled = !validateInputFields();

  // Handlers
  const handleEmailInput = ({ target: { value } }) => setEmailInput(value);

  const handlePasswordInput = ({ target: { value } }) => setPasswordInput(value);

  const saveUserDataAndGoToNextPage = (userData) => {
    saveUserDataOnLocalStorage(userData);
    dispatch(userLoginAction(userData));

    const isUserAdmin = userData.role === ROLE_ADMIN;
    const isUserCostumer = userData.role === ROLE_CUSTOMER;
    const isUserSeller = userData.role === ROLE_SELLER;

    if (isUserAdmin) return history.push(`/${PATH_ADMIN}/${PATH_MANAGE}`);
    if (isUserCostumer) return history.push(`/${PATH_CUSTOMER}/${PATH_PRODUCTS}`);
    if (isUserSeller) return history.push(`/${PATH_SELLER}/${PATH_ORDERS}`);
  };

  const handleLoginResponse = (response) => {
    const { userData, status } = response;
    const isLoginResponseValid = status === HTTP_OK;
    if (isLoginResponseValid) {
      saveUserDataAndGoToNextPage(userData);
    } else {
      setUserIsNotFound(true);
    }
  };

  const handleEnterButtonClick = async (event) => {
    event.preventDefault();
    const request = { email: emailInput, password: passwordInput };
    const response = await postLogin(request);
    handleLoginResponse(response);
  };

  const handleRegisterButtonClick = () => {
    history.push(`/${PATH_REGISTER}`);
  };

  useEffect(() => {
    const userFromLocalStorage = getUserDataOnLocalStorage();
    const isUserFound = Object.keys(userFromLocalStorage).length > 0;
    if (isUserFound) saveUserDataAndGoToNextPage(userFromLocalStorage);
  }, []);

  // Rendering
  const renderInvalidEmailOrPasswordMessage = () => (
    <div data-testid="common_login__element-invalid-email">
      Email ou senha inválidos
    </div>
  );

  return (
    <div className="lr-container">
      <div className="lr-card">
        <header className="lr-header">
          <div className="header-content">
            <img src="https://i.imgur.com/3Xxs1BG.png" alt="logo" className="logo-img" />
          </div>
        </header>
        <div className="lr-content">
          <h1>Login</h1>
          <form
            className="lr-form"
            onSubmit={ handleEnterButtonClick }
          >
            <input
              className="txt-box"
              data-testid="common_login__input-email"
              type="email"
              placeholder="Email"
              name="emailInput"
              value={ emailInput }
              onChange={ handleEmailInput }
            />
            <input
              className="txt-box"
              data-testid="common_login__input-password"
              type="password"
              placeholder="Password"
              name="passwordInput"
              value={ passwordInput }
              onChange={ handlePasswordInput }
            />
            <button
              className="finish-btn"
              data-testid="common_login__button-login"
              type="submit"
              disabled={ isDisabled }
            >
              LOGIN
            </button>
            <button
              className="register-btn"
              data-testid="common_login__button-register"
              type="button"
              onClick={ handleRegisterButtonClick }
            >
              Ainda não tenho conta
            </button>
            { isUserNotFound && renderInvalidEmailOrPasswordMessage() }
          </form>
        </div>
      </div>
    </div>
  );
}
