import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import CancelOrderSlider from '../components/CancelOrderSlider';
import { updateOrder } from '../Config';
import { useLocation } from 'react-router-dom';

export default function IconButtons(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [newValue, setValue] = useState(1);
    const { fetchOrder, orderId, orderValue, orderName, unitPrice, orderPrdctId } = props;
    const location = useLocation();

    const handleValue = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    };


    const updateOnClick = async () => {
        const order = {
            id: orderId,
            productId: orderPrdctId,
            tableId: location.state.tableId,
            nameOfOrder: orderName,
            value: orderValue - newValue,
            unitPrice: Number(unitPrice),
            totalPrice: orderValue * Number(unitPrice),
        }
        await updateOrder(order);
        handleClose();
        await fetchOrder();
    }

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
                        <CancelOrderSlider orderValue={orderValue} handleValue={handleValue} newValue={newValue}></CancelOrderSlider>
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant='contained' onClick={handleClose}>Vazgeç</Button>
                        <Button variant='contained' onClick={updateOnClick}>İptalİ Onayla</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}
