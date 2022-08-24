import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import SplitCheckTable from './SplitCheckTable';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CreditOwnerSelection from '../components/CreditOwnerSelection';

export default function ImgMediaCard() {

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);
  return (
    <Card sx={{ 
      maxWidth: 450,
      display:'flex',
      flexDirection:'column',
      backgroundColor: 'rgb(18, 18, 18)',
      borderRadius:'4px',
      boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
      color:'rgb(255,255,255)'}}>
      <CardContent sx={{marginTop:'50px'}}>
        <SplitCheckTable>

        </SplitCheckTable>
      </CardContent>
      <CardActions style={{justifyContent:'space-evenly'}}>
        <Button variant="outlined" color="error">Gerİ</Button>
        <Button variant="contained" onClick={handleOpen}>Veresİye Yazdır</Button>
        <Button variant="contained" color="success">ONAY</Button>
      </CardActions>
      <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{fontWeight:'bold',color:'rgb(40,100,150)',backgroundColor:'rgb(18, 18, 18)'}}>VERESİYE YAZDIRMA</DialogTitle>
        <DialogContent sx={{backgroundColor: 'rgb(18, 18, 18)'}}>
          <CreditOwnerSelection></CreditOwnerSelection>
        </DialogContent>
        <DialogActions sx={{backgroundColor: 'rgb(18, 18, 18)',justifyContent:'space-between'}}>
          <Button onClick={handleClose}>VAZGEÇ</Button>
          <Button color='success' onClick={handleClose}>YAZDIR</Button>
        </DialogActions>
      </Dialog>
      </div>
    </Card>
  );
}
