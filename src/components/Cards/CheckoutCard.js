import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CheckoutSummary from '../Cards/CheckoutSummary';
import { useLocation } from 'react-router-dom';
import { getOrderWithTableId } from '../../Config';

export default function ImgMediaCard() {

  const [order, setOrder] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchOrderData();
    // eslint-disable-next-line
  }, [])

  async function fetchOrderData() {
    const orderData = await getOrderWithTableId(location.state.tableId);
    if (orderData && orderData.length > 0) {
      setOrder(orderData);
    }
  }

  return (
    <Card style={{ height: '100vh', backgroundColor: '#612335' }}>
      <CardContent sx={{ marginTop: '70px' }}>
        <CheckoutSummary order={order} fetchOrder={fetchOrderData} tableId={location.state.tableId} tableName={location.state.tableName} >
        </CheckoutSummary>
      </CardContent>
    </Card>
  );
}
