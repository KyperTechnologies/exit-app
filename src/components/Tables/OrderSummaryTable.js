import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CancelOrderButton from '../Buttons/CancelOrderButton';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function SpanningTable(props) {
  const { order, fetchOrder } = props;
  const location = useLocation();
  let navigate = useNavigate();

  const getTotalPrice = () => {
    return order.reduce((acc, obj) => acc + obj.totalPrice, 0);
  }
  const onButtonClick = (state) => {
    navigate(state);
  }

  return (
    <TableContainer component={Paper}>
      <TableCell sx={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
        <Typography gutterBottom variant="h4" component="div" sx={{ display: 'flex', textAlign: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
          {location.state.tableName}
        </Typography>
      </TableCell>
      <Table aria-label="spanning table" sx={{ backgroundColor: '#fff' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '100%', fontWeight: 'bold' }}>Ürün İsmi</TableCell>
            <TableCell sx={{ fontSize: '100%', fontWeight: 'bold' }}>Tane</TableCell>
            <TableCell sx={{ fontSize: '100%', fontWeight: 'bold' }}>Birim Fiyat</TableCell>
            <TableCell sx={{ fontSize: '100%', fontWeight: 'bold' }}>Tutar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.map((row) => (
            <TableRow key={row.id} >
              <TableCell sx={{ textAlign: 'center' }} >{row.nameOfOrder}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{row.value}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{row.unitPrice} ₺</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{row.totalPrice} ₺</TableCell>
              <TableCell>
                <CancelOrderButton order={row} fetchOrder={fetchOrder}></CancelOrderButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={6} sx={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>Toplam Tutar: {getTotalPrice()} ₺</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <TableCell sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Button style={{ backgroundColor: "#612335" }} variant="contained" onClick={() => onButtonClick('/')}>İPTAL</Button>
        <Button variant="contained" style={{ backgroundColor: "#004225" }} onClick={() => onButtonClick('/')}>ONAY</Button>
      </TableCell>
    </TableContainer>
  );
}