import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TAX_RATE = 0;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(name, qty, unit) {
  const price = priceRow(qty, unit);
  return { name, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Çay', 5, 4),
  createRow('Kahve', 2, 12),
  createRow('Soda', 2, 10),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function SpanningTable() {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 345 }}>
      <Table  aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontSize:'80%',fontWeight:'bold'}}>Ürün İsmi</TableCell>
            <TableCell sx={{fontSize:'80%',fontWeight:'bold'}}>Tane</TableCell>
            <TableCell sx={{fontSize:'80%',fontWeight:'bold'}}>Birim Fiyat</TableCell>
            <TableCell sx={{fontSize:'80%',fontWeight:'bold'}}>Tutar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell >{row.qty}</TableCell>
              <TableCell >{row.unit}</TableCell>
              <TableCell >{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} sx={{fontSize:'20px',fontWeight:'bold'}}>Toplam Tutar :</TableCell>
            <TableCell>{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}