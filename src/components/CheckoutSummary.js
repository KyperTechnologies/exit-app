import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckoutSummaryTable from './CheckoutSummaryTable';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CreditOwnerSelection from '../components/CreditOwnerSelection';
import { deleteTable } from '../Config';

export default function ImgMediaCard(props) {

  let navigate = useNavigate();
  const { order, fetchOrder, tableId, tableName } = props;

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

  return (
    <Card sx={{
      maxWidth: 450,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'rgb(18, 18, 18)',
      borderRadius: '4px',
      boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
      color: 'rgb(255,255,255)'
    }}>
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {tableName}
        </Typography>
        <CheckoutSummaryTable order={order} fetchOrder={fetchOrder}></CheckoutSummaryTable>
      </CardContent>
      <CardActions style={{ justifyContent: 'space-evenly' }}>
        <Button variant="outlined" color="error" onClick={() => onButtonClick('/')}>İPTAL</Button>
        <Button variant="contained" onClick={handleOpen}>Veresİye Yazdır</Button>
        <Button variant="contained" color="success" onClick={handleCheckoutOpen}>HESABI KAPAT</Button>
      </CardActions>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ fontWeight: 'bold', color: 'rgb(40,100,150)', backgroundColor: 'rgb(18, 18, 18)' }}>VERESİYE YAZDIRMA</DialogTitle>
          <DialogContent sx={{ backgroundColor: 'rgb(18, 18, 18)' }}>
            <CreditOwnerSelection></CreditOwnerSelection>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: 'rgb(18, 18, 18)', justifyContent: 'space-between' }}>
            <Button onClick={handleClose}>VAZGEÇ</Button>
            <Button color='success' onClick={handleClose}>YAZDIR</Button>
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
          <DialogTitle id="alert-dialog-title">
            {"UYARI"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Hesap kapatılacaktır, emin misiniz?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color='warning' onClick={handleCheckoutClose} autoFocus>
              Tamam Değil Orhan
            </Button>
            <Button color='success' onClick={checkoutAll} autoFocus>
              Tamam Orhan
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Card>
  );
}
