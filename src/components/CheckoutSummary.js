import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckoutSummaryTable from './CheckoutSummaryTable';
import { useNavigate } from 'react-router-dom';

export default function ImgMediaCard() {

  let navigate = useNavigate();

  const onButtonClick = (state) => {
    navigate(state);
  }
  return (
    <Card sx={{ 
        maxWidth: 450,
        display:'flex',
        flexDirection:'column',
        backgroundColor: 'rgb(18, 18, 18)',
        borderRadius:'4px',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
        color:'rgb(255,255,255)'}}>
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          Masa_Adı
        </Typography>
        <CheckoutSummaryTable>
        </CheckoutSummaryTable>

      </CardContent>
      <CardActions style={{justifyContent:'space-evenly'}}>
        <Button variant="outlined" color="error" onClick={() => onButtonClick('/')}>İPTAL</Button>
        <Button variant="contained" onClick={() => onButtonClick('/')}>Veresİye Yazdır</Button>
        <Button variant="contained" color="success" onClick={() => onButtonClick('/')}>ONAY</Button>
      </CardActions>
    </Card>
  );
}
