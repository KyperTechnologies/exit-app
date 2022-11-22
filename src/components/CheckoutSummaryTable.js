import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SplitCheckButton from '../components/SplitCheckButton';

export default function SpanningTable(props) {

  const { order } = props;

  const getTotalPrice = () => {
    return order.reduce((acc, obj) => acc + obj.totalPrice, 0);
  }

  return (
    <TableContainer component={Paper} sx={{
      maxWidth: 450,
      backgroundColor: 'rgb(18, 18, 18)',
      borderRadius: '4px',
      boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
      color: 'rgb(255,255,255)'
    }}>
      <Table aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '90%', fontWeight: 'bold', color: 'rgb(40,100,150)' }}>Ürün İsmi</TableCell>
            <TableCell sx={{ fontSize: '90%', fontWeight: 'bold', color: 'rgb(40,100,150)' }}>Tane</TableCell>
            <TableCell sx={{ fontSize: '90%', fontWeight: 'bold', color: 'rgb(40,100,150)' }}>Birim Fiyat</TableCell>
            <TableCell sx={{ fontSize: '90%', fontWeight: 'bold', color: 'rgb(40,100,150)' }}>Tutar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.map((row) => (
            <TableRow key={row.name}>
              <TableCell sx={{ color: 'rgb(255,255,255)', textAlign: 'center' }}>{row.nameOfOrder}</TableCell>
              <TableCell sx={{ color: 'rgb(255,255,255)', textAlign: 'center' }}>{row.value}</TableCell>
              <TableCell sx={{ color: 'rgb(255,255,255)', textAlign: 'center' }}>{row.unitPrice}</TableCell>
              <TableCell sx={{ color: 'rgb(255,255,255)', textAlign: 'center' }}>{row.totalPrice}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                <SplitCheckButton></SplitCheckButton>
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} sx={{ fontSize: '20px', fontWeight: 'bold', color: 'rgb(255,255,255)', textAlign: 'center' }}>Toplam Tutar :</TableCell>
            <TableCell sx={{ color: 'rgb(255,255,255)', textAlign: 'center' }}>{getTotalPrice()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}