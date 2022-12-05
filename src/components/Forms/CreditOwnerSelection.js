import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import { addCreditOwner, getCreditOwner } from '../../Config';
import uuid from 'react-uuid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';

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


export default function SelectSmall(props) {

  const [creditOwner, setCreditOwner] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { value, handleChange } = props;

  const addCreditOwnerOnClick = () => {
    const id = uuid();
    addCreditOwner(creditOwner, {
      'ownerId': id,
      'ownerName': creditOwner,
    })
    handleClose();
  }

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    const creditOwnerData = await getCreditOwner("ownerId");
    if (creditOwnerData && creditOwnerData.length > 0) {
      setCreditOwner(creditOwnerData);
    }
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
      <InputLabel id="demo-select-small">Age</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={value}
        label="Age"
        onChange={handleChange}
      >
        {creditOwner.map((value) => (
          <MenuItem key={value.ownerId} value={value.ownerName}>{value.ownerName}</MenuItem>
        ))};
      </Select>
      <Button variant='contained' onClick={handleOpen}>YENİ KİŞİ</Button>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle textAlign='center' fontWeight='bold' fontSize='200%'>Ürün Ekle</DialogTitle>
          <DialogContent>
            <GreenBorderTextField
              onChange={(e) => { setCreditOwner(e.target.value) }}
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
            <Button sx={{ color: 'lightgoldenrodyellow', backgroundColor: '#612325', '&:hover': { backgroundColor: '#fff', color: 'black' } }} onClick={handleClose}>Vazgeç</Button>
            <Button sx={{ color: 'lightgoldenrodyellow', backgroundColor: '#004625', '&:hover': { backgroundColor: '#fff', color: 'black' } }} type='submit' onClick={addCreditOwnerOnClick} >Ekle</Button>
          </DialogActions>
        </Dialog>
      </div>
    </FormControl>
  );
}