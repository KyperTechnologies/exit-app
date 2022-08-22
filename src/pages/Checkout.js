import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

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

export default function TransferList() {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0]);
  const [right, setRight] = React.useState([4]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
  <TableContainer component={Paper} >
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
            <TableCell>
              <Paper sx={{ overflow: 'auto' }}>
                <List dense component="div" role="list">
                  {items.map((value) => {
                  const labelId = `transfer-list-item-${value}-label`;
                    return (
                      <ListItem
                        key={value}
                        role="listitem"
                        button
                        onClick={handleToggle(value)}
                      >
                          <ListItemIcon>
                            <Checkbox
                                checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            />
                          </ListItemIcon>
                        <ListItemText id={labelId} primary={row.name}/>
                      </ListItem>
                    );
                  })}
                </List>
              </Paper>
            </TableCell>
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

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
  );
}
