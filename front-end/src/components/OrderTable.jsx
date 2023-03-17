import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  CUSTOMER_ORDER_DETAILS,
  ELM_TABLE_NUMBER,
  ELM_TABLE_QUANTITY,
  ELM_TABLE_SUBTOTAL,
  ELM_TABLE_TOTAL_PRICE,
  ELM_TABLE_UNIT_PRICE,
  HTTP_OK,
  ROLE_SELLER,
  SELLER_ORDER_DETAILS,
} from '../constants';
import { getOrderAction, orderAction, orderIdAction } from '../redux/actions';
import { getOrderById } from '../services/handleOrders';
import '../styles/OrderTable.css';

export default function OrderTable() {
  const { controls } = useSelector((state) => state);
  const { token, role } = useSelector((state) => state.user);
  const { products, totalPrice } = useSelector((state) => state.order);
  const { location: { pathname } } = useHistory();
  const dispatch = useDispatch();

  const fetchOrderById = async () => {
    const response = await getOrderById(controls.orderId, token);
    if (response.status === HTTP_OK) {
      dispatch(orderAction(response.data));
      dispatch(getOrderAction(false));
    }
  };

  const isSeller = role === ROLE_SELLER;
  const PREFIXE = isSeller ? SELLER_ORDER_DETAILS : CUSTOMER_ORDER_DETAILS;

  useEffect(() => {
    dispatch(orderIdAction(+pathname.split('/')[3]));
    dispatch(getOrderAction(true));
  }, []);

  useEffect(() => {
    if (controls.getOrder) {
      fetchOrderById();
    }
  }, [controls]);

  const setSubTotal = (price, quantity) => {
    const subTotal = `${(+price * quantity).toFixed(2)}`;
    if (subTotal.includes('.')) {
      if (subTotal.split('.')[1].length < 2) return `${subTotal.replace('.', ',')}0`;
      return subTotal.replace('.', ',');
    }
    return `${subTotal},00`;
  };

  return (
    <main className="main-order-table">
      <table>
        <thead>
          <tr className="tr-table">
            <th className="th-table1">Item</th>
            <th className="th-table2">Descrição</th>
            <th className="th-table3">Quantidade</th>
            <th className="th-table4">Valor Unitário</th>
            <th className="th-table5">Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {products.map(({ product: { id, name, price }, quantity }, index) => (
            <tr className="tr-table-result" key={ id }>
              <td
                className="tr-table-result1"
                data-testid={ `${PREFIXE}${ELM_TABLE_NUMBER}-${index}` }
              >
                {index + 1}
              </td>
              <td
                className="tr-table-result2"
                data-testid={ `${PREFIXE}${ELM_TABLE_NUMBER}-${index}` }
              >
                {name}
              </td>
              <td
                className="tr-table-result3"
                data-testid={ `${PREFIXE}${ELM_TABLE_QUANTITY}-${index}` }
              >
                {quantity}
              </td>
              <td
                className="tr-table-result4"
                data-testid={ `${PREFIXE}${ELM_TABLE_UNIT_PRICE}-${index}` }
              >
                {price.replace('.', ',')}
              </td>
              <td
                className="tr-table-result5"
                data-testid={ `${PREFIXE}${ELM_TABLE_SUBTOTAL}-${index}` }
              >
                {setSubTotal(price, quantity)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="tot-price" data-testid={ `${PREFIXE}${ELM_TABLE_TOTAL_PRICE}` }>
        {`${totalPrice.replace('.', ',')}`}
        {/* {`Total: R$ ${totalPrice.replace('.', ',')}`} */}
      </p>
    </main>
  );
}
