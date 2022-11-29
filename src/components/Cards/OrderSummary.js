import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import OrderSummaryTable from '../Tables/OrderSummaryTable';

export default function ImgMediaCard(props) {

  const { order, fetchOrder, drink } = props;

  return (
    <Card sx={{
      position: 'fixed',
      backgroundColor: '#612335',
      minHeight: '100vh',
      boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 0px 3px, rgba(0, 0, 0, 0.14) 0px 1px 1px 2px, rgba(0, 0, 0, 0.12) 0px 1px 3px 2px',
    }}>
      <CardContent>
        <OrderSummaryTable drink={drink} order={order} fetchOrder={fetchOrder}>
        </OrderSummaryTable>
      </CardContent>
    </Card>
  );
}