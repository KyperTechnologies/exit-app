import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from 'styled-components';

const GreenBorderTextField = styled(Select)`
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
  const { creditOrder, setCreditOwner } = props;
  const [selectValue, setSelectValue] = useState('');

  const handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;
    setSelectValue(value);
    setCreditOwner(value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
      <InputLabel id="demo-select-small">Müşteri Seç</InputLabel>
      <GreenBorderTextField
        labelId="demo-select-small"
        id="demo-select-small"
        value={selectValue}
        label="Müşteri Seç"
        onChange={handleChangeSelect}
        sx={{ color: 'black' }}
      >
        {creditOrder.map((owner) => (
          <MenuItem key={owner.ownerId} value={owner.ownerName}>{owner.ownerName}</MenuItem>
        ))};
      </GreenBorderTextField>
    </FormControl>
  );
}