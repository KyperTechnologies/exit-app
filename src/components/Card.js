import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Editable from '../components/EditableInline'
import { CardActionArea, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';


export default function ImgMediaCard() {

  let navigate = useNavigate();

  const [task, setTask] = useState("");

  const onButtonClick = (state) => {
    navigate(state);
  }

  return (
    <Card sx={{ maxWidth: 345,
                margin:'30px',
                backgroundColor: 'rgb(18, 18, 18)',
                borderRadius:'4px',
                boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
                color:'rgb(255,255,255)',
    }}>
      <CardActionArea>
      <CardContent>
        <Editable
        style={{fontSize:'35px'}}
        text={task}
        placeholder="Masa Adı Giriniz :"
        type="input"
        >
        <TextField
        sx={{input:{color:'white'}}}
                  id="standard-basic" 
                  label="Masa Adı :"
                  variant="standard"
                  color='info'
                  type="text"
                  name="task"
                  value={task}
                  onChange={e => setTask(e.target.value)}>
        </TextField>
        </Editable>
      </CardContent>
      </CardActionArea>
      <CardActions style={{justifyContent:'space-around'}}>
        <Button variant="outlined" startIcon={<DeleteIcon />}>SİL</Button>
        <Button size="small" onClick={() => onButtonClick('/order')}>SİPARİŞ</Button>
        <Button size="small">HESAP</Button>
      </CardActions>
    </Card>
  );
}