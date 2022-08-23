import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CheckoutSummary from '../components/CheckoutSummary';
import SplitCheckSummary from '../components/SplitCheckSummary';

export default function ImgMediaCard() {
  return (
    <Card style={{backgroundColor:'black',height:'100vh'}}>
      <CardContent sx={{display:'flex',flexFlow:'row wrap',justifyContent:'space-evenly',marginTop:'30px'}}>
        <CheckoutSummary>
        </CheckoutSummary>
        <SplitCheckSummary>
        </SplitCheckSummary>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}
