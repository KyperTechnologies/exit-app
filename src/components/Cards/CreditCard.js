import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import CreditTable from '../Tables/CreditTable';
import Box from '@mui/material/Box';
import { CardActionArea } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function ImgMediaCard(props) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { creditOwnerName } = props;

  return (
    <Box sx={{ height: '100vh' }}>
      <Card sx={{
        maxWidth: 345,
        backgroundColor: 'rgb(18, 18, 18)',
        borderRadius: '4px',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
        color: 'rgb(255,255,255)',
      }}>
        <CardActionArea onClick={handleOpen}>
          <CardContent>
            <Typography variant='h4'>{creditOwnerName}</Typography>
          </CardContent>
        </CardActionArea>

        <CardActions style={{ justifyContent: 'space-around' }}>
          <Button variant="outlined" startIcon={<DeleteIcon />}>SİL</Button>
        </CardActions>
        <div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ fontWeight: 'bold', color: 'rgb(40,100,150)', backgroundColor: 'rgb(18,18,18)' }}>VERESİYE ÖDEME</DialogTitle>
            <DialogContent sx={{ backgroundColor: 'rgb(18, 18, 18)' }}>
              <CreditTable></CreditTable>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: 'rgb(18, 18, 18)', justifyContent: 'space-between' }}>
              <Button onClick={handleClose}>Vazgeç</Button>
              <Button color='success' onClick={handleClose}>ÖDENDİ</Button>
            </DialogActions>
          </Dialog>
        </div>
      </Card>
    </Box>
  );
}