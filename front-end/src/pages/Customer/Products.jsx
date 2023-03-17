import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveCartAcion } from '../../redux/actions';
import { saveCartOnLocalStorage } from '../../services/handleLocalStorage';
import getProducts from '../../services/handleProductsRequests';
import useAuthFetch from '../../services/useAuthFetch';
import {
  BUTTON_ADD_ITEM,
  BUTTON_CART,
  BUTTON_RM_ITEM,
  CHECKOUT_BOTTOM_VALUE,
  CUSTOMER_PRODUCTS,
  ELM_CARD_PRICE,
  ELM_CARD_TITLE,
  IMG_CARD,
  INPUT_CARD_QUANTITY,
  PATH_CHECKOUT,
  PATH_CUSTOMER,
} from '../../constants';
import '../../styles/Products.css';

function Products() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [data] = useAuthFetch(getProducts);
  const { cart: { currentCart } } = useSelector((state) => state);
  const [productQuantity, setProductQuantity] = useState(currentCart);

  // Handlers
  const handleAddButtonClick = ({ target: { dataset: { id, name, price } } }) => {
    setProductQuantity((prevState) => {
      const newState = { ...prevState,
        [id]: {
          quantity: (prevState[id]?.quantity || 0) + 1,
          name,
          price,
          id,
        } };

      return newState;
    });
  };

  const handleRemoveButtonClick = ({ target: { dataset: { id } } }) => {
    setProductQuantity((prevState) => {
      const isProductInCart = prevState[id]?.quantity;
      const newQuantity = (isProductInCart)
        ? prevState[id].quantity - 1
        : 0;

      const isProductStillInCart = newQuantity > 0;
      if (isProductStillInCart) {
        const newState = {
          ...prevState,
          [id]: {
            ...prevState[id],
            quantity: newQuantity,
          },
        };

        return newState;
      }
      const { [id]: productRemovedFromCart, ...newState } = prevState;

      return newState;
    });
  };

  const handleInputOnChange = ({ target: { value, dataset: { id, name, price } } }) => {
    const isInputZero = +value === 0;
    if (isInputZero) {
      return setProductQuantity((prevState) => {
        const { [id]: productRemovedFromCart, ...newState } = prevState;

        return newState;
      });
    }

    const isInputValidNumber = +value > 0;
    if (isInputValidNumber) {
      return setProductQuantity((prevState) => {
        const newState = {
          ...prevState,
          [id]: {
            quantity: +value,
            name,
            price,
            id,
          },
        };

        return newState;
      });
    }
  };

  useEffect(() => {
    const saveCart = () => {
      saveCartOnLocalStorage(productQuantity);
      dispatch(saveCartAcion(productQuantity));
    };
    saveCart();
  }, [productQuantity]);

  // Rendering
  const renderProductsCards = () => {
    const productsCardsArray = data?.userData && data?.userData
      .map(({ id, name, price, urlImage }) => {
        const card = (
          <div
            key={ id }
            className="product-card"
          >
            <div
              data-testid={ `${CUSTOMER_PRODUCTS}${ELM_CARD_PRICE}-${id}` }
              className="product-card-price"
            >
              {'R$ '}
              { price.replace('.', ',') }
            </div>
            <img
              className="product-image"
              data-testid={ `${CUSTOMER_PRODUCTS}${IMG_CARD}-${id}` }
              src={ urlImage }
              alt={ `${name}-product` }
            />
            <div className="product-card-bottom">
              <div
                data-testid={ `${CUSTOMER_PRODUCTS}${ELM_CARD_TITLE}-${id}` }
                className="product-card-bottom-name"
              >
                { name }
              </div>
              <div className="product-card-bottom-buttons">
                <button
                  data-testid={ `${CUSTOMER_PRODUCTS}${BUTTON_RM_ITEM}-${id}` }
                  data-id={ id }
                  type="button"
                  onClick={ handleRemoveButtonClick }
                  className="product-card-bottom-button button-"
                >
                  -
                </button>
                <input
                  data-testid={ `${CUSTOMER_PRODUCTS}${INPUT_CARD_QUANTITY}-${id}` }
                  data-id={ id }
                  data-name={ name }
                  data-price={ price }
                  type="text"
                  onChange={ handleInputOnChange }
                  value={ productQuantity[id]?.quantity || 0 }
                  className="product-card-bottom-0"
                />
                <button
                  data-testid={ `${CUSTOMER_PRODUCTS}${BUTTON_ADD_ITEM}-${id}` }
                  data-id={ id }
                  data-name={ name }
                  data-price={ price }
                  type="button"
                  onClick={ handleAddButtonClick }
                  className="product-card-bottom-button button--"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        );

        return card;
      });

    return productsCardsArray;
  };

  const renderCartPriceAndButton = () => {
    const totalPrice = Object.values(productQuantity)
      .reduce((accTotalPrice, currProduct) => {
        const currTotalPrice = currProduct.quantity * currProduct.price;

        return accTotalPrice + currTotalPrice;
      }, 0)
      .toFixed(2)
      .replace('.', ',');
    const isDisable = totalPrice === '0,00';

    return (
      <div
        to="/customer/checkout"
        className="cart-div"
      >
        <button
          data-testid={ `${CUSTOMER_PRODUCTS}${BUTTON_CART}` }
          type="button"
          onClick={ () => history.push(`/${PATH_CUSTOMER}/${PATH_CHECKOUT}`) }
          disabled={ isDisable }
          className="cart"
        >
          {'Ver carrinho: '}
          <div
            data-testid={ `${CUSTOMER_PRODUCTS}${CHECKOUT_BOTTOM_VALUE}` }
          >
            {'R$ '}
            { totalPrice }
          </div>
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="products-container">
        { data.userData && renderProductsCards() }
      </div>
      { renderCartPriceAndButton() }
    </div>
  );
}

export default Products;
