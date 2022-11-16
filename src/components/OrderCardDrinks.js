import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActions, Typography } from '@mui/material';
import OrderSliderButton from '../components/OrderSliderButton';
import { getDrink } from '../Config';

export default function ActionAreaCard() {
  const [drink, setDrink] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    const drinkData = await getDrink();
    if (drinkData && drinkData.length > 0) {
      setDrink(drinkData);
    }
  }

  return (
    <Card sx={{
      maxWidth: 245,
      backgroundColor: 'rgb(18, 18, 18)',
      borderRadius: '4px',
      boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
      color: 'rgb(255,255,255)',
    }}>
      <CardContent>
        {drink.map(element => {
          return (
            <Typography key={drink.id}>
              A
            </Typography>
          );
        })}
      </CardContent>
      <CardActions sx={{ minWidth: '206px', display: 'flex', justifyContent: 'center' }}>
        <OrderSliderButton></OrderSliderButton>
      </CardActions>
    </Card>
  );
}
