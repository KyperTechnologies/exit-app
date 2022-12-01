import React, { useState, useCallback } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import CreateCreditOwnerDialog from '../Dialogs/CreateCreditOwnerDialog';


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


export default function MultipleSelect() {
  const handleCreateCreditOpen = () => setCreateCreditOpen(true);
  const handleCreateCreditClose = useCallback(() => setCreateCreditOpen(false), []);
  const [openCreateCredit, setCreateCreditOpen] = useState(false);
  const [personName, setPersonName] = React.useState([]);
  const [creditOwner, setCreditOwner] = useState([]);

  const handleValue = (e) => {
    e.preventDefault();
    setCreditOwner(e.target.value);
  };

  const handleChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setPersonName(
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
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="SEÇİNİZ" />}
          MenuProps={MenuProps}
          style={{ color: 'white' }}
        >
          {creditOwner.map((ownerName) => (
            <MenuItem
              back
              key={ownerName.id}
              value={ownerName.name}
              style={{ backgroundColor: 'rgb(18, 18, 18)', color: 'white' }}
            >
              {ownerName.name}
            </MenuItem>
          ))}
          <Button variant='contained' onClick={handleCreateCreditOpen}>YENİ KİŞİ</Button>
          <CreateCreditOwnerDialog openCreateCredit={openCreateCredit} handleCreateCreditClose={handleCreateCreditClose} handleValue={handleValue} creditOwner={creditOwner}></CreateCreditOwnerDialog>
        </Select>
      </FormControl>
    </div>
  );
}
