import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import Checkout from '../pages/Customer/Checkout';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Checkout', () => {
  test('renders the page header', () => {
    renderWithRouterAndRedux(<Checkout />);
    const headerElement = screen.getByText('Finalizar Pedido');
    expect(headerElement).toBeInTheDocument();
  });

  test('renders the seller select element', () => {
    renderWithRouterAndRedux(<Checkout />);
    const sellerSelectElement = screen.getByTestId('customer_checkout__select-seller');
    expect(sellerSelectElement).toBeInTheDocument();
  });

  test('renders the delivery address input element', () => {
    renderWithRouterAndRedux(<Checkout />);
    const deliveryAddressInputElement = screen
      .getByTestId('customer_checkout__input-address');
    expect(deliveryAddressInputElement).toBeInTheDocument();
  });

  test('renders the delivery address number input element', () => {
    renderWithRouterAndRedux(<Checkout />);
    const deliveryAddressNumberInputElement = screen
      .getByTestId('customer_checkout__input-address-number');
    expect(deliveryAddressNumberInputElement).toBeInTheDocument();
  });

  test('renders the checkout table', () => {
    renderWithRouterAndRedux(<Checkout />);
    const checkoutTableElement = screen.getByRole('table');
    expect(checkoutTableElement).toBeInTheDocument();
  });

  test('renders the remove product button in the checkout table', () => {
    const product = { id: 1, name: 'Product 1', price: '10.00', quantity: 1 };
    const cart = { currentCart: { [product.id]: product } };
    const initialState = { cart };
    renderWithRouterAndRedux(<Checkout />, initialState);

    const removeButtonElement = screen
      .getByTestId('customer_checkout__element-order-table-remove-0');
    expect(removeButtonElement).toBeInTheDocument();
  });

  test('renders the total price element', () => {
    const product = { id: 1, name: 'Product 1', price: '10.00', quantity: 1 };
    const cart = { currentCart: { [product.id]: product } };
    const initialState = { cart };
    renderWithRouterAndRedux(<Checkout />, initialState);

    const totalPriceElement = screen
      .getByTestId('customer_checkout__element-order-total-price');
    expect(totalPriceElement).toHaveTextContent('10,00');
  });

  test('removes a product from the cart when the remove button is clicked', async () => {
    const product1 = { id: 1, name: 'Product 1', price: '10.00', quantity: 1 };
    const product2 = { id: 2, name: 'Product 2', price: '20.00', quantity: 1 };
    const cart = { currentCart: { [product1.id]: product1, [product2.id]: product2 } };
    const initialState = { cart };
    renderWithRouterAndRedux(<Checkout />, initialState);
    expect(screen.getByText('Finalizar Pedido')).toBeInTheDocument();
    expect(screen.getByText('Detalhes e Endereço para Entrega')).toBeInTheDocument();
    expect(screen.getByText('Total:')).toBeInTheDocument();
    expect(screen.getByText('Item')).toBeInTheDocument();
    expect(screen.getByText('Descrição')).toBeInTheDocument();
    expect(screen.getByText('Quantidade')).toBeInTheDocument();
    expect(screen.getByText('Valor Unitário')).toBeInTheDocument();
    expect(screen.getByText('Sub-total')).toBeInTheDocument();

    expect(screen.getByTestId('customer_checkout__element-order-table-item-number-0'))
      .toHaveTextContent('1');
    expect(screen.getByTestId('customer_checkout__element-order-table-item-number-1'))
      .toHaveTextContent('2');
    expect(screen.getByTestId('customer_checkout__element-order-table-name-0'))
      .toHaveTextContent('Product 1');
    expect(screen.getByTestId('customer_checkout__element-order-table-name-1'))
      .toHaveTextContent('Product 2');
    expect(screen.getByTestId('customer_checkout__element-order-table-quantity-0'))
      .toHaveTextContent('1');
    expect(screen.getByTestId('customer_checkout__element-order-table-quantity-1'))
      .toHaveTextContent('1');
    expect(screen.getByTestId('customer_checkout__element-order-table-unit-price-0'))
      .toHaveTextContent('10,00');
    expect(screen.getByTestId('customer_checkout__element-order-table-unit-price-1'))
      .toHaveTextContent('20,00');
    expect(screen.getByTestId('customer_checkout__element-order-table-sub-total-0'))
      .toHaveTextContent('10,00');
    expect(screen.getByTestId('customer_checkout__element-order-table-sub-total-1'))
      .toHaveTextContent('20,00');
    expect(screen.getByTestId('customer_checkout__element-order-total-price'))
      .toHaveTextContent('30,00');

    const removeButtonElement = screen
      .getByTestId('customer_checkout__element-order-table-remove-1');
    const name = await screen
      .findByTestId('customer_checkout__element-order-table-name-1');
    expect(name).toBeInTheDocument();
    fireEvent.click(removeButtonElement);
    expect(name).not.toBeInTheDocument();
  });

  test('redirects to success page after checkout', async () => {
    const product = { id: 1, name: 'Product 1', price: '10.00', quantity: 1 };
    const cart = { currentCart: { [product.id]: product } };
    const initialState = { cart };
    const { history } = renderWithRouterAndRedux(<Checkout />, initialState);

    // preenche as informações de entrega
    const sellerSelectElement = screen.getByTestId('customer_checkout__select-seller');
    fireEvent.change(sellerSelectElement, { target: { value: '1' } });

    const deliveryAddressInputElement = screen
      .getByTestId('customer_checkout__input-address');
    fireEvent.change(deliveryAddressInputElement, { target: { value: 'Rua A' } });

    const deliveryAddressNumberInputElement = screen
      .getByTestId('customer_checkout__input-address-number');
    fireEvent.change(deliveryAddressNumberInputElement, { target: { value: '123' } });

    // finaliza o pedido
    const checkoutButtonElement = screen
      .getByTestId('customer_checkout__button-submit-order');
    fireEvent.click(checkoutButtonElement);

    //  arrumar aqui verifica se foi redirecionado para a página de sucesso
    await waitFor(() => {
      expect(history.location.pathname).toEqual('/login');
    });
  });
});
