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
  const { credit, totalPrice, fetch } = props;
  const [value, setValue] = useState([]);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const handleErrorOpen = () => setErrorOpen(true);
  const handleErrorClose = () => setErrorOpen(false);
  const [error2Open, setError2Open] = React.useState(false);
  const handleError2Open = () => setError2Open(true);
  const handleError2Close = () => setError2Open(false);

  const deleteCreditWithDebt = async () => {
    await deleteCredit(credit.ownerId);
    handleErrorClose();
    await fetch();
  }


  const deleteButtonClicked = async () => {
    const credits = await getCreditWithOwnerName(credit.ownerName);
    if (credits && credits.length > 0) {
      handleErrorOpen();
      return;
    }
    else {
      await deleteCredit(credit.ownerId);
      await fetch();
    }

  }

  const updateOnClick = async () => {

    const newValue = Number(totalPrice) - value;
    if (newValue >= 0) {
      const newCredit = { ...credit, totalPrice: newValue };
      updateCredit(newCredit);
    }
    else {
      handleError2Open();
    }
    handleClose();
    await fetch();
  }


  return (
    <Card sx={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: "#F6F8E8",
      borderRadius: '4px',
      boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 0px 3px, rgba(0, 0, 0, 0.14) 0px 1px 1px 2px, rgba(0, 0, 0, 0.12) 0px 1px 3px 2px',
      color: 'black',
      margin: '30px',
      minWidth: '250px',
    }}>
      <CardActionArea onClick={handleOpen}>
        <CardContent>
          <Typography variant='h4'>{credit.ownerName}</Typography>

          {totalPrice > 999 &&
            <Typography variant='h6' sx={{ color: 'red' }}>Veresiye hesabı: {Number(totalPrice)} ₺</Typography>
          }
          {totalPrice <= 999 &&
            <Typography variant='h6'>Veresiye hesabı: {Number(totalPrice)} ₺</Typography>
          }
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
                Kişiye ait veresiye alacak bulunmaktadır. Silmek istediğinize emin misiniz?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color='success' variant='contained' backgroundColor='#004625' onClick={handleErrorClose} autoFocus>
                Hayır
              </Button>
              <Button color='success' variant='contained' backgroundColor='#004625' onClick={deleteCreditWithDebt} autoFocus>
                Evet
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <Dialog
            open={error2Open}
            onClose={handleError2Close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" fontWeight='bold'>
              {"Veresiye Silinemedi"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" fontWeight='bold'>
                Kalan tutar sıfırdan küçük olmamalıdır , lütfen tekrar kontrol ediniz.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color='success' variant='contained' backgroundColor='#004625' onClick={handleError2Close} autoFocus>
                Tamam
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </Card>
  );
}