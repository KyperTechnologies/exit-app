import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OrderSummaryTable from './OrderSummaryTable';
import { useNavigate } from 'react-router-dom';
import { getOrderWithTableId } from '../Config';
import { useLocation } from 'react-router-dom';

export default function ImgMediaCard() {

  const [order, setOrder] = useState([]);
  const location = useLocation();
  let navigate = useNavigate();

  const onButtonClick = (state) => {
    navigate(state);
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [])

  async function fetchData() {
    const orderData = await getOrderWithTableId(location.state.tableId);
    if (orderData && orderData.length > 0) {
      setOrder(orderData);
    }
  }

  return (
    <Card sx={{ maxWidth: 345, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {location.state.tableName}
        </Typography>
        <OrderSummaryTable order={order}>
        </OrderSummaryTable>
      </CardContent>
      <CardActions style={{ justifyContent: 'space-evenly' }}>
        <Button variant="outlined" color="error" onClick={() => onButtonClick('/')}>İPTAL</Button>
        <Button variant="contained" color="success" onClick={() => onButtonClick('/')}>ONAY</Button>
      </CardActions>
    </Card>
  );
}