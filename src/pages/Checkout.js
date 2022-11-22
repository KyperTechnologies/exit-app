import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CheckoutSummary from '../components/CheckoutSummary';
import SplitCheckSummary from '../components/SplitCheckSummary';
import { useLocation } from 'react-router-dom';
import { getOrderWithTableId } from '../Config';

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
    <Card style={{ backgroundColor: 'black', height: '100vh' }}>
      <CardContent sx={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-evenly', marginTop: '30px' }}>
        <CheckoutSummary order={order}>
        </CheckoutSummary>
        <SplitCheckSummary>
        </SplitCheckSummary>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}
