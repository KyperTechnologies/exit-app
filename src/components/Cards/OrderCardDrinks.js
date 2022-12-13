import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActions, Typography } from '@mui/material';
import OrderSliderButton from '../Buttons/OrderSliderButton';

export default function ActionAreaCard(props) {
  const { drink, fetch, fetchOrder } = props;

  return (
    <Card sx={{
      backgroundColor: '#fff',
      borderRadius: '4px',
      boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px 2px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
      color: 'black',
      minWidth: '150px'
    }}>
      <CardContent>
        <Typography variant='h5' key={drink.id} drink={drink}>{drink.name}</Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <OrderSliderButton fetch={fetch} product={drink} fetchOrder={fetchOrder}></OrderSliderButton>
      </CardActions>
    </Card>
  );
}
