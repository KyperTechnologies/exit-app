import React, { useState, useEffect } from 'react';
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
import CreditSelectTab from "../Tabs/CreditSelectTab";
import { deleteTable, getCredit, addCredit, getCreditWithOwnerName } from '../../Config';
import uuid from 'react-uuid';

export default function ImgMediaCard(props) {

  let navigate = useNavigate();
  const { order, fetchOrder, tableId, tableName } = props;

  const onButtonClick = (state) => {
    navigate(state);
  }
  const [open, setOpen] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [creditOwnerName, setCreditOwnerName] = useState([]);
  const [credit, setCredit] = useState([]);
  const [selectValue, setSelectValue] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCheckoutOpen = () => setOpenCheckout(true);
  const handleCheckoutClose = () => setOpenCheckout(false);

  const handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;
    setSelectValue(value);
    setCreditOwnerName(value);
  };

  const checkoutAll = async () => {
    await deleteTable(tableId);
    onButtonClick('/')
  }


  useEffect(() => {
    fetchData();
  },)

  async function fetchData() {
    const creditOwnerData = await getCredit();
    if (creditOwnerData && creditOwnerData.length > 0) {
      setCredit(creditOwnerData);
    }
    const creditOwnerDataWithName = await getCreditWithOwnerName(selectValue);
    if (creditOwnerDataWithName && creditOwnerDataWithName.length > 0) {
      setCredit(creditOwnerDataWithName);
    }
  }

  const getTotalPrice = () => {
    return order.reduce((acc, obj) => acc + obj.totalPrice, 0);
  }

  const addCreditOnClick = async () => {
    const id = uuid();
    addCredit(id, {
      'ownerId': id,
      'ownerName': creditOwnerName,
      'totalPrice': getTotalPrice(),
    })
    handleClose();
    checkoutAll();
    fetchData();
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
      <React.Fragment>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ fontWeight: 'bold', color: 'black', backgroundColor: '#fff' }}>VERESİYE YAZDIRMA</DialogTitle>
          <DialogContent sx={{ backgroundColor: '#fff' }}>
            <CreditSelectTab creditOwner={creditOwnerName} credit={credit} setCreditOwnerName={setCreditOwnerName} selectValue={selectValue} handleChangeSelect={handleChangeSelect}></CreditSelectTab>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between' }}>
            <Button sx={{ color: '#fff', backgroundColor: '#612335', '&:hover': { backgroundColor: '#fff', color: 'black' } }} variant='contained' onClick={handleClose}>VAZGEÇ</Button>
            <Button sx={{ color: '#fff', backgroundColor: '#004225', '&:hover': { backgroundColor: '#fff', color: 'black' } }} variant='contained' onClick={addCreditOnClick}>YAZDIR</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
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
