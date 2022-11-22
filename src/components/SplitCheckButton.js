import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import CheckoutSlider from '../components/CheckoutSlider';

export default function IconButtons(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(1);
  const { orderValue } = props;

  const handleValue = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  return (
    <>
      <div>
        <IconButton onClick={handleOpen} color="primary" aria-label="add to shopping cart">
          <AddShoppingCartIcon />
        </IconButton>
      </div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Ürün Ayır</DialogTitle>
          <DialogContent onClick={console.log(orderValue)}>
            <CheckoutSlider handleValue={handleValue} value={value} orderValue={orderValue}></CheckoutSlider>
          </DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='contained' onClick={handleClose}>Vazgeç</Button>
            <Button variant='contained' onClick={handleClose}>Ayır</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
