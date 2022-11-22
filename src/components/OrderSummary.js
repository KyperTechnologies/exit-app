import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OrderSummaryTable from './OrderSummaryTable';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



export default function ImgMediaCard(props) {

  const location = useLocation();
  const { order, fetchOrder, drink } = props;

  let navigate = useNavigate();

  const onButtonClick = (state) => {
    navigate(state);
  }

  return (
    <Card sx={{ maxWidth: 445, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {location.state.tableName}
        </Typography>
        <OrderSummaryTable drink={drink} order={order} fetchOrder={fetchOrder}>
        </OrderSummaryTable>
      </CardContent>
      <CardActions style={{ justifyContent: 'space-evenly' }}>
        <Button variant="outlined" color="error" onClick={() => onButtonClick('/')}>İPTAL</Button>
        <Button variant="contained" color="success" onClick={() => onButtonClick('/')}>ONAY</Button>
      </CardActions>
    </Card>
  );
}