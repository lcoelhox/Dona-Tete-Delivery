import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  CUSTOMER_ORDERS,
  ELM_CARD_ADDRESS,
  ELM_CARD_PRICE,
  ELM_DELIVERY_STATUS,
  ELM_ORDER_DATE,
  ELM_ORDER_ID,
  HTTP_OK,
  PATH_CUSTOMER,
  PATH_ORDERS,
  PATH_SELLER,
  ROLE_SELLER,
  SELLER_ORDERS,
  NUM_TENTH_CARD,
} from '../constants';
import { orderIdAction } from '../redux/actions';
import { getOrders } from '../services/handleOrders';
import '../styles/OrdersCard.css';

export default function OrdersCard() {
  const { role, token } = useSelector((state) => state.user);
  const [sales, setSales] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  const isSeller = role === ROLE_SELLER;
  const PREFIXE = isSeller ? SELLER_ORDERS : CUSTOMER_ORDERS;

  const fetchSales = async () => {
    const response = await getOrders(token);
    if (response.status === HTTP_OK) setSales(response.data);
  };

  const setDate = (date) => {
    const event = new Date(date);
    const dateFixed = event.toLocaleString('pt-BR', { timeZone: 'Europe/London' }); // Original: 'UTC'. 'Europe/London' equivale ao UTC +0. 'America/Los_Angeles', ao -8.
    return dateFixed.split(' ')[0];
  };

  const setQueue = (id) => {
    if (id >= NUM_TENTH_CARD) return `00${id}`;
    return `000${id}`;
  };

  const handleClick = (id) => {
    dispatch(orderIdAction(id));
    history.push(`${isSeller
      ? (`/${PATH_SELLER}/${PATH_ORDERS}/${id}`)
      : (`/${PATH_CUSTOMER}/${PATH_ORDERS}/${id}`)}`);
  };

  useEffect(() => {
    if (token.length > 0) fetchSales();
  }, [token]);
  return (
    <main className="sales-cards-container">
      {sales.map((
        {
          id,
          deliveryAddress,
          deliveryNumber,
          status,
          saleDate,
          totalPrice },
      ) => (
        <button
          type="button"
          className="sale-card"
          onClick={ () => handleClick(id) }
          key={ `${PREFIXE}_${id}` }
        >
          <div className="sale-queue" data-testid={ `${PREFIXE}${ELM_ORDER_ID}-${id}` }>
            <p>Pedido</p>
            <p>
              {setQueue(id)}
            </p>
          </div>
          <div className="sale-details">
            <div className="sale-content">
              <div className="sale-status">
                <p data-testid={ `${PREFIXE}${ELM_DELIVERY_STATUS}-${id}` }>
                  {status}
                </p>
              </div>
              <div className="sale-price">
                <p data-testid={ `${PREFIXE}${ELM_ORDER_DATE}-${id}` }>
                  {setDate(saleDate)}
                </p>
                <p data-testid={ `${PREFIXE}${ELM_CARD_PRICE}-${id}` }>
                  {`${totalPrice.replace('.', ',')}`}
                  {/* {`R$ ${totalPrice}`} */}
                </p>
              </div>
            </div>
            {isSeller && (
              <div className="sale-footer">
                <p data-testid={ `${PREFIXE}${ELM_CARD_ADDRESS}-${id}` }>
                  {`${deliveryAddress}, ${deliveryNumber}`}
                </p>
              </div>
            )}
          </div>
        </button>
      ))}
    </main>
  );
}
