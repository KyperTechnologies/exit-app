import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import OrderSlider from '../components/OrderSlider';
import { addOrder } from '../Config';
import { useLocation } from 'react-router-dom';
import uuid from 'react-uuid';

export default function IconButtons(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { drink, fetchOrder } = props;
  const [value, setValue] = useState(1);
  const location = useLocation();

  const handleValue = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };


  const addOrderOnClick = async () => {
    const id = uuid();

    await addOrder(id, {
      "id": id,
      "productId": drink.id,
      "tableId": location.state.tableId,
      "nameOfOrder": drink.name,
      "value": value,
      "unitPrice": Number(drink.price),
      "totalPrice": value * Number(drink.price),
    });

    await fetchOrder();
    handleClose();
  };

  return (
    <>
      <div>
        <IconButton color="primary" onClick={handleOpen} >
          <AddShoppingCartIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Ürün Miktarı</DialogTitle>
          <DialogContent>
            <OrderSlider handleValue={handleValue} value={value}></OrderSlider>
          </DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='contained' onClick={handleClose}>Vazgeç</Button>
            <Button variant='contained' onClick={addOrderOnClick}>Onayla</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}