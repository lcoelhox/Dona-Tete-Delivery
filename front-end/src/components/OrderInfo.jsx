import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BUTTON_DELIVERY_CHECK,
  BUTTON_DISPATCH_CHECK,
  BUTTON_PREPARING_CHECK,
  CUSTOMER_ORDER_DETAILS,
  DELIVERY_DELIVERED,
  ELM_DETAILS_DELIVERY_STATUS,
  ELM_DETAILS_ORDER_DATE,
  ELM_DETAILS_ORDER_ID,
  ELM_DETAILS_SELLER_NAME,
  HTTP_UPDATED,
  DELIVERY_IN_TRANSIT,
  DELIVERY_PENDING,
  DELIVERY_PREPARING,
  ROLE_SELLER,
  SELLER_ORDER_DETAILS,
  NUM_TENTH_CARD,
} from '../constants';
import { getOrderAction } from '../redux/actions';
import { changeStatus } from '../services/handleOrders';
import '../styles/OrderInfo.css';

export default function OrderInfo() {
  const { role, token } = useSelector((state) => state.user);
  const { seller, orderId, saleDate, status } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const isSeller = role === ROLE_SELLER;
  const PREFIXE = isSeller ? SELLER_ORDER_DETAILS : CUSTOMER_ORDER_DETAILS;

  const setQueue = (id) => {
    if (id >= NUM_TENTH_CARD) return `00${id}`;
    return `000${id}`;
  };

  const setDate = (date) => {
    const event = new Date(date);
    const dateFixed = event.toLocaleString('pt-BR', { timeZone: 'Europe/London' }); // Original: 'UTC'. 'Europe/London' equivale ao UTC +0. 'America/Los_Angeles', ao -8.
    return dateFixed.split(' ')[0];
  };

  const setBody = () => {
    switch (status) {
    case DELIVERY_PENDING:
      return { status: DELIVERY_PREPARING };
    case DELIVERY_PREPARING:
      return { status: DELIVERY_IN_TRANSIT };
    case DELIVERY_IN_TRANSIT:
      return { status: DELIVERY_DELIVERED };
    default:
      return null;
    }
  };

  const handleClick = async () => {
    const body = setBody();
    const response = await changeStatus(body, orderId, token);
    if (response.status === HTTP_UPDATED) dispatch(getOrderAction(true));
  };

  return (
    <section className="section-order">
      <p className="txt-pedido" data-testid={ `${PREFIXE}${ELM_DETAILS_ORDER_ID}` }>
        {`PEDIDO ${setQueue(orderId)}`}
      </p>
      {!isSeller && (
        <p className="txt-pedido4" data-testid={ `${PREFIXE}${ELM_DETAILS_SELLER_NAME}` }>
          {`P. Vend: ${seller}`}
        </p>
      )}
      <p className="txt-pedido2" data-testid={ `${PREFIXE}${ELM_DETAILS_ORDER_DATE}` }>
        {setDate(saleDate)}
      </p>
      <p
        className="txt-pedido3"
        data-testid={ `${PREFIXE}${ELM_DETAILS_DELIVERY_STATUS}` }
      >
        {status}
        {/* {status.toUpperCase()} */}
      </p>
      {isSeller && (
        <button
          className="button-pedido"
          data-testid={ `${PREFIXE}${BUTTON_PREPARING_CHECK}` }
          type="button"
          disabled={ status !== DELIVERY_PENDING }
          onClick={ handleClick }
        >
          PREPARAR PEDIDO
        </button>
      )}
      <button
        className="button-pedido"
        data-testid={ isSeller
          ? `${PREFIXE}${BUTTON_DISPATCH_CHECK}`
          : `${PREFIXE}${BUTTON_DELIVERY_CHECK}` }
        type="button"
        disabled={ isSeller
          ? (status !== 'Preparando')
          : (status !== DELIVERY_IN_TRANSIT) }
        onClick={ handleClick }
      >
        {isSeller ? 'SAIU PARA ENTREGA' : 'MARCAR COMO ENTREGUE'}
      </button>
    </section>
  );
}
