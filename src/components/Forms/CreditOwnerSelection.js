import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';
import uuid from 'react-uuid';
import { addCreditOwner, getCreditOwner } from '../../Config';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import { TextField } from '@mui/material';
import { Select } from '@mui/material';
import { OutlinedInput } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

export default function MultipleSelect(props) {
  const handleCreateCreditOpen = () => setCreateCreditOpen(true);
  const handleCreateCreditClose = () => setCreateCreditOpen(false);
  const [openCreateCredit, setCreateCreditOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState(['']);
  const [creditOwner, setCreditOwner] = useState(['']);

  async function fetchData() {
    const creditOwnerData = await getCreditOwner();
    if (creditOwnerData && creditOwnerData.length > 0) {
      setCreditOwner(creditOwnerData);
    }
  }

  const onAddClick = () => {
    const id = uuid();
    addCreditOwner(id, {
      "id": id,
      "name": creditOwner,
      orders: [
        {
          "id": '',
          "productId": '',
          "tableId": '',
          "nameOfOrder": '',
          "value": '',
          "unitPrice": '',
          "totalPrice": '',
        }
      ]
    });
    handleCreateCreditClose();
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleName = async (event) => {
    await setCreditOwner(event.target.value);
  };

  const handleChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setSelectedOwner(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 5, width: 300 }}>
        <InputLabel id="demo-multiple-name-label" sx={{ color: 'rgb(40,100,150)' }}>SEÇİNİZ</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={selectedOwner.name}
          onChange={handleChange}
          input={<OutlinedInput label="SEÇİNİZ" />}
          MenuProps={MenuProps}
          style={{ color: 'white' }}
        >
          {selectedOwner.map((selectedOwner) => (
            <MenuItem key={selectedOwner.id} value={selectedOwner.name}>
              {selectedOwner.name}
            </MenuItem>
          ))}
        </Select>
        <Button variant='contained' onClick={handleCreateCreditOpen}>YENİ KİŞİ</Button>
      </FormControl>
      <div>
        <Dialog open={openCreateCredit}>
          <DialogTitle textAlign='center' fontWeight='bold' fontSize='200%'>Yeni Kişi Ekle</DialogTitle>
          <DialogContent>
            <GreenBorderTextField
              onChange={handleName}
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
            <Button sx={{ color: 'lightgoldenrodyellow', backgroundColor: '#004625', '&:hover': { backgroundColor: '#fff', color: 'black' } }} type='submit' onClick={onAddClick} >Ekle</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
