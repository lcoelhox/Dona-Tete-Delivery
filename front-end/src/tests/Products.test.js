import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import {
  ROLE_CUSTOMER,
  BUTTON_ADD_ITEM,
  BUTTON_CART,
  BUTTON_RM_ITEM,
  CHECKOUT_BOTTOM_VALUE,
  CUSTOMER_PRODUCTS,
  ELM_CARD_TITLE,
  INPUT_CARD_QUANTITY,
  HTTP_OK,
  COMMON_LOGIN,
  INPUT_EMAIL,
  INPUT_PASSWORD,
  BUTTON_LOGIN,
} from '../constants';

const mockLoginResponse = {
  data: {
    name: 'Nome',
    email: 'email@email.com',
    role: ROLE_CUSTOMER,
    token: 'token-fake',
  },
  status: HTTP_OK,
};

const mockProductsResponse = {
  data: [
    {
      id: 1,
      name: 'Skol Lata 250ml',
      price: '2.20',
      urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
    },
    {
      id: 2,
      name: 'Heineken 600ml',
      price: '7.50',
      urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
    },
    {
      id: 3,
      name: 'Antarctica Pilsen 300ml',
      price: '2.49',
      urlImage: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
    },
    {
      id: 4,
      name: 'Brahma 600ml',
      price: '7.50',
      urlImage: 'http://localhost:3001/images/brahma_600ml.jpg',
    },
    {
      id: 5,
      name: 'Skol 269ml',
      price: '2.19',
      urlImage: 'http://localhost:3001/images/skol_269ml.jpg',
    },
    {
      id: 6,
      name: 'Skol Beats Senses 313ml',
      price: '4.49',
      urlImage: 'http://localhost:3001/images/skol_beats_senses_313ml.jpg',
    },
    {
      id: 7,
      name: 'Becks 330ml',
      price: '4.99',
      urlImage: 'http://localhost:3001/images/becks_330ml.jpg',
    },
    {
      id: 8,
      name: 'Brahma Duplo Malte 350ml',
      price: '2.79',
      urlImage: 'http://localhost:3001/images/brahma_duplo_malte_350ml.jpg',
    },
    {
      id: 9,
      name: 'Becks 600ml',
      price: '8.89',
      urlImage: 'http://localhost:3001/images/becks_600ml.jpg',
    },
    {
      id: 10,
      name: 'Skol Beats Senses 269ml',
      price: '3.57',
      urlImage: 'http://localhost:3001/images/skol_beats_senses_269ml.jpg',
    },
    {
      id: 11,
      name: 'Stella Artois 275ml',
      price: '3.49',
      urlImage: 'http://localhost:3001/images/stella_artois_275ml.jpg',
    },
  ],
  status: HTTP_OK,
};

const mockOrderDetailResponse = {
  data: [],
  status: HTTP_OK,
};

describe('Testing Products', () => {
  beforeEach(async () => {
    jest.spyOn(axios, 'post').mockResolvedValueOnce(mockLoginResponse);
    jest.spyOn(axios, 'get').mockResolvedValueOnce(mockProductsResponse);
    jest.spyOn(axios, 'get').mockResolvedValueOnce(mockOrderDetailResponse);
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(`${COMMON_LOGIN}${INPUT_EMAIL}`);
    userEvent.type(emailInput, 'email@email.com');

    const passwordInput = screen.getByTestId(`${COMMON_LOGIN}${INPUT_PASSWORD}`);
    userEvent.type(passwordInput, 'qwerty');

    const loginButton = screen.getByTestId(`${COMMON_LOGIN}${BUTTON_LOGIN}`);
    await waitFor(() => expect(loginButton).toBeEnabled());
    userEvent.click(loginButton);
  });

  afterEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
  });

  test('All products are listed', async () => {
    const thirdProduct = await screen
      .findByTestId(`${CUSTOMER_PRODUCTS}${ELM_CARD_TITLE}-3`);
    const tenthProduct = await screen
      .findByTestId(`${CUSTOMER_PRODUCTS}${ELM_CARD_TITLE}-10`);

    expect(thirdProduct).toHaveProperty('textContent', 'Antarctica Pilsen 300ml');
    expect(tenthProduct).toHaveProperty('textContent', 'Skol Beats Senses 269ml');
  });

  test('Products can be added and removed from the cart', async () => {
    const cartPrice = await screen
      .findByTestId(`${CUSTOMER_PRODUCTS}${CHECKOUT_BOTTOM_VALUE}`);
    expect(cartPrice).toHaveProperty('textContent', '0,00');

    const thirdProductRemove = await screen
      .findByTestId(`${CUSTOMER_PRODUCTS}${BUTTON_RM_ITEM}-3`);
    userEvent.click(thirdProductRemove);
    expect(cartPrice).toHaveProperty('textContent', '0,00');

    const thirdProductAdd = await screen
      .findByTestId(`${CUSTOMER_PRODUCTS}${BUTTON_ADD_ITEM}-3`);
    userEvent.click(thirdProductAdd);
    expect(cartPrice).toHaveProperty('textContent', '2,49');

    const tenthProductAdd = await screen
      .findByTestId(`${CUSTOMER_PRODUCTS}${BUTTON_ADD_ITEM}-10`);
    userEvent.click(tenthProductAdd);
    userEvent.click(tenthProductAdd);
    expect(cartPrice).toHaveProperty('textContent', '9,63');

    const tenthProductRemove = await screen
      .findByTestId(`${CUSTOMER_PRODUCTS}${BUTTON_RM_ITEM}-10`);
    userEvent.click(tenthProductRemove);
    expect(cartPrice).toHaveProperty('textContent', '6,06');

    const secondProductInput = await screen
      .findByTestId(`${CUSTOMER_PRODUCTS}${INPUT_CARD_QUANTITY}-2`);
    userEvent.type(secondProductInput, '0');
    expect(cartPrice).toHaveProperty('textContent', '6,06');

    userEvent.type(secondProductInput, 'a');
    expect(cartPrice).toHaveProperty('textContent', '6,06');

    userEvent.type(secondProductInput, '2');
    expect(cartPrice).toHaveProperty('textContent', '21,06');

    userEvent.clear(secondProductInput);
    expect(cartPrice).toHaveProperty('textContent', '6,06');

    const thirdProductQuantity = await screen
      .findByTestId(`${CUSTOMER_PRODUCTS}${INPUT_CARD_QUANTITY}-3`);
    expect(thirdProductQuantity).toHaveProperty('value', '1');

    const tenthProductQuantity = await screen
      .findByTestId(`${CUSTOMER_PRODUCTS}${INPUT_CARD_QUANTITY}-10`);
    expect(tenthProductQuantity).toHaveProperty('value', '1');
    expect(secondProductInput).toHaveProperty('value', '0');

    const cartButton = await screen.findByTestId(`${CUSTOMER_PRODUCTS}${BUTTON_CART}`);
    await act(async () => userEvent.click(cartButton));
  });
});
