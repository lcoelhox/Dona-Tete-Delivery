import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveCartAcion } from '../../redux/actions';
import { getSellers, postOrder } from '../../services/handleCheckoutRequests';
import { saveCartOnLocalStorage } from '../../services/handleLocalStorage';
import useAuthFetch from '../../services/useAuthFetch';
import SelectWithOptions from '../../components/SelectWithOptions';
import {
  BUTTON_SUBMIT_ORDER,
  CUSTOMER_CHECKOUT,
  ELM_TABLE_NAME,
  ELM_TABLE_NUMBER,
  ELM_TABLE_QUANTITY,
  ELM_TABLE_REMOVE,
  ELM_TABLE_SUBTOTAL,
  ELM_TABLE_TOTAL_PRICE,
  ELM_TABLE_UNIT_PRICE,
  INPUT_ADDRESS,
  INPUT_ADDRESS_NUMBER,
  PATH_CUSTOMER,
  PATH_ORDERS,
  SELECT_SELLER,
} from '../../constants';
import '../../styles/Checkout.css';

function Checkout() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [data] = useAuthFetch(getSellers);
  const { cart: { currentCart }, user: { token } } = useSelector((state) => state);
  const [sellerId, setSellerId] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  // Botao FINALIZAR PEDIDO: limpar cart (estado e LS), mostrar msg na tela, enviar pedido pro BE, encaminhar pra id do pedido

  // Validations
  const isDisabled = !(sellerId && deliveryAddress && deliveryNumber);

  // Handlers
  const handleRemoveButtonCLick = ({ target: { dataset: { id } } }) => {
    const { [id]: productRemovedFromCart, ...newCart } = currentCart;
    saveCartOnLocalStorage(newCart);
    dispatch(saveCartAcion(newCart));
  };

  const handleSellerSelectOnChange = ({ target: { value } }) => setSellerId(+value);

  const handleAddressInputOnChange = ({ target: { value } }) => setDeliveryAddress(value);

  const handleAddressNumberInputOnChange = ({ target: { value } }) => {
    const isInputValidNumber = +value >= 0 || value === '';
    if (isInputValidNumber) setDeliveryNumber(value);
  };

  const totalPrice = useMemo(() => Object.values(currentCart)
    .reduce((accTotal, currProduct) => {
      const currTotal = currProduct.price * currProduct.quantity;

      return accTotal + currTotal;
    }, 0)
    .toFixed(2), [currentCart]);

  const handleSubmitOrder = async (event) => {
    event.preventDefault();

    const products = Object.values(currentCart || {})
      .map(({ id, quantity }) => ({ id, quantity }));
    const priceToNumber = Number(totalPrice);
    const orderRequest = {
      sellerId,
      totalPrice: priceToNumber,
      deliveryAddress,
      deliveryNumber: `${deliveryNumber}`,
      products,
    };

    const { userData: { id } } = await postOrder(token, orderRequest);
    saveCartOnLocalStorage({});
    dispatch(saveCartAcion({}));
    history.push(`/${PATH_CUSTOMER}/${PATH_ORDERS}/${id}`);
  };

  // Rendering
  const renderRemoveProductButton = (index, id) => (
    <button
      data-testid={ `${CUSTOMER_CHECKOUT}${ELM_TABLE_REMOVE}-${index}` }
      data-id={ id }
      type="button"
      onClick={ handleRemoveButtonCLick }
    >
      Remover
    </button>
  );

  const renderProductsForCheckoutTable = () => {
    const productsFromCartArray = Object.values(currentCart || {});
    // const productsFromCartArray = [...Object.values(currentCart || {})].reverse();
    const productsForCheckoutArray = productsFromCartArray
      .map(({ id, name, price, quantity }, index) => {
        const adjustedIndex = index + 1;
        const subTotal = (price * quantity).toFixed(2).replace('.', ',');

        const product = (
          <tr key={ id } className="td-line">
            <td
              data-testid={ `${CUSTOMER_CHECKOUT}${ELM_TABLE_NUMBER}-${index}` }
              className="td-item"
            >
              { adjustedIndex }
            </td>
            <td
              data-testid={ `${CUSTOMER_CHECKOUT}${ELM_TABLE_NAME}-${index}` }
              className="td-name"
            >
              { name }
            </td>
            <td
              data-testid={ `${CUSTOMER_CHECKOUT}${ELM_TABLE_QUANTITY}-${index}` }
              className="td-quantity"
            >
              { quantity }
            </td>
            <td
              data-testid={ `${CUSTOMER_CHECKOUT}${ELM_TABLE_UNIT_PRICE}-${index}` }
              className="td-price"
            >
              { price.replace('.', ',') }
            </td>
            <td
              data-testid={ `${CUSTOMER_CHECKOUT}${ELM_TABLE_SUBTOTAL}-${index}` }
              className="td-subtotal"
            >
              { subTotal }
            </td>
            <td className="td-button">
              { renderRemoveProductButton(index, id) }
            </td>
          </tr>
        );

        return product;
      });

    const productsTable = (
      <table className="table-checkout">
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          { productsForCheckoutArray }
        </tbody>
      </table>
    );

    return productsTable;
  };

  const renderTotalPrice = () => (
    <div className="total-price">
      <span>
        { 'Total: ' }
      </span>
      <span
        data-testid={ `${CUSTOMER_CHECKOUT}${ELM_TABLE_TOTAL_PRICE}` }
      >
        { totalPrice.replace('.', ',') }
      </span>
    </div>
  );

  return (
    <>
      <div>
        <h3>Finalizar Pedido</h3>
        <div className="table-checkout-container">
          { renderProductsForCheckoutTable() }
          { renderTotalPrice() }
        </div>
      </div>
      <div>
        <h3>Detalhes e Endereço para Entrega</h3>
        <div className="form-checkout-complete">
          <form onSubmit={ handleSubmitOrder } className="form-checkout">
            <SelectWithOptions
              dataTestId={ `${CUSTOMER_CHECKOUT}${SELECT_SELLER}` }
              data={ data.userData || [] }
              name="seller"
              id="seller"
              value={ sellerId }
              onChange={ handleSellerSelectOnChange }
              className="form-select"
              placeholder="Vendedora Responsável"
            />
            <input
              data-testid={ `${CUSTOMER_CHECKOUT}${INPUT_ADDRESS}` }
              type="text"
              name="address"
              value={ deliveryAddress }
              onChange={ handleAddressInputOnChange }
              className="txt-box"
              placeholder="Endereço"
            />
            <input
              data-testid={ `${CUSTOMER_CHECKOUT}${INPUT_ADDRESS_NUMBER}` }
              type="text"
              name="addressNumber"
              value={ deliveryNumber }
              onChange={ handleAddressNumberInputOnChange }
              className="txt-box"
              placeholder="Número"
            />
            <button
              data-testid={ `${CUSTOMER_CHECKOUT}${BUTTON_SUBMIT_ORDER}` }
              type="submit"
              disabled={ isDisabled }
              className="checkout-button"
            >
              FINALIZAR PEDIDO
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Checkout;
