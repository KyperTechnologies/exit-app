import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SpanningTable from './SpanningTable';

export default function ImgMediaCard() {
  return (
    <Card sx={{ maxWidth: 345,height:'100vh',display:'flex',flexDirection:'column' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Masa_Adı
        </Typography>
        <SpanningTable>

        </SpanningTable>
      </CardContent>
      <CardActions >
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
