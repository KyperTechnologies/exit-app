import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { CardActionArea, Typography, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import { addTable, deleteTable, getOrderWithTableId } from '../../Config';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import styled from 'styled-components';



export default function ImgMediaCard(props) {

  let navigate = useNavigate();

  const [tableName, setTableName] = useState("");
  const { table } = props;
  const { fetch } = props;
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleOpen = () => setDialogOpen(true);
  const handleClose = () => setDialogOpen(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const handleErrorOpen = () => setErrorOpen(true);
  const handleErrorClose = () => setErrorOpen(false);

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


  const onButtonClickToOrder = () => {
    navigate('/order', { state: { tableId: table.id, tableName: table.name } });
  }
  const onButtonClickToCheckout = (state) => {
    navigate('/checkout', { state: { tableId: table.id, tableName: table.name } });
  }

  const addTableNameOnClick = () => {
    addTable(table.id, {
      "id": table.id,
      "name": tableName,

    });
    handleClose();
    fetch();
  }

  const deleteButtonClicked = async () => {
    const orders = await getOrderWithTableId(table.id);
    if (orders && orders.length > 0) {
      handleErrorOpen();
      return;
    }
    await deleteTable(table.id);
    fetch();
  }

  return (
    <React.Fragment>
      <Card sx={{
        margin: '30px',
        backgroundColor: "#F6F8E8",
        borderRadius: '4px',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 2px, rgba(0, 0, 0, 0.12) 0px 1px 3px 2px',
        color: "#00",
      }}>
        <CardActionArea onClick={handleOpen}>
          <CardContent>
            <Typography variant='h4' key={table.id}>{table.name}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ justifyContent: 'space-around' }}>
          <Button style={{ backgroundColor: "#612335" }} variant="contained" onClick={deleteButtonClicked} startIcon={<DeleteIcon />}>SİL</Button>
          <Button style={{ color: "#004225", borderColor: "#004225" }} variant='outlined' onClick={() => { onButtonClickToOrder() }}>SİPARİŞ</Button>
          <Button style={{ backgroundColor: "#004225" }} variant="contained" onClick={() => onButtonClickToCheckout('/checkout')} endIcon={<SendIcon />}>HESAP</Button>
        </CardActions>
      </Card>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle fontSize='200%' fontWeight='bold'>Yeni Masa Adı :</DialogTitle>
        <DialogContent>
          <GreenBorderTextField
            onChange={(e) => { setTableName(e.target.value) }}
            autoFocus
            margin="dense"
            id="name"
            label="Masa adı giriniz :"
            type="name"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' sx={{ backgroundColor: '#612335', color: 'lightgoldenrodyellow', '&:hover': { backgroundColor: '#fff', color: 'black' } }} onClick={handleClose}>Vazgeç</Button>
          <Button variant='contained' sx={{ backgroundColor: '#004625', color: 'lightgoldenrodyellow', '&:hover': { backgroundColor: '#fff', color: 'black' } }} type='submit' onClick={addTableNameOnClick} >Kaydet</Button>
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
            {"Masa Silinemedi"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" fontWeight='bold'>
              Masaya ait hesap bulunmaktadır, önce masadaki hesabı kapatınız.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color='success' variant='contained' backgroundColor='#004625' onClick={handleErrorClose} autoFocus>
              Tamam
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </React.Fragment>
  );
}