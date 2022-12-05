import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActions, Typography } from '@mui/material';
import OrderSliderButton from '../Buttons/OrderSliderButton';

export default function ActionAreaCard(props) {
  const { food, fetch, fetchOrder } = props;

  return (
    <Card sx={{
      backgroundColor: '#fff',
      borderRadius: '4px',
      boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px 2px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
      color: 'black',
    }}>
      <CardContent>
        <Typography variant='h5' key={food.id} food={food}>{food.name}</Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <OrderSliderButton fetch={fetch} product={food} fetchOrder={fetchOrder}></OrderSliderButton>
      </CardActions>
    </Card>
  );
}