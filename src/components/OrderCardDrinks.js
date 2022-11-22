import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActions, Typography } from '@mui/material';
import OrderSliderButton from '../components/OrderSliderButton';

export default function ActionAreaCard(props) {
  const { drink, fetch, fetchOrder } = props;

  return (
    <Card sx={{
      maxWidth: 245,
      backgroundColor: 'rgb(18, 18, 18)',
      borderRadius: '4px',
      boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
      color: 'rgb(255,255,255)',
    }}>
      <CardContent>
        <Typography variant='h5' key={drink.id} drink={drink}>{drink.name}</Typography>
      </CardContent>
      <CardActions sx={{ minWidth: '206px', display: 'flex', justifyContent: 'center' }}>
        <OrderSliderButton fetch={fetch} product={drink} fetchOrder={fetchOrder}></OrderSliderButton>
      </CardActions>
    </Card>
  );
}
