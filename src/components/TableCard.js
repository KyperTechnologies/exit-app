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
import { addTable } from '../Config';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function ImgMediaCard(props) {

  let navigate = useNavigate();

  const [tableName, setTableName] = useState("");
  const { table } = props;
  const { fetch } = props;
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleOpen = () => setDialogOpen(true);
  const handleClose = () => setDialogOpen(false);


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

  return (
    <React.Fragment>
      <Card sx={{
        maxWidth: 345,
        margin: '30px',
        backgroundColor: 'rgb(18, 18, 18)',
        borderRadius: '4px',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
        color: 'rgb(255,255,255)',
      }}>
        <CardActionArea onClick={handleOpen}>
          <CardContent>
            <Typography variant='h4' key={table.id}>{table.name}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ justifyContent: 'space-around' }}>
          <Button variant="outlined" startIcon={<DeleteIcon />}>SİL</Button>
          <Button size="small" onClick={() => { onButtonClickToOrder() }}>SİPARİŞ</Button>
          <Button variant="contained" onClick={() => onButtonClickToCheckout('/checkout')} endIcon={<SendIcon />}>HESAP</Button>
        </CardActions>
      </Card>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Masa Adı :</DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => { setTableName(e.target.value) }}
            autoFocus
            margin="dense"
            id="name"
            label="Masa adı giriniz :"
            type="name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Vazgeç</Button>
          <Button type='submit' onClick={addTableNameOnClick} >Kaydet</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}