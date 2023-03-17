import React from 'react';
import OrderInfo from '../../components/OrderInfo';
import OrderTable from '../../components/OrderTable';
import '../../styles/OrdersDetails.css';

function OrdersDetails() {
  return (
    <div className="order-details">
      <OrderInfo />
      <OrderTable />
    </div>
  );
}

export default OrdersDetails;
