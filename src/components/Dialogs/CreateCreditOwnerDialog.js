import React, { memo, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import uuid from 'react-uuid';
import { addCreditOwner, getCreditOwner } from '../../Config';
import styled from 'styled-components';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

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

export const CreateCreditOwnerDialog = (props) => {

    const { openCreateCredit, handleCreateCreditClose, creditOwner, handleValue } = props;

    const onAddClick = async () => {
        const id = uuid();
        addCreditOwner(id, {
            "id": id,
            "name": creditOwner,
        });
        handleCreateCreditClose();
    }

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        const creditOwnerData = await getCreditOwner();
        if (creditOwnerData && creditOwnerData.length > 0) {
            handleValue(creditOwnerData);
        }
    }

    return (
        <div>
            <Dialog open={openCreateCredit} onClose={handleCreateCreditClose}>
                <DialogTitle textAlign='center' fontWeight='bold' fontSize='200%'>Ürün Ekle</DialogTitle>
                <DialogContent>
                    <GreenBorderTextField
                        onChange={(e) => { handleValue(e.target.value) }}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Ürün İsmi"
                        type="name"
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: 'lightgoldenrodyellow', backgroundColor: '#612325', '&:hover': { backgroundColor: '#fff', color: 'black' } }} onClick={handleCreateCreditClose}>Vazgeç</Button>
                    <Button sx={{ color: 'lightgoldenrodyellow', backgroundColor: '#004625', '&:hover': { backgroundColor: '#fff', color: 'black' } }} type='submit' onClick={onAddClick}  >Ekle</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default memo(CreateCreditOwnerDialog);