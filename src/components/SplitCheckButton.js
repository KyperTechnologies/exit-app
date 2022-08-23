import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import Slider from '../components/Slider';

export default function IconButtons() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <>
    <div>
      <IconButton color="primary" aria-label="add to shopping cart">
        <AddShoppingCartIcon  onClick={handleOpen}/>
      </IconButton>
    </div>
    <div>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Ürün Ayır</DialogTitle>
                <DialogContent>
                    <Slider></Slider>
                </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Vazgeç</Button>
                <Button onClick={handleClose}>Ayır</Button>
            </DialogActions>
        </Dialog>
    </div>
    </>
  );
}
