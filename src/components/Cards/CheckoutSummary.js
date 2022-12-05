import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckoutSummaryTable from '../Tables/CheckoutSummaryTable';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CreditOwnerSelection from '../Forms/CreditOwnerSelection';
import { addCreditOrder, deleteTable } from '../../Config';
import uuid from 'react-uuid';


export default function ImgMediaCard(props) {

  let navigate = useNavigate();
  const { order, fetchOrder, tableId, tableName } = props;
  const [selectedOwner, setSelectedOwner] = useState(['']);

  const onButtonClick = (state) => {
    navigate(state);
  }
  const [open, setOpen] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCheckoutOpen = () => setOpenCheckout(true);
  const handleCheckoutClose = () => setOpenCheckout(false);

  const checkoutAll = async () => {
    await deleteTable(tableId);
    onButtonClick('/')
  }

  const handleChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setSelectedOwner(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const updateCreditOwnerOrder = (item) => {
    // eslint-disable-next-line
    return item.id, item.productId, item.nameOfOrder, item.value, item.unitPrice, item.totalPrice;
  }
  const mappedOrders = order.map(updateCreditOwnerOrder);

  const addCreditOrderOnClick = () => {
    const id = uuid();
    addCreditOrder(id, {
      "id": mappedOrders.id,
      "ownerId": selectedOwner.ownerId,
      "ownerName": selectedOwner.ownerName,
      "productId": mappedOrders.productId,
      "nameOfOrder": mappedOrders.nameOfOrder,
      "value": mappedOrders.value,
      "unitPrice": Number(mappedOrders.unitPrice),
      "totalPrice": mappedOrders.value * Number(mappedOrders.totalPrice),
    })
  }

  return (
    <Card sx={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fff',
      borderRadius: '4px',
      boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 0px 3px, rgba(0, 0, 0, 0.14) 0px 1px 1px 2px, rgba(0, 0, 0, 0.12) 0px 1px 3px 2px',
      color: 'black'
    }}>
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {tableName}
        </Typography>
        <CheckoutSummaryTable order={order} fetchOrder={fetchOrder}></CheckoutSummaryTable>
      </CardContent>
      <CardActions style={{ justifyContent: 'space-evenly' }}>
        <Button sx={{
          backgroundColor: '#612335',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#fff',
            color: 'black',
          }
        }} variant="contained" onClick={() => onButtonClick('/')}>İPTAL</Button>
        <Button sx={{
          backgroundColor: '#004225',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#fff',
            color: 'black',
          }
        }} variant="contained" onClick={handleOpen}>Veresİye Yazdır</Button>
        <Button sx={{
          backgroundColor: '#004225',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#fff',
            color: 'black',
          }
        }} variant="contained" onClick={handleCheckoutOpen}>HESABI KAPAT</Button>
      </CardActions>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ fontWeight: 'bold', color: 'rgb(40,100,150)', backgroundColor: 'rgb(18, 18, 18)' }}>VERESİYE YAZDIRMA</DialogTitle>
          <DialogContent sx={{ backgroundColor: 'rgb(18, 18, 18)' }}>
            <CreditOwnerSelection handleChange={handleChange} selectedOwner={selectedOwner}></CreditOwnerSelection>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: 'rgb(18, 18, 18)', justifyContent: 'space-between' }}>
            <Button onClick={handleClose}>VAZGEÇ</Button>
            <Button color='success' onClick={addCreditOrderOnClick}>YAZDIR</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={openCheckout}
          onClose={handleCheckoutClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" fontWeight='bold'>
            {"UYARI"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" fontWeight='bold'>
              Hesap kapatılacaktır, emin misiniz?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' sx={{ color: 'lightgoldenrodyellow', backgroundColor: '#612335', '&:hover': { backgroundColor: '#fff', color: 'black' } }} onClick={handleCheckoutClose} autoFocus>
              Tamam Değil Orhan
            </Button>
            <Button sx={{ color: 'lightgoldenrodyellow', backgroundColor: '#004625', '&:hover': { backgroundColor: '#fff', color: 'black' } }} onClick={checkoutAll} autoFocus>
              Tamam Orhan
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Card>
  );
}
