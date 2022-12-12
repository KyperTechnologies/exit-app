import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import CheckoutSlider from '../Sliders/CheckoutSlider';
import { updateOrder, deleteOrder, addSplitOrder } from '../../Config';

export default function IconButtons(props) {
  const { row, fetchOrder, fetchSplitData } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newValue, setValue] = useState(1);

  const addSplitOnClick = () => {
    addSplitOrder("split", {
      "value": newValue,
      "totalSplitPrice": Number(row.unitPrice) * newValue
    })
  };


  const handleValue = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const updateOnClick = async () => {

    const value = Number(row.value) - newValue;

    if (value === 0) {
      await deleteOrder(row.id);
    } else {
      const newOrder = { ...row, value: value, totalPrice: Number(row.unitPrice) * value };
      await updateOrder(newOrder);
      addSplitOnClick();
    }

    await fetchOrder();
    await fetchSplitData();
    handleClose();
  }

  return (
    <>
      <div>
        <IconButton style={{ backgroundColor: "#612335" }} onClick={handleOpen} color="primary" aria-label="add to shopping cart">
          <PointOfSaleIcon style={{ color: "#fff" }} />
        </IconButton>
      </div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Ürün Ayır</DialogTitle>
          <DialogContent>
            <CheckoutSlider handleValue={handleValue} newValue={newValue} orderValue={row.value}></CheckoutSlider>
          </DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button sx={{
              backgroundColor: '#004225',
              '&:hover': {
                backgroundColor: '#612335',
                color: 'lightgoldenrodyellow',
              }
            }}
              variant='contained' onClick={handleClose}>Vazgeç</Button>
            <Button
              sx={{
                backgroundColor: '#004225',
                '&:hover': {
                  backgroundColor: '#612335',
                  color: 'lightgoldenrodyellow',
                }
              }}
              variant='contained' onClick={updateOnClick}>Ayır</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
