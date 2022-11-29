import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckoutButton from '../Buttons/CheckoutButton';

export default function SpanningTable(props) {

  const { order, fetchOrder, splitValue } = props;

  const getTotalPrice = () => {
    return order.reduce((acc, obj) => acc + obj.totalPrice, 0);
  }

  return (
    <TableContainer component={Paper} sx={{
      backgroundColor: '#fff',
      borderRadius: '4px',
      boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
      color: 'black'
    }}>
      <Table aria-label="spanning table" >
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '100%', fontWeight: 'bold', textAlign: 'center' }}>Ürün İsmi</TableCell>
            <TableCell sx={{ fontSize: '100%', fontWeight: 'bold', textAlign: 'center' }}>Tane</TableCell>
            <TableCell sx={{ fontSize: '100%', fontWeight: 'bold', textAlign: 'center' }}>Birim Fiyat</TableCell>
            <TableCell sx={{ fontSize: '100%', fontWeight: 'bold', textAlign: 'center' }}>Tutar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.map((row) => (
            <TableRow key={row.id}>
              <TableCell sx={{ textAlign: 'center' }}>{row.nameOfOrder}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{row.value}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{row.unitPrice} ₺</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{row.totalPrice} ₺</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                <CheckoutButton row={row} fetchOrder={fetchOrder} splitValue={splitValue}></CheckoutButton>
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} sx={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>Toplam Tutar : {getTotalPrice()} ₺</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}