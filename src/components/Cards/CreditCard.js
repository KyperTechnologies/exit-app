import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { CardActionArea, DialogContentText } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import { TextField } from '@mui/material';
import { deleteCredit, getCreditWithOwnerName, updateCredit } from '../../Config';

const GreenBorderTextField = styled(TextField)`
& label.Mui-focused {
  color: #004625;
}
& .MuiOutlinedInput-root {
  &.Mui-focused fieldset {
    border-color: #004625;
  }
}
`;

export default function ImgMediaCard(props) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { credit, totalPrice, setCredit } = props;
  const [value, setValue] = useState([]);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const handleErrorOpen = () => setErrorOpen(true);
  const handleErrorClose = () => setErrorOpen(false);

  async function fetchData() {
    const creditOwnerData = await getCreditWithOwnerName(credit.ownerName);
    if (creditOwnerData && creditOwnerData.length > 0) {
      setCredit(creditOwnerData);
    }
  }

  const deleteButtonClicked = async () => {
    const credits = await getCreditWithOwnerName(credit.ownerName);
    if (credits && credits.length > 0) {
      handleErrorOpen();
      return;
    }
    else {
      await deleteCredit(credit.ownerName);
      await fetch();
    }
  }

  const updateOnClick = async () => {

    const newValue = Number(totalPrice) - value;
    const newCredit = { ...credit, totalPrice: totalPrice - newValue };
    updateCredit(newCredit);
    handleClose();
    await fetchData();
  }


  return (
    <Card sx={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: "#F6F8E8",
      borderRadius: '4px',
      boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 0px 3px, rgba(0, 0, 0, 0.14) 0px 1px 1px 2px, rgba(0, 0, 0, 0.12) 0px 1px 3px 2px',
      color: 'black',
      minWidth: '250px',
    }}>
      <CardActionArea onClick={handleOpen}>
        <CardContent>
          <Typography variant='h4'>{credit.ownerName}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent: 'space-around' }}>
        <Button style={{ backgroundColor: "#612335" }} variant="contained" startIcon={<DeleteIcon />} onClick={deleteButtonClicked}>SİL</Button>
      </CardActions>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ fontWeight: 'bold', color: 'black', backgroundColor: '#fff' }}>VERESİYE ÖDEME ALMA</DialogTitle>
          <DialogContent sx={{ backgroundColor: '#fff' }}>
            <DialogContentText>Toplam Veresiye Tutarı : {totalPrice} ₺</DialogContentText>
            <GreenBorderTextField
              onChange={(event) => { setValue(event.target.value) }}
              autoFocus
              margin="dense"
              id="name"
              label="Alıancak Tutar"
              type="text"
              fullWidth
              variant="outlined"
            />

          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#fff', justifyContent: 'space-between' }}>
            <Button sx={{ color: '#fff', backgroundColor: '#612335', '&:hover': { backgroundColor: '#fff', color: 'black' } }} variant='contained' onClick={handleClose}>Vazgeç</Button>
            <Button sx={{ color: '#fff', backgroundColor: '#004225', '&:hover': { backgroundColor: '#fff', color: 'black' } }} color='success' onClick={updateOnClick}>ÖDEME AL</Button>
          </DialogActions>
        </Dialog>
        <div>
          <Dialog
            open={errorOpen}
            onClose={handleErrorClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" fontWeight='bold'>
              {"Veresiye Silinemedi"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" fontWeight='bold'>
                Kişiye ait veresiye alacak bulunmaktadır.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color='success' variant='contained' backgroundColor='#004625' onClick={handleErrorClose} autoFocus>
                Tamam
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </Card>
  );
}