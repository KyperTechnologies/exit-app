import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import Slider from '../components/Slider';

export default function IconButtons() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(1);

  const handleValue = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  return (
    <>
      <div>
        <IconButton color="primary" aria-label="add to shopping cart">
          <AddShoppingCartIcon onClick={handleOpen} />
        </IconButton>
      </div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Ürün Ayır</DialogTitle>
          <DialogContent>
            <Slider handleValue={handleValue} value={value}></Slider>
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
