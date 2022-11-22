import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CancelOrderButton from '../components/CancelOrderButton';

export default function SpanningTable(props) {
  const { order, fetchOrder } = props;

  const getTotalPrice = () => {
    return order.reduce((acc, obj) => acc + obj.totalPrice, 0);
  }

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 445 }}>
      <Table aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '80%', fontWeight: 'bold' }}>Ürün İsmi</TableCell>
            <TableCell sx={{ fontSize: '80%', fontWeight: 'bold' }}>Tane</TableCell>
            <TableCell sx={{ fontSize: '80%', fontWeight: 'bold' }}>Birim Fiyat</TableCell>
            <TableCell sx={{ fontSize: '80%', fontWeight: 'bold' }}>Tutar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.map((row) => (
            <TableRow key={row.id}>
              <TableCell sx={{ textAlign: 'center' }}>{row.nameOfOrder}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{row.value}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{row.unitPrice}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{row.totalPrice}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                <CancelOrderButton
                  unitPrice={row.unitPrice} orderName={row.nameOfOrder} orderValue={row.value} orderId={row.id} orderPrdctId={row.productId} fetchOrder={fetchOrder}></CancelOrderButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={6} sx={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>Toplam Tutar: {getTotalPrice()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}