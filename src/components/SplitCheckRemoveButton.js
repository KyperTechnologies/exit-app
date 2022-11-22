import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import CheckoutSlider from '../components/CheckoutSlider';

export default function IconButtons() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div>
        <IconButton onClick={handleOpen} color="primary" aria-label="add to shopping cart">
          <DeleteIcon />
        </IconButton>
      </div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Ayrım İptali</DialogTitle>
          <DialogContent>
            <CheckoutSlider></CheckoutSlider>
          </DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='contained' onClick={handleClose}>Vazgeç</Button>
            <Button variant='contained' onClick={handleClose}>İptalİ Onayla</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
